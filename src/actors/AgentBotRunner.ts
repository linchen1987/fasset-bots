import { UseRequestContext } from "@mikro-orm/core";
import { BotConfig } from "../config/BotConfig";
import { createAssetContext } from "../config/create-asset-context";
import { ORM } from "../config/orm";
import { AgentEntity } from "../entities/agent";
import { IAssetContext } from "../fasset/IAssetContext";
import { sleep } from "../utils/helpers";
import { AgentBot } from "./AgentBot";

export class AgentBotRunner {
    constructor(
        public contexts: Map<number, IAssetContext>,
        public orm: ORM,
        public loopDelay: number,
    ) { }

    private stopRequested = false;
    
    async run() {
        this.stopRequested = false;
        while (!this.stopRequested) {
            await this.runStep();
            if (this.loopDelay > 0) {
                await sleep(this.loopDelay);
            }
        }
    }

    requestStop() {
        this.stopRequested = true;
    }

    @UseRequestContext()
    async runStep() {
        const em = this.orm.em;
        const agentEntities = await em.find(AgentEntity, { active: true });
        for (const agentEntity of agentEntities) {
            try {
                const context = this.contexts.get(agentEntity.chainId);
                if (context == null) {
                    console.warn(`Invalid chain id ${agentEntity.chainId}`);
                    continue;
                }
                const agent = await AgentBot.fromEntity(context, agentEntity);
                await agent.handleEvents(em);
                await agent.handleOpenRedemptions(em);
            } catch (error) {
                console.error(`Error with agent ${agentEntity.vaultAddress}`, error);
            }
        }
    }
    
    @UseRequestContext()
    async createMissingAgents(ownerAddress: string) {
        for (const [chainId, context] of this.contexts) {
            const existing = await this.orm.em.count(AgentEntity, { chainId, active: true });
            if (existing === 0) {
                await AgentBot.create(this.orm.em, context, ownerAddress);
            }
        }
    }
    
    static async create(orm: ORM, botConfig: BotConfig) {
        const contexts: Map<number, IAssetContext> = new Map();
        for (const chainConfig of botConfig.chains) {
            const assetContext = await createAssetContext(botConfig, chainConfig);
            contexts.set(chainConfig.chainInfo.chainId, assetContext);
        }
        return new AgentBotRunner(contexts, orm, botConfig.loopDelay);
    }
}
