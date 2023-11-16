/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { assert, expect, spy, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import spies from "chai-spies";
import { UserBot } from "../../../src/actors/UserBot";
import { ORM } from "../../../src/config/orm";
import { Agent } from "../../../src/fasset/Agent";
import { overrideAndCreateOrm } from "../../../src/mikro-orm.config";
import { MockChain, MockChainWallet } from "../../../src/mock/MockChain";
import { MockIndexer } from "../../../src/mock/MockIndexer";
import { MockStateConnectorClient } from "../../../src/mock/MockStateConnectorClient";
import { SourceId } from "../../../src/underlying-chain/SourceId";
import { Notifier } from "../../../src/utils/Notifier";
import { checkedCast, toBN, toBNExp } from "../../../src/utils/helpers";
import { artifacts, web3 } from "../../../src/utils/web3";
import { testChainInfo, testNativeChainInfo } from "../../../test/test-utils/TestChainInfo";
import { createTestOrmOptions } from "../../../test/test-utils/test-bot-config";
import { TestAssetBotContext, createTestAssetContext } from "../../test-utils/create-test-asset-context";
import { createTestAgentAndMakeAvailable, createTestRedeemer } from "../../test-utils/helpers";
use(chaiAsPromised);
use(spies);

const IERC20 = artifacts.require("IERC20");

const StateConnector = artifacts.require("StateConnectorMock");
const agentUnderlyingAddress = "agentUnderlyingAddress";
const userUnderlyingAddress = "userUnderlyingAddress";

describe("Bot cli commands unit tests", async () => {
    let accounts: string[];
    let context: TestAssetBotContext;
    let orm: ORM;
    let ownerAddress: string;
    let userBot: UserBot;
    let chain: MockChain;
    let agent: Agent;

    before(async () => {
        accounts = await web3.eth.getAccounts();
        orm = await overrideAndCreateOrm(createTestOrmOptions({ schemaUpdate: "recreate", type: "sqlite" }));
        // accounts
        ownerAddress = accounts[3];
    });

    beforeEach(async () => {
        orm.em.clear();
        context = await createTestAssetContext(accounts[0], testChainInfo.xrp);
        chain = checkedCast(context.blockchainIndexer.chain, MockChain);
        // chain tunning
        chain.finalizationBlocks = 0;
        chain.secondsPerBlock = 1;
        // user bot
        userBot = new UserBot();
        userBot.context = context;
        userBot.nativeAddress = ownerAddress;
        userBot.underlyingAddress = userUnderlyingAddress;
        const chainId = SourceId.XRP;
        userBot.botConfig = {
            rpcUrl: "",
            loopDelay: 0,
            fAssets: [
                {
                    chainInfo: {
                        chainId: chainId,
                        name: "Ripple",
                        symbol: "XRP",
                        decimals: 6,
                        amgDecimals: 0,
                        requireEOAProof: false,
                        finalizationBlocks: 6,
                    },
                    wallet: new MockChainWallet(chain),
                    blockchainIndexerClient: new MockIndexer("", chainId, chain),
                    stateConnector: new MockStateConnectorClient(await StateConnector.new(), { [chainId]: chain }, "auto"),
                    assetManager: "",
                },
            ],
            nativeChainInfo: testNativeChainInfo,
            orm: orm,
            notifier: new Notifier(),
            addressUpdater: "",
        };
        agent = await createTestAgentAndMakeAvailable(context, ownerAddress, agentUnderlyingAddress);
    });

    afterEach(function () {
        spy.restore(console);
    });

    it("Should update underlying block", async () => {
        const blockBefore = await context.assetManager.currentUnderlyingBlock();
        chain.mine(10);
        await userBot.updateUnderlyingTime();
        const blockAfter = await context.assetManager.currentUnderlyingBlock();
        expect(blockAfter[0].gt(blockBefore[0])).to.be.true;
        expect(blockAfter[1].gt(blockBefore[1])).to.be.true;
    });

    it("Should mint and redeem", async () => {
        const deposit = toBNExp(1_000_000, 18);
        chain.mint(userBot.underlyingAddress, deposit);
        const agentInfoBeforeMint = await context.assetManager.getAgentInfo(agent.vaultAddress);
        await userBot.mint(agent.vaultAddress, 1);
        const agentInfoAfterMint = await context.assetManager.getAgentInfo(agent.vaultAddress);
        expect(toBN(agentInfoAfterMint.freePoolCollateralNATWei).lt(toBN(agentInfoBeforeMint.freePoolCollateralNATWei)));
        expect(toBN(agentInfoAfterMint.freeVaultCollateralWei).lt(toBN(agentInfoBeforeMint.freeVaultCollateralWei)));
        await userBot.redeem(2);
        const agentInfoAfterRedeem = await context.assetManager.getAgentInfo(agent.vaultAddress);
        expect(toBN(agentInfoAfterMint.freePoolCollateralNATWei).lt(toBN(agentInfoAfterRedeem.freePoolCollateralNATWei)));
        expect(toBN(agentInfoAfterMint.freeVaultCollateralWei).lt(toBN(agentInfoAfterRedeem.freeVaultCollateralWei)));
    });

    it("Should mint and redeem - again", async () => {
        const deposit = toBNExp(1_000_000, 18);
        chain.mint(userBot.underlyingAddress, deposit);
        const agentInfoBeforeMint = await context.assetManager.getAgentInfo(agent.vaultAddress);
        await userBot.mint(agent.vaultAddress, 1);
        const agentInfoAfterMint = await context.assetManager.getAgentInfo(agent.vaultAddress);
        expect(toBN(agentInfoAfterMint.freePoolCollateralNATWei).lt(toBN(agentInfoBeforeMint.freePoolCollateralNATWei)));
        expect(toBN(agentInfoAfterMint.freeVaultCollateralWei).lt(toBN(agentInfoBeforeMint.freeVaultCollateralWei)));
        await userBot.redeem(1);
        const agentInfoAfterRedeem = await context.assetManager.getAgentInfo(agent.vaultAddress);
        expect(toBN(agentInfoAfterMint.freePoolCollateralNATWei).lt(toBN(agentInfoAfterRedeem.freePoolCollateralNATWei)));
        expect(toBN(agentInfoAfterMint.freeVaultCollateralWei).lt(toBN(agentInfoAfterRedeem.freeVaultCollateralWei)));
    });

    it("Should mint and defaulted redemption", async () => {
        // vaultCollateralToken
        const vaultCollateralToken = await IERC20.at((await agent.getVaultCollateral()).token);
        // mint
        const deposit = toBNExp(1_000_000, 18);
        chain.mint(userBot.underlyingAddress, deposit);
        const agentInfoBeforeMint = await context.assetManager.getAgentInfo(agent.vaultAddress);
        await userBot.mint(agent.vaultAddress, 1);
        const agentInfoAfterMint = await context.assetManager.getAgentInfo(agent.vaultAddress);
        expect(toBN(agentInfoAfterMint.freePoolCollateralNATWei).lt(toBN(agentInfoBeforeMint.freePoolCollateralNATWei)));
        expect(toBN(agentInfoAfterMint.freeVaultCollateralWei).lt(toBN(agentInfoBeforeMint.freeVaultCollateralWei)));
        // transfer FAssets
        const redeemer = await createTestRedeemer(context, userBot.nativeAddress, userUnderlyingAddress);
        // const fBalance = await context.fAsset.balanceOf(userBot.nativeAddress);
        // await context.fAsset.transfer(redeemer.address, fBalance, { from: userBot.nativeAddress });
        // request redemption
        const [rdReqs] = await redeemer.requestRedemption(1);
        assert.equal(rdReqs.length, 1);
        const rdReq = rdReqs[0];
        // skip time so the payment will expire on underlying chain
        chain.skipTimeTo(Number(rdReq.lastUnderlyingTimestamp));
        chain.mine(Number(rdReq.lastUnderlyingBlock));
        // redeemer requests non-payment proof
        // redeemer triggers payment default and gets paid in collateral with extra
        const startBalanceRedeemer = await vaultCollateralToken.balanceOf(redeemer.address);
        const startBalanceAgent = await vaultCollateralToken.balanceOf(agent.vaultAddress);
        const amount = toBN(rdReq.valueUBA).sub(toBN(rdReq.feeUBA));
        // redemption default - invalid payment reference
        await expect(
            userBot.redemptionDefault(amount, userBot.nativeAddress, rdReq.firstUnderlyingBlock, rdReq.lastUnderlyingBlock, rdReq.lastUnderlyingTimestamp)
        )
            .to.eventually.be.rejectedWith("Invalid payment reference")
            .and.be.an.instanceOf(Error);
        // redemption default
        await userBot.redemptionDefault(amount, rdReq.paymentReference, rdReq.firstUnderlyingBlock, rdReq.lastUnderlyingBlock, rdReq.lastUnderlyingTimestamp);
        const endBalanceRedeemer = await vaultCollateralToken.balanceOf(redeemer.address);
        const endBalanceAgent = await vaultCollateralToken.balanceOf(agent.vaultAddress);
        expect(endBalanceRedeemer.gt(startBalanceRedeemer)).to.be.true;
        expect(endBalanceAgent.lt(startBalanceAgent)).to.be.true;
    });
});
