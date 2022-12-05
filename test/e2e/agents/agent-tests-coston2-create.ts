import { expect } from "chai";
import { AgentBot } from "../../../src/actors/AgentBot";
import { Challenger } from "../../../src/actors/Challenger";
import { BotConfig } from "../../../src/config/BotConfig";
import { createAssetContext } from "../../../src/config/create-asset-context";
import { ORM } from "../../../src/config/orm";
import { IAssetBotContext } from "../../../src/fasset-bots/IAssetBotContext";
import { ScopedRunner } from "../../../src/utils/events/ScopedRunner";
import { requireEnv } from "../../../src/utils/helpers";
import { initWeb3 } from "../../../src/utils/web3";
import { getSourceName, SourceId } from "../../../src/verification/sources/sources";
import { createTestOrm } from "../../test.mikro-orm.config";
import { createTestMinter, createTestRedeemer, getCoston2AccountsFromEnv } from "../../utils/test-actors";
import { createTestConfigNoMocks } from "../../utils/test-bot-config";

const costonRPCUrl: string = requireEnv('COSTON2_RPC_URL');
const CONTRACTS_JSON = "../fasset/deployment/deploys/coston2.json";
const sourceId = SourceId.XRP;

describe("Agent bot tests - coston2", async () => {
    let accounts: string[];
    let config: BotConfig;
    let context: IAssetBotContext;
    let orm: ORM;
    let ownerAddress: string;
    let minterAddress: string;
    let redeemerAddress: string;
    let challengerAddress: string;
    let runner: ScopedRunner;

    before(async () => {
        accounts = await initWeb3(costonRPCUrl, getCoston2AccountsFromEnv(), null);
        ownerAddress = accounts[0];
        minterAddress = accounts[1];
        redeemerAddress = accounts[2];
        challengerAddress = accounts[3];
        orm = await createTestOrm({ schemaUpdate: 'recreate', dbName: 'fasset-bots-c2.db' });
        config = await createTestConfigNoMocks([getSourceName(sourceId)!.toLocaleLowerCase()], orm.em, costonRPCUrl, CONTRACTS_JSON);
        context = await createAssetContext(config, config.chains[0]);
        runner = new ScopedRunner();
    });

    it("Should create agent", async () => {
        const agentBot = await AgentBot.create(orm.em, context, ownerAddress);
        expect(agentBot.agent.underlyingAddress).is.not.null;
        expect(agentBot.agent.ownerAddress).to.eq(ownerAddress);
    });

    it("Should create minter", async () => {
        const minter = await createTestMinter(context, minterAddress);
        expect(minter.underlyingAddress).is.not.null;
        expect(minter.address).to.eq(minterAddress);
    });

    it("Should create redeemer", async () => {
        const redeemer = await createTestRedeemer(context, redeemerAddress);
        expect(redeemer.underlyingAddress).is.not.null;
        expect(redeemer.address).to.eq(redeemerAddress);
    });

    it("Should create challenger", async () => {
        const challenger = await Challenger.create(runner, orm.em, context, challengerAddress);
        expect(challenger.address).to.eq(challengerAddress);
    });
});

