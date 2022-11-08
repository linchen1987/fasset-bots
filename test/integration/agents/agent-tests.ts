import { time } from "@openzeppelin/test-helpers";
import { assert } from "chai";
import { AgentBot } from "../../../src/actors/AgentBot";
import { BotConfig } from "../../../src/config/BotConfig";
import { createAssetContext } from "../../../src/config/create-asset-context";
import { ORM } from "../../../src/config/orm";
import { IAssetContext } from "../../../src/fasset/IAssetContext";
import { Minter } from "../../../src/mock/Minter";
import { MockChain } from "../../../src/mock/MockChain";
import { Redeemer } from "../../../src/mock/Redeemer";
import { checkedCast, toBN, toBNExp } from "../../../src/utils/helpers";
import { createTestOrm } from "../../test.mikro-orm.config";
import { createTestConfig } from "../../utils/test-bot-config";
import { initTestWeb3 } from "../../utils/test-web3";

describe("Agent bot tests", async () => {
    let accounts: string[];
    let config: BotConfig;
    let context: IAssetContext;
    let orm: ORM;
    let ownerAddress: string;
    let chain: MockChain;

    before(async () => {
        accounts = await initTestWeb3('local');
        ownerAddress = accounts[5];
        config = await createTestConfig(['xrp']);
        context = await createAssetContext(config, config.chains[0]);
        chain = checkedCast(context.chain, MockChain);
        orm = await createTestOrm({ schemaUpdate: 'recreate' });
    });
    
    beforeEach(async () => {
        orm.em.clear();
    });

    it("create agent", async () => {
        await AgentBot.create(orm.em, context, ownerAddress);
    });
    
    async function runAgentSteps(agentBot: AgentBot, steps: number) {
        for (let i = 0; i < steps; i++) {
            await agentBot.runStep(orm.em);
        }
    }
    
    it("perform minting and redemption", async () => {
        const agentBot = await AgentBot.create(orm.em, context, ownerAddress);
        await agentBot.agent.depositCollateral(toBNExp(1_000_000, 18));
        await agentBot.agent.makeAvailable(500, 25000);
        const minter = await Minter.createTest(context, accounts[6], "MINTER_ADDRESS", toBNExp(10_000, 6)); // lot is 1000 XRP
        // create collateral reservetion
        const crt = await minter.reserveCollateral(agentBot.agent.vaultAddress, 2);
        await agentBot.runStep(orm.em);
        // should have an open minting
        orm.em.clear();
        const mintings = await agentBot.openMintings(orm.em, false);
        assert.equal(mintings.length, 1);
        const minting = mintings[0];
        assert.equal(minting.state, 'started');
        // pay for and execute minting
        const txHash = await minter.performMintingPayment(crt);
        chain.mine(chain.finalizationBlocks + 1);
        await minter.executeMinting(crt, txHash);
        await agentBot.runStep(orm.em);
        // the minting status should now be 'done'
        orm.em.clear();
        const openMintingsAfter = await agentBot.openMintings(orm.em, false);
        assert.equal(openMintingsAfter.length, 0);
        const mintingAfter = await agentBot.findMinting(orm.em, minting.requestId);
        assert.equal(mintingAfter.state, 'done');
    });

    it("perform minting and redemption", async () => {
        const agentBot = await AgentBot.create(orm.em, context, ownerAddress);
        await agentBot.agent.depositCollateral(toBNExp(1_000_000, 18));
        await agentBot.agent.makeAvailable(500, 25000);
        const minter = await Minter.createTest(context, accounts[6], "MINTER_ADDRESS_2", toBNExp(10_000, 6)); // lot is 1000 XRP
        const redeemer = await Redeemer.create(context, accounts[8], "REDEEMER_ADDRESS_2");
        // perform minting
        const crt = await minter.reserveCollateral(agentBot.agent.vaultAddress, 2);
        await agentBot.runStep(orm.em);
        const txHash = await minter.performMintingPayment(crt);
        chain.mine(chain.finalizationBlocks + 1);
        await minter.executeMinting(crt, txHash);
        await agentBot.runStep(orm.em);
        // transfer fassets
        const fbalance = await context.fAsset.balanceOf(minter.address);
        await context.fAsset.transfer(redeemer.address, fbalance, { from: minter.address });
        // request redemption
        const [rdrqs] = await redeemer.requestRedemption(2);
        assert.equal(rdrqs.length, 1);
        const rdrq = rdrqs[0];
        // run agent's steps until redemption process is finished
        for (let i = 0; ; i++) {
            await time.advanceBlock();
            chain.mine();
            await agentBot.runStep(orm.em);
            // check if redemption is done
            orm.em.clear();
            const redemption = await agentBot.findRedemption(orm.em, rdrq.requestId);
            console.log(`Agent step ${i}, state=${redemption.state}`)
            if (redemption.state === 'done') break;
        }
        // redeemer should now have some funds on the underlying chain
        const balance = await chain.getBalance(redeemer.underlyingAddress);
        assert.equal(String(balance), String(toBN(rdrq.valueUBA).sub(toBN(rdrq.feeUBA))));
    });
});
