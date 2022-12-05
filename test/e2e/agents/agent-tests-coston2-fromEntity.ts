import { FilterQuery } from "@mikro-orm/core/typings";
import { expect } from "chai";
import { AgentBot } from "../../../src/actors/AgentBot";
import { Challenger } from "../../../src/actors/Challenger";
import { BotConfig } from "../../../src/config/BotConfig";
import { createAssetContext } from "../../../src/config/create-asset-context";
import { ORM } from "../../../src/config/orm";
import { AgentEntity } from "../../../src/entities/agent";
import { ChallengerEntity } from "../../../src/entities/challenger";
import { IAssetBotContext } from "../../../src/fasset-bots/IAssetBotContext";
import { ScopedRunner } from "../../../src/utils/events/ScopedRunner";
import { requireEnv } from "../../../src/utils/helpers";
import { initWeb3 } from "../../../src/utils/web3";
import { getSourceName, SourceId } from "../../../src/verification/sources/sources";
import { createTestOrm } from "../../test.mikro-orm.config";
import { getCoston2AccountsFromEnv } from "../../utils/test-actors";
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
    let challengerAddress: string;
    let runner: ScopedRunner;

    before(async () => {
        // NOTE: run agent-tests-coston2-create.ts first
        accounts = await initWeb3(costonRPCUrl, getCoston2AccountsFromEnv(), null);
        ownerAddress = accounts[0];
        challengerAddress = accounts[3];
        orm = await createTestOrm({ schemaUpdate: 'safe', dbName: 'fasset-bots-c2.db' });
        config = await createTestConfigNoMocks([getSourceName(sourceId)!.toLocaleLowerCase()], orm.em, costonRPCUrl, CONTRACTS_JSON);
        context = await createAssetContext(config, config.chains[0]);
        runner = new ScopedRunner();
    });

    it("Should read agent from entity", async () => {
        const agentEnt = await orm.em.findOneOrFail(AgentEntity, { ownerAddress: ownerAddress } as FilterQuery<AgentEntity>);
        const agentBot = await AgentBot.fromEntity(context, agentEnt)
        expect(agentBot.agent.underlyingAddress).is.not.null;
        expect(agentBot.agent.ownerAddress).to.eq(ownerAddress);
    });

    it("Should read challenger from entity", async () => {
        const challengerEnt = await orm.em.findOneOrFail(ChallengerEntity, { address: challengerAddress } as FilterQuery<ChallengerEntity>);
        const challenger = await Challenger.fromEntity(runner, context, challengerEnt);
        expect(challenger.address).to.eq(challengerAddress);
    });
});


