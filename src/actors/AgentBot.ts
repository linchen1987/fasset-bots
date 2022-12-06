import { FilterQuery, RequiredEntityData } from "@mikro-orm/core/typings";
import BN from "bn.js";
import { CollateralReserved, MintingExecuted, RedemptionDefault, RedemptionRequested } from "../../typechain-truffle/AssetManager";
import { EM } from "../config/orm";
import { AgentEntity, AgentMinting, AgentRedemption } from "../entities/agent";
import { AgentB } from "../fasset-bots/AgentB";
import { IAssetBotContext } from "../fasset-bots/IAssetBotContext";
import { amgToNATWeiPrice, convertUBAToNATWei } from "../fasset/Conversions";
import { PaymentReference } from "../fasset/PaymentReference";
import { ProvedDH } from "../underlying-chain/AttestationHelper";
import { artifacts } from "../utils/artifacts";
import { EventArgs, EvmEvent } from "../utils/events/common";
import { eventIs } from "../utils/events/truffle";
import { Web3EventDecoder } from "../utils/events/Web3EventDecoder";
import { BN_ZERO, CCB_LIQUIDATION_PREVENTION_FACTOR, coinFlip, MAX_BIPS, systemTimestamp, toBN } from "../utils/helpers";
import { web3 } from "../utils/web3";
import { DHConfirmedBlockHeightExists, DHPayment, DHReferencedPaymentNonexistence } from "../verification/generated/attestation-hash-types";

const AgentVault = artifacts.require('AgentVault');

export class AgentBot {
    constructor(
        public agent: AgentB
    ) { }

    context = this.agent.context;
    eventDecoder = new Web3EventDecoder({ assetManager: this.context.assetManager });

    static async create(rootEm: EM, context: IAssetBotContext, ownerAddress: string) {
        const lastBlock = await web3.eth.getBlockNumber();
        return await rootEm.transactional(async em => {
            const underlyingAddress = await context.wallet.createAccount();
            const settings = await context.assetManager.getSettings();
            if (settings.requireEOAAddressProof) {
                await this.proveEOAaddress(context, underlyingAddress, ownerAddress);
            }
            const agent = await AgentB.create(context, ownerAddress, underlyingAddress);
            const agentEntity = new AgentEntity();
            agentEntity.chainId = context.chainInfo.chainId;
            agentEntity.ownerAddress = agent.ownerAddress;
            agentEntity.vaultAddress = agent.vaultAddress;
            agentEntity.underlyingAddress = agent.underlyingAddress;
            agentEntity.active = true;
            agentEntity.lastEventBlockHandled = lastBlock;
            em.persist(agentEntity);
            return new AgentBot(agent);
        });
    }

    static async proveEOAaddress(context: IAssetBotContext, underlyingAddress: string, ownerAddress: string) {
        const txHash = await context.wallet.addTransaction(underlyingAddress, underlyingAddress, 1, PaymentReference.addressOwnership(ownerAddress));
        await context.blockChainIndexerClient.waitForUnderlyingTransactionFinalization(txHash);
        const proof = await context.attestationProvider.provePayment(txHash, underlyingAddress, underlyingAddress);
        await context.assetManager.proveUnderlyingAddressEOA(proof, { from: ownerAddress });
    }

    static async fromEntity(context: IAssetBotContext, agentEntity: AgentEntity) {
        const agentVault = await AgentVault.at(agentEntity.vaultAddress);
        const agent = new AgentB(context, agentEntity.ownerAddress, agentVault, agentEntity.underlyingAddress);
        return new AgentBot(agent);
    }

    async runStep(rootEm: EM) {
        await this.handleEvents(rootEm);
        await this.handleOpenMintings(rootEm);
        await this.handleOpenRedemptions(rootEm);
    }

    async handleEvents(rootEm: EM) {
        await rootEm.transactional(async em => {
            const events = await this.readUnhandledEvents(em);
            // Note: only update db here, so that retrying on error won't retry on-chain operations.
            for (const event of events) {
                // console.log(this.context.assetManager.address, event.address, event.event);
                if (eventIs(event, this.context.assetManager, 'CollateralReserved')) {
                    this.mintingStarted(em, event.args);
                } else if (eventIs(event, this.context.assetManager, 'MintingExecuted')) {
                    await this.mintingExecuted(em, event.args);
                } else if (eventIs(event, this.context.assetManager, 'CollateralReservationDeleted')) {
                    await this.mintingExecuted(em, event.args);
                } else if (eventIs(event, this.context.assetManager, 'RedemptionRequested')) {
                    this.redemptionStarted(em, event.args);
                } else if (eventIs(event, this.context.assetManager, 'RedemptionDefault')) {
                    await this.redemptionFinished(em, event.args);
                } else if (eventIs(event, this.context.assetManager, "AgentInCCB")) {
                    await this.topupCollateral('ccb');
                } else if (eventIs(event, this.context.assetManager, 'LiquidationStarted')) {
                    await this.topupCollateral('liquidation');
                }
            }
        }).catch(error => {
            console.error(`Error handling events for agent ${this.agent.vaultAddress}: ${error}`);
        });
    }

    async readUnhandledEvents(em: EM): Promise<EvmEvent[]> {
        const agentEnt = await em.findOneOrFail(AgentEntity, { vaultAddress: this.agent.vaultAddress } as FilterQuery<AgentEntity>);
        // get all logs for this agent
        const nci = this.context.nativeChainInfo;
        const lastBlock = await web3.eth.getBlockNumber() - nci.finalizationBlocks;
        const events: EvmEvent[] = [];
        const encodedVaultAddress = web3.eth.abi.encodeParameter('address', this.agent.vaultAddress);
        for (let lastHandled = agentEnt.lastEventBlockHandled; lastHandled < lastBlock; lastHandled += nci.readLogsChunkSize) {
            const logs = await web3.eth.getPastLogs({
                address: this.agent.assetManager.address,
                fromBlock: lastHandled + 1,
                toBlock: Math.min(lastHandled + nci.readLogsChunkSize, lastBlock),
                topics: [null, encodedVaultAddress]
            });
            events.push(...this.eventDecoder.decodeEvents(logs));
        }
        // mark as handled
        agentEnt.lastEventBlockHandled = lastBlock;
        return events;
    }

    mintingStarted(em: EM, request: EventArgs<CollateralReserved>) {
        // const minting = new AgentMinting();
        em.create(AgentMinting, {
            state: 'started',
            agentAddress: this.agent.vaultAddress,
            requestId: toBN(request.collateralReservationId),
            valueUBA: toBN(request.valueUBA),
            feeUBA: toBN(request.feeUBA),
            lastUnderlyingBlock: toBN(request.lastUnderlyingBlock),
            lastUnderlyingTimestamp: toBN(request.lastUnderlyingTimestamp),
            paymentReference: request.paymentReference,
        } as RequiredEntityData<AgentMinting>, { persist: true });
    }

    async findMinting(em: EM, requestId: BN) {
        const agentAddress = this.agent.vaultAddress;
        return await em.findOneOrFail(AgentMinting, { agentAddress, requestId } as FilterQuery<AgentMinting>);
    }

    async handleOpenMintings(rootEm: EM) {
        const openMintings = await this.openMintings(rootEm, true);
        for (const rd of openMintings) {
            await this.nextMintingStep(rootEm, rd.id);
        }
    }

    async openMintings(em: EM, onlyIds: boolean) {
        let query = em.createQueryBuilder(AgentMinting);
        if (onlyIds) query = query.select('id');
        return await query.where({ agentAddress: this.agent.vaultAddress })
            .andWhere({ $not: { state: 'done' } })
            .getResultList();
    }

    async mintingExecuted(em: EM, request: EventArgs<MintingExecuted>) {
        const minting = await this.findMinting(em, request.collateralReservationId);
        minting.state = 'done';
        // check cr after liquidation to prevent ccb or liquidation (CcbLiquidationPreventionTrigger.ts)
        await this.topupCollateral('trigger');
    }

    async nextMintingStep(rootEm: EM, id: number) {
        await rootEm.transactional(async em => {
            const minting = await em.getRepository(AgentMinting).findOneOrFail({ id: Number(id) } as FilterQuery<AgentMinting>);
            if (minting.state === 'started') {
                await this.checkForNonPaymentProofOrExpiredProofs(minting);
            } else if (minting.state === 'requestedNonPaymentProof') {
                await this.checkNonPayment(minting);
            } else if (minting.state === 'requestedPaymentProof') {
                await this.checkPaymentAndExecuteMinting(minting);
            }
        }).catch(error => {
            console.error(`Error handling next minting step for minting ${id} agent ${this.agent.vaultAddress}`);
        });
    }

    async checkForNonPaymentProofOrExpiredProofs(minting: AgentMinting) {
        const proof = await this.checkProofExpiredInIndexer(minting.lastUnderlyingBlock, minting.lastUnderlyingTimestamp);
        if (proof) {
            await this.context.assetManager.unstickMinting(proof, minting.requestId, { from: this.agent.ownerAddress });
            minting.state = 'done';
        } else {
            const blockHeight = await this.context.chain.getBlockHeight();
            // time expires on underlying
            if (blockHeight > minting.lastUnderlyingBlock.toNumber() && systemTimestamp() > minting.lastUnderlyingTimestamp.toNumber()) {
                const txs = await this.agent.context.blockChainIndexerClient.getTransactionsByReference(minting.paymentReference);
                if (txs.length === 1) {
                    // check minter paid -> request payment proof -> execute minting
                    const txHash = txs[0].hash;
                    // TODO is it ok to check first address in UTXO chains?
                    const sourceAddress = txs[0].inputs[0][0];
                    await this.requestPaymentProofForMinting(minting, txHash, sourceAddress)
                } else if (txs.length === 0) {
                    // minter did not pay -> request non payment proof -> unstick minting
                    await this.requestNonPaymentProofForMinting(minting);
                }
            }
        }
    }

    async requestPaymentProofForMinting(minting: AgentMinting, txHash: string, sourceAddress: string) {
        const request = await this.context.attestationProvider.requestPaymentProof(txHash, sourceAddress, this.agent.underlyingAddress);
        minting.state = 'requestedPaymentProof';
        minting.proofRequestRound = request.round;
        minting.proofRequestData = request.data;
    }

    async requestNonPaymentProofForMinting(minting: AgentMinting) {
        const request = await this.context.attestationProvider.requestReferencedPaymentNonexistenceProof(
            minting.agentAddress,
            minting.paymentReference,
            minting.valueUBA.add(minting.feeUBA),
            minting.lastUnderlyingBlock.toNumber(),
            minting.lastUnderlyingTimestamp.toNumber());
        minting.state = 'requestedNonPaymentProof';
        minting.proofRequestRound = request.round;
        minting.proofRequestData = request.data;
    }

    async checkNonPayment(minting: AgentMinting) {
        const proof = await this.context.attestationProvider.obtainReferencedPaymentNonexistenceProof(minting.proofRequestRound!, minting.proofRequestData!);
        if (!proof.finalized) return;
        if (proof.result && proof.result.merkleProof) {
            const nonPaymentProof = proof.result as ProvedDH<DHReferencedPaymentNonexistence>;
            await this.context.assetManager.mintingPaymentDefault(nonPaymentProof, minting.requestId, { from: this.agent.ownerAddress });
            minting.state = 'done';
        } else {
            // TODO: non payment happened but we cannot obtain proof... ALERT!!!
        }
    }

    async checkPaymentAndExecuteMinting(minting: AgentMinting) {
        const proof = await this.context.attestationProvider.obtainPaymentProof(minting.proofRequestRound!, minting.proofRequestData!);
        if (!proof.finalized) return;
        if (proof.result && proof.result.merkleProof) {
            const paymentProof = proof.result as ProvedDH<DHPayment>;
            await this.context.assetManager.executeMinting(paymentProof, minting.requestId, { from: this.agent.ownerAddress });
            minting.state = 'done';
        } else {
            // TODO: payment happened but we cannot obtain proof... ALERT!!!
        }
    }

    redemptionStarted(em: EM, request: EventArgs<RedemptionRequested>) {
        em.create(AgentRedemption, {
            state: 'started',
            agentAddress: this.agent.vaultAddress,
            requestId: toBN(request.requestId),
            paymentAddress: request.paymentAddress,
            valueUBA: toBN(request.valueUBA),
            feeUBA: toBN(request.feeUBA),
            paymentReference: request.paymentReference,
            lastUnderlyingBlock: toBN(request.lastUnderlyingBlock),
            lastUnderlyingTimestamp: toBN(request.lastUnderlyingTimestamp)
        } as RequiredEntityData<AgentRedemption>, { persist: true });
    }

    async redemptionFinished(em: EM, request: EventArgs<RedemptionDefault>) {
        const redemption = await this.findRedemption(em, request.requestId);
        redemption.state = 'done';
    }

    async findRedemption(em: EM, requestId: BN) {
        const agentAddress = this.agent.vaultAddress;
        return await em.findOneOrFail(AgentRedemption, { agentAddress, requestId } as FilterQuery<AgentRedemption>);
    }

    async handleOpenRedemptions(rootEm: EM) {
        const openRedemptions = await this.openRedemptions(rootEm, true);
        for (const rd of openRedemptions) {
            await this.nextRedemptionStep(rootEm, rd.id);
        }
    }

    async openRedemptions(em: EM, onlyIds: boolean) {
        let query = em.createQueryBuilder(AgentRedemption);
        if (onlyIds) query = query.select('id');
        return await query.where({ agentAddress: this.agent.vaultAddress })
            .andWhere({ $not: { state: 'done' } })
            .getResultList();
    }

    async nextRedemptionStep(rootEm: EM, id: number) {
        await rootEm.transactional(async em => {
            const redemption = await em.getRepository(AgentRedemption).findOneOrFail({ id: Number(id) } as FilterQuery<AgentRedemption>);
            if (redemption.state === 'started') {
                await this.payForRedemption(redemption);
            } else if (redemption.state === 'paid') {
                await this.checkPaymentProofAvailable(redemption);
            } else if (redemption.state === 'requestedProof') {
                await this.checkConfirmPayment(redemption);
            }
        }).catch(error => {
            console.error(`Error handling next redemption step for redemption ${id} agent ${this.agent.vaultAddress}`);
        });
    }

    async payForRedemption(redemption: AgentRedemption) {
        const proof = await this.checkProofExpiredInIndexer(redemption.lastUnderlyingBlock, redemption.lastUnderlyingTimestamp)
        if (proof) {
            await this.context.assetManager.finishRedemptionWithoutPayment(proof, redemption.requestId, { from: this.agent.ownerAddress });
            redemption.state = 'done';
        } else {
            const paymentAmount = redemption.valueUBA.sub(redemption.feeUBA);
            // !!! TODO: what if there are too little funds on underlying address to pay for fee?
            const txHash = await this.agent.performPayment(redemption.paymentAddress, paymentAmount, redemption.paymentReference);
            redemption.txHash = txHash;
            redemption.state = 'paid';
        }
    }

    async checkPaymentProofAvailable(redemption: AgentRedemption) {
        // corner case: agent pays but does not confirm
        if (coinFlip(0.01)) {
            redemption.state = 'notRequestedProof';
            return;
        }
        // corner case: proof expires in indexer
        const proof = await this.checkProofExpiredInIndexer(redemption.lastUnderlyingBlock, redemption.lastUnderlyingTimestamp)
        if (proof) {
            await this.context.assetManager.finishRedemptionWithoutPayment(proof, redemption.requestId, { from: this.agent.ownerAddress });
            redemption.state = 'done';
        } else {
            const txBlock = await this.context.chain.getTransactionBlock(redemption.txHash!);
            const blockHeight = await this.context.chain.getBlockHeight();
            if (txBlock != null && blockHeight - txBlock.number >= this.context.chain.finalizationBlocks) {
                await this.requestPaymentProof(redemption);
            }
        }
    }

    async requestPaymentProof(redemption: AgentRedemption) {
        const request = await this.context.attestationProvider.requestPaymentProof(redemption.txHash!, this.agent.underlyingAddress, redemption.paymentAddress);
        redemption.state = 'requestedProof';
        redemption.proofRequestRound = request.round;
        redemption.proofRequestData = request.data;
    }

    async checkConfirmPayment(redemption: AgentRedemption) {
        const proof = await this.context.attestationProvider.obtainPaymentProof(redemption.proofRequestRound!, redemption.proofRequestData!);
        if (!proof.finalized) return;
        if (proof.result && proof.result.merkleProof) {
            const paymentProof = proof.result as ProvedDH<DHPayment>;
            await this.context.assetManager.confirmRedemptionPayment(paymentProof, redemption.requestId, { from: this.agent.ownerAddress });
            redemption.state = 'done';
        } else {
            // TODO: payment happened but we cannot obtain proof... ALERT!!!
        }
    }

    async checkProofExpiredInIndexer(lastUnderlyingBlock: BN, lastUnderlyingTimestamp: BN): Promise<ProvedDH<DHConfirmedBlockHeightExists> | null> {
        const proof = await this.context.attestationProvider.proveConfirmedBlockHeightExists();
        const lqwblock = toBN(proof.lowestQueryWindowBlockNumber);
        const lqwbtimestamp = toBN(proof.lowestQueryWindowBlockTimestamp);
        if (lqwblock > toBN(lastUnderlyingBlock) || lqwbtimestamp > toBN(lastUnderlyingTimestamp)) {
            return proof;
        }
        return null;
    }

    // owner deposits flr/sgb to vault to get out of ccb or liquidation
    async topupCollateral(type: 'liquidation' | 'ccb' | 'trigger') {
        const agentInfo = await this.agent.getAgentInfo();
        const settings = await this.context.assetManager.getSettings();
        let requiredCR = BN_ZERO;
        if (type === 'liquidation') {
            requiredCR = toBN(settings.safetyMinCollateralRatioBIPS);
        } else if (type === 'ccb') {
            requiredCR = toBN(settings.minCollateralRatioBIPS);
        } else if (type === 'trigger') {
            requiredCR = toBN(settings.minCollateralRatioBIPS).muln(CCB_LIQUIDATION_PREVENTION_FACTOR);
        } else {
            throw new Error(`Invalid type ${type}`);
        }
        const requiredTopup = await this.requiredTopup(requiredCR, settings, agentInfo);
        if (requiredTopup.lte(BN_ZERO)) {
            // no need for topup
            return;
        }
        await this.agent.agentVault.deposit({ value: requiredTopup });
    }

    private async requiredTopup(requiredCR: BN, settings: any, agentInfo: any): Promise<BN> {
        const collateral = await this.context.wnat.balanceOf(this.agent.agentVault.address);
        const [amgToNATWeiPrice, amgToNATWeiPriceTrusted] = await this.currentAmgToNATWeiPriceWithTrusted(settings);
        const amgToNATWei = BN.min(amgToNATWeiPrice, amgToNATWeiPriceTrusted);
        const totalUBA = toBN(agentInfo.mintedUBA).add(toBN(agentInfo.reservedUBA)).add(toBN(agentInfo.redeemingUBA));
        const backingNATWei = convertUBAToNATWei(settings, totalUBA, amgToNATWei);
        const requiredCollateral = backingNATWei.mul(requiredCR).divn(MAX_BIPS);
        return requiredCollateral.sub(collateral);
    }

    private async currentAmgToNATWeiPriceWithTrusted(settings: any): Promise<[ftsoPrice: BN, trustedPrice: BN]> {
        const { 0: natPrice, 1: natTimestamp } = await this.context.natFtso.getCurrentPrice();
        const { 0: assetPrice, 1: assetTimestamp } = await this.context.assetFtso.getCurrentPrice();
        const { 0: natPriceTrusted, 1: natTimestampTrusted } = await this.context.natFtso.getCurrentPriceFromTrustedProviders();
        const { 0: assetPriceTrusted, 1: assetTimestampTrusted } = await this.context.assetFtso.getCurrentPriceFromTrustedProviders();
        const ftsoPrice = amgToNATWeiPrice(settings, natPrice, assetPrice);
        const trustedPrice = natTimestampTrusted.add(toBN(settings.maxTrustedPriceAgeSeconds)).gte(natTimestamp) &&
            assetTimestampTrusted.add(toBN(settings.maxTrustedPriceAgeSeconds)).gte(assetTimestamp) ?
            amgToNATWeiPrice(settings, natPriceTrusted, assetPriceTrusted) : ftsoPrice;
        return [ftsoPrice, trustedPrice];
    }
}
