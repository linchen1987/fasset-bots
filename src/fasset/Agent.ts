import { AgentVaultInstance, CollateralPoolInstance, CollateralPoolTokenInstance } from "../../typechain-truffle";
import { AgentAvailable, AgentDestroyed, AllEvents, AssetManagerInstance, AvailableAgentExited, SelfClose, UnderlyingWithdrawalAnnounced, UnderlyingWithdrawalCancelled, UnderlyingWithdrawalConfirmed } from "../../typechain-truffle/AssetManager";
import { artifacts } from "../utils/artifacts";
import { ContractWithEvents, findRequiredEvent, requiredEventArgs } from "../utils/events/truffle";
import { BNish, toBN } from "../utils/helpers";
import { AgentInfo, AgentSettings, CollateralType } from "./AssetManagerTypes";
import { IAssetContext } from "./IAssetContext";
import { PaymentReference } from "./PaymentReference";
import { web3DeepNormalize } from "../utils/web3normalize";
import { EventArgs } from "../utils/events/common";
import { IBlockChainWallet, TransactionOptionsWithFee } from "../underlying-chain/interfaces/IBlockChainWallet";
import { AttestationHelper } from "../underlying-chain/AttestationHelper";
import { AgentCollateral } from "./AgentCollateral";
import { getAgentSettings } from "../utils/fasset-helpers";

const AgentVault = artifacts.require('AgentVault');
const CollateralPool = artifacts.require('CollateralPool');
const CollateralPoolToken = artifacts.require('CollateralPoolToken');

export class Agent {
    constructor(
        public context: IAssetContext,
        public ownerAddress: string,
        public agentVault: AgentVaultInstance,
        public collateralPool: CollateralPoolInstance,
        public collateralPoolToken: CollateralPoolTokenInstance,
        public underlyingAddress: string
    ) {
    }

    get assetManager(): ContractWithEvents<AssetManagerInstance, AllEvents> {
        return this.context.assetManager;
    }

    get attestationProvider(): AttestationHelper {
        return this.context.attestationProvider;
    }

    get vaultAddress(): string {
        return this.agentVault.address;
    }

    get wallet(): IBlockChainWallet {
        return this.context.wallet;
    }

    async getAgentSettings(): Promise<AgentSettings> {
        const agentInfo = await this.getAgentInfo();
       return getAgentSettings(agentInfo);
    }

    async getAgentCollateral() {
        return await AgentCollateral.create(this.assetManager, await this.assetManager.getSettings(), this.vaultAddress);
    }

    async getAgentInfo(): Promise<AgentInfo> {
        return await this.context.assetManager.getAgentInfo(this.agentVault.address);
    }

    async getClass1CollateralToken(): Promise<CollateralType> {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return (await this.getAgentCollateral()).class1.collateral!;
    }

    static async create(ctx: IAssetContext, ownerAddress: string, agentSettings: AgentSettings): Promise<Agent> {
        // create agent
        const response = await ctx.assetManager.createAgent(web3DeepNormalize(agentSettings), { from: ownerAddress });
        // extract agent vault address from AgentCreated event
        const event = findRequiredEvent(response, 'AgentCreated');
        // get vault contract at agent's vault address address
        const agentVault = await AgentVault.at(event.args.agentVault);
        // get collateral pool
        const collateralPool = await CollateralPool.at(event.args.collateralPool);
        // get pool token
        const poolTokenAddress = await collateralPool.poolToken();
        const collateralPoolToken = await CollateralPoolToken.at(poolTokenAddress);
        // create object
        return new Agent(ctx, ownerAddress, agentVault, collateralPool, collateralPoolToken, agentSettings.underlyingAddressString);
    }

    async depositClass1Collateral(amountTokenWei: BNish) {
        const class1TokenAddress = (await this.getClass1CollateralToken()).token;
        return await this.agentVault.depositCollateral(class1TokenAddress, amountTokenWei, { from: this.ownerAddress });
    }

    // adds pool collateral and agent pool tokens
    async buyCollateralPoolTokens(amountNatWei: BNish) {
        return await this.agentVault.buyCollateralPoolTokens({ from: this.ownerAddress, value: toBN(amountNatWei) });
    }

    async makeAvailable(): Promise<EventArgs<AgentAvailable>> {
        const res = await this.assetManager.makeAgentAvailable(this.vaultAddress, { from: this.ownerAddress });
        return requiredEventArgs(res, 'AgentAvailable');
    }

    async announceExitAvailable(): Promise<BN> {
        const res = await this.assetManager.announceExitAvailableAgentList(this.vaultAddress, { from: this.ownerAddress });
        const args = requiredEventArgs(res, 'AvailableAgentExitAnnounced');
        return args.exitAllowedAt;
    }

    async exitAvailable(): Promise<EventArgs<AvailableAgentExited>> {
        const res = await this.assetManager.exitAvailableAgentList(this.vaultAddress, { from: this.ownerAddress });
        return requiredEventArgs(res, 'AvailableAgentExited');
    }

    async announceClass1CollateralWithdrawal(amountWei: BNish): Promise<BN> {
        const res = await this.assetManager.announceClass1CollateralWithdrawal(this.vaultAddress, amountWei, { from: this.ownerAddress });
        const args = requiredEventArgs(res, 'Class1WithdrawalAnnounced');
        return args.withdrawalAllowedAt;
    }

    async withdrawClass1Collateral(amountWei: BNish) {
        const class1TokenAddress = (await this.getClass1CollateralToken()).token;
        return await this.agentVault.withdrawCollateral(class1TokenAddress, amountWei, this.ownerAddress, { from: this.ownerAddress });
    }

    async withdrawPoolFees(amountUBA: BNish, recipient: string = this.ownerAddress) {
        await this.agentVault.withdrawPoolFees(amountUBA, recipient, { from: this.ownerAddress });
    }

    async poolFeeBalance(): Promise<BN> {
        return await this.collateralPool.fAssetFeesOf(this.vaultAddress);
    }

    async announceDestroy(): Promise<BN> {
        const res = await this.assetManager.announceDestroyAgent(this.vaultAddress, { from: this.ownerAddress });
        const args = requiredEventArgs(res, 'AgentDestroyAnnounced');
        return args.destroyAllowedAt;
    }

    async destroy(recipient: string = this.ownerAddress): Promise<EventArgs<AgentDestroyed>> {
        const res = await this.assetManager.destroyAgent(this.vaultAddress, recipient, { from: this.ownerAddress });
        return requiredEventArgs(res, 'AgentDestroyed');
    }

    async performTopupPayment(amount: BNish, underlyingAddress: string): Promise<string> {
        return await this.wallet.addTransaction(underlyingAddress, this.underlyingAddress, amount, PaymentReference.topup(this.agentVault.address));
    }

    async confirmTopupPayment(transactionHash: string): Promise<void> {
        const proof = await this.attestationProvider.provePayment(transactionHash, null, this.underlyingAddress);
        await this.assetManager.confirmTopupPayment(proof, this.agentVault.address, { from: this.ownerAddress });
    }

    async announceUnderlyingWithdrawal(): Promise<EventArgs<UnderlyingWithdrawalAnnounced>> {
        const res = await this.assetManager.announceUnderlyingWithdrawal(this.agentVault.address, { from: this.ownerAddress });
        return requiredEventArgs(res, 'UnderlyingWithdrawalAnnounced');
    }

    async performUnderlyingWithdrawal(paymentReference: string, amount: BNish, underlyingAddress: string): Promise<string> {
        return await this.wallet.addTransaction(this.underlyingAddress, underlyingAddress, amount, paymentReference);
    }

    async confirmUnderlyingWithdrawal(transactionHash: string): Promise<EventArgs<UnderlyingWithdrawalConfirmed>> {
        const proof = await this.attestationProvider.provePayment(transactionHash, this.underlyingAddress, null);
        const res = await this.assetManager.confirmUnderlyingWithdrawal(proof, this.agentVault.address, { from: this.ownerAddress });
        return requiredEventArgs(res, 'UnderlyingWithdrawalConfirmed');
    }

    async cancelUnderlyingWithdrawal(): Promise<EventArgs<UnderlyingWithdrawalCancelled>> {
        const res = await this.assetManager.cancelUnderlyingWithdrawal(this.agentVault.address, { from: this.ownerAddress });
        return requiredEventArgs(res, 'UnderlyingWithdrawalCancelled');
    }

    async selfClose(amountUBA: BNish): Promise<EventArgs<SelfClose>> {
        const res = await this.assetManager.selfClose(this.agentVault.address, amountUBA, { from: this.ownerAddress });
        return requiredEventArgs(res, 'SelfClose');
    }

    async performPayment(paymentAddress: string, paymentAmount: BNish, paymentReference: string | null = null, options?: TransactionOptionsWithFee): Promise<string> {
        return this.wallet.addTransaction(this.underlyingAddress, paymentAddress, paymentAmount, paymentReference, options);
    }

    async announceAgentSettingUpdate(settingName: string, settingValue: BNish): Promise<BN> {
        const res = await this.assetManager.announceAgentSettingUpdate(this.vaultAddress, settingName, settingValue, { from: this.ownerAddress });
        const args = requiredEventArgs(res, 'AgentSettingChangeAnnounced');
        return args.validAt;
    }

    async executeAgentSettingUpdate(settingName: string): Promise<void> {
        await this.assetManager.executeAgentSettingUpdate(this.vaultAddress, settingName, { from: this.ownerAddress });
    }
}
