import { expect } from "chai";
import { AgentB } from "../../../src/fasset-bots/AgentB";
import { AgentCollateral } from "../../../src/fasset/AgentCollateral";
import { MockChain } from "../../../src/mock/MockChain";
import { checkedCast, toBNExp } from "../../../src/utils/helpers";
import { web3 } from "../../../src/utils/web3";
import { testChainInfo } from "../../../test/test-utils/TestChainInfo";
import { TestAssetBotContext, createTestAssetContext } from "../../test-utils/create-test-asset-context";
import { createCRAndPerformMinting, createTestAgentB, createTestMinter, disableMccTraceManager, mintAndDepositClass1ToOwner } from "../../test-utils/helpers";
import { Minter } from "../../../src/mock/Minter";
import { CollateralKind } from "../../../src/fasset/CollateralData";

describe("Agent collateral unit tests", async () => {
    let accounts: string[];
    let context: TestAssetBotContext;
    let ownerAddress: string;
    let minterAddress: string;
    let chain: MockChain;
    let agentB: AgentB;
    let minter: Minter;

    before(async () => {
        disableMccTraceManager();
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        context = await createTestAssetContext(accounts[0], testChainInfo.xrp);
        chain = checkedCast(context.chain, MockChain);
        ownerAddress = accounts[3];
        minterAddress = accounts[4];
    });

    it("Should return collateral with certain collateral kind", async () => {
        agentB = await createTestAgentB(context, ownerAddress);
        const deposit = toBNExp(1_000_000, 18);
        await mintAndDepositClass1ToOwner(context, agentB.vaultAddress, deposit, ownerAddress);
        await agentB.buyCollateralPoolTokens(deposit);
        const agentCollateral = await AgentCollateral.create(context.assetManager, await context.assetManager.getSettings(), agentB.vaultAddress);
        const class1Collateral = agentCollateral.ofKind(CollateralKind.CLASS1);
        const poolCollateral = agentCollateral.ofKind(CollateralKind.POOL);
        const agentPoolTokens = agentCollateral.ofKind(CollateralKind.AGENT_POOL_TOKENS);
        expect(class1Collateral.collateral?.token).eq(agentB.class1Token.address);
        expect(poolCollateral.collateral?.token).eq(context.wNat.address);
        expect(agentPoolTokens.balance.eq(deposit)).to.be.true;
    });


    it("Should create agent collateral", async () => {
        agentB = await createTestAgentB(context, ownerAddress);
        const agentCollateral = await AgentCollateral.create(context.assetManager, await context.assetManager.getSettings(), agentB.vaultAddress);
        expect(agentCollateral).to.not.be.null;
    });

    it("Should get free collateral lots", async () => {
        agentB = await createTestAgentB(context, ownerAddress);
        const agentCollateral0 = await AgentCollateral.create(context.assetManager, await context.assetManager.getSettings(), agentB.vaultAddress);
        expect(agentCollateral0.freeCollateralLots().eqn(0)).to.be.true;
        const deposit = toBNExp(1_000_000, 18);
        await mintAndDepositClass1ToOwner(context, agentB.vaultAddress, deposit, ownerAddress);
        await agentB.depositClass1Collateral(deposit);
        await agentB.buyCollateralPoolTokens(deposit);
        await agentB.makeAvailable();
        const agentCollateral1 = await AgentCollateral.create(context.assetManager, await context.assetManager.getSettings(), agentB.vaultAddress);
        expect(agentCollateral1.freeCollateralLots().gtn(0)).to.be.true;
    });


    it("Should get free single collateral lots", async () => {
        agentB = await createTestAgentB(context, ownerAddress);
        const agentCollateral0 = await AgentCollateral.create(context.assetManager, await context.assetManager.getSettings(), agentB.vaultAddress);
        expect(agentCollateral0.freeSingleCollateralLots(agentCollateral0.class1).eqn(0)).to.be.true;
        expect(agentCollateral0.freeSingleCollateralLots(agentCollateral0.pool).eqn(0)).to.be.true;
        const deposit = toBNExp(1_000_000, 18);
        await mintAndDepositClass1ToOwner(context, agentB.vaultAddress, deposit, ownerAddress);
        await agentB.depositClass1Collateral(deposit);
        await agentB.buyCollateralPoolTokens(deposit);
        await agentB.makeAvailable();
        const agentCollateral1 = await AgentCollateral.create(context.assetManager, await context.assetManager.getSettings(), agentB.vaultAddress);
        expect(agentCollateral1.freeSingleCollateralLots(agentCollateral1.class1).gtn(0)).to.be.true;
        expect(agentCollateral1.freeSingleCollateralLots(agentCollateral1.pool).gtn(0)).to.be.true;
    });

    it("Should get free collateral wei", async () => {
        agentB = await createTestAgentB(context, ownerAddress);
        const agentCollateral0 = await AgentCollateral.create(context.assetManager, await context.assetManager.getSettings(), agentB.vaultAddress);
        expect(agentCollateral0.freeCollateralWei(agentCollateral0.class1).eqn(0)).to.be.true;
        expect(agentCollateral0.freeCollateralWei(agentCollateral0.pool).eqn(0)).to.be.true;
        const deposit = toBNExp(1_000_000, 18);
        await mintAndDepositClass1ToOwner(context, agentB.vaultAddress, deposit, ownerAddress);
        await agentB.depositClass1Collateral(deposit);
        await agentB.buyCollateralPoolTokens(deposit);
        await agentB.makeAvailable();
        const agentCollateral1 = await AgentCollateral.create(context.assetManager, await context.assetManager.getSettings(), agentB.vaultAddress);
        expect(agentCollateral1.freeCollateralWei(agentCollateral1.class1).gtn(0)).to.be.true;
        expect(agentCollateral1.freeCollateralWei(agentCollateral1.pool).gtn(0)).to.be.true;
    });

    it("Should get locked collateral wei", async () => {
        agentB = await createTestAgentB(context, ownerAddress);
        const agentCollateral0 = await AgentCollateral.create(context.assetManager, await context.assetManager.getSettings(), agentB.vaultAddress);
        expect(agentCollateral0.lockedCollateralWei(agentCollateral0.class1).eqn(0)).to.be.true;
        expect(agentCollateral0.lockedCollateralWei(agentCollateral0.pool).eqn(0)).to.be.true;
        const deposit = toBNExp(1_000_000, 18);
        await mintAndDepositClass1ToOwner(context, agentB.vaultAddress, deposit, ownerAddress);
        await agentB.depositClass1Collateral(deposit);
        await agentB.buyCollateralPoolTokens(deposit);
        await agentB.makeAvailable();
        minter = await createTestMinter(context, minterAddress, chain);
        await createCRAndPerformMinting(minter, agentB.vaultAddress, 2, chain);
        const agentCollateral1 = await AgentCollateral.create(context.assetManager, await context.assetManager.getSettings(), agentB.vaultAddress);
        expect(agentCollateral1.lockedCollateralWei(agentCollateral1.class1).gtn(0)).to.be.true;
        expect(agentCollateral1.lockedCollateralWei(agentCollateral1.pool).gtn(0)).to.be.true;
    });

    it("Should get minting lot collateral wei", async () => {
        agentB = await createTestAgentB(context, ownerAddress);
        const agentCollateral = await AgentCollateral.create(context.assetManager, await context.assetManager.getSettings(), agentB.vaultAddress);
        expect(agentCollateral.mintingLotCollateralWei(agentCollateral.class1).gtn(0)).to.be.true;
        expect(agentCollateral.mintingLotCollateralWei(agentCollateral.pool).gtn(0)).to.be.true;
    });

    it("Should get minting collateral ratio", async () => {
        agentB = await createTestAgentB(context, ownerAddress);
        const agentCollateral = await AgentCollateral.create(context.assetManager, await context.assetManager.getSettings(), agentB.vaultAddress);
        const class1MintingBIPS = agentCollateral.mintingCollateralRatio(CollateralKind.CLASS1);
        const poolMintingBIPS = agentCollateral.mintingCollateralRatio(CollateralKind.POOL);
        const agentPoolTokensMintingBIPS = agentCollateral.mintingCollateralRatio(CollateralKind.AGENT_POOL_TOKENS);
        expect(class1MintingBIPS[0].gtn(0)).to.be.true;
        expect(poolMintingBIPS[0].gtn(0)).to.be.true;
        expect(agentPoolTokensMintingBIPS[0].gtn(0)).to.be.true;
        expect(class1MintingBIPS[1].gtn(0)).to.be.true;
        expect(poolMintingBIPS[1].gtn(0)).to.be.true;
        expect(agentPoolTokensMintingBIPS[1].gtn(0)).to.be.true;
    });

});