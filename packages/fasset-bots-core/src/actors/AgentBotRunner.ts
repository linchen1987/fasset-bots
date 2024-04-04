import { CreateRequestContext, FilterQuery } from "@mikro-orm/core";
import { BotConfig } from "../config/BotConfig";
import { createAgentBotContext } from "../config/create-asset-context";
import { ORM } from "../config/orm";
import { AgentEntity } from "../entities/agent";
import { IAssetAgentContext } from "../fasset-bots/IAssetBotContext";
import { squashSpace } from "../utils/formatting";
import { sleep } from "../utils/helpers";
import { logger } from "../utils/logger";
import { NotifierTransport } from "../utils/notifier/BaseNotifier";
import { AgentBot } from "./AgentBot";
import { Secrets } from "../config";

export class AgentBotRunner {
    static deepCopyWithObjectCreate = true;

    constructor(
        public secrets: Secrets,
        public contexts: Map<string, IAssetAgentContext>,
        public orm: ORM,
        public loopDelay: number,
        public notifierTransports: NotifierTransport[]
    ) {}

    public stopRequested = false;

    async run(): Promise<void> {
        this.stopRequested = false;
        while (!this.stopRequested) {
            await this.runStep();
            if (this.stopRequested) break;
            await sleep(this.loopDelay);
        }
    }

    requestStop(): void {
        this.stopRequested = true;
    }

    /**
     * This is the main method, where "automatic" logic is gathered.
     * In every step it firstly collects all active agent entities. For every entity it construct AgentBot and runs its runsStep method,
     * which handles required events and other.
     */
    @CreateRequestContext()
    async runStep(): Promise<void> {
        const agentEntities = await this.orm.em.find(AgentEntity, { active: true } as FilterQuery<AgentEntity>);
        for (const agentEntity of agentEntities) {
            if (this.stopRequested) break;
            try {
                const context = this.contexts.get(agentEntity.chainSymbol);
                if (context == null) {
                    console.warn(`Invalid chain symbol ${agentEntity.chainSymbol}`);
                    logger.warn(`Owner's ${agentEntity.ownerAddress} AgentBotRunner found invalid chain symbol ${agentEntity.chainSymbol}.`);
                    continue;
                }
                const ownerUnderlyingAddress = AgentBot.underlyingAddress(this.secrets, context.chainInfo.chainId);
                const agentBot = await AgentBot.fromEntity(context, agentEntity, ownerUnderlyingAddress, this.notifierTransports);
                agentBot.runner = this;
                logger.info(`Owner's ${agentEntity.ownerAddress} AgentBotRunner started handling agent ${agentBot.agent.vaultAddress}.`);
                await agentBot.runStep(this.orm.em);
                logger.info(`Owner's ${agentEntity.ownerAddress} AgentBotRunner finished handling agent ${agentBot.agent.vaultAddress}.`);
            } catch (error) {
                console.error(`Error with agent ${agentEntity.vaultAddress}: ${error}`);
                logger.error(`Owner's ${agentEntity.ownerAddress} AgentBotRunner ran into error with agent ${agentEntity.vaultAddress}:`, error);
            }
        }
    }

    /**
     * Creates AgentBot runner from AgentBotConfig
     * @param botConfig - configs to run bot
     * @returns instance of AgentBotRunner
     */
    static async create(secrets: Secrets, botConfig: BotConfig): Promise<AgentBotRunner> {
        const ownerAddress = secrets.required("owner.management.address");
        logger.info(`Owner ${ownerAddress} started to create AgentBotRunner.`);
        const contexts: Map<string, IAssetAgentContext> = new Map();
        for (const chainConfig of botConfig.fAssets.values()) {
            const assetContext = await createAgentBotContext(botConfig, chainConfig);
            contexts.set(assetContext.chainInfo.symbol, assetContext);
            logger.info(squashSpace`Owner's ${ownerAddress} AgentBotRunner set context for chain ${assetContext.chainInfo.chainId}
                with symbol ${chainConfig.chainInfo.symbol}.`);
        }
        logger.info(`Owner ${ownerAddress} created AgentBotRunner.`);
        if (!botConfig.orm) {
            logger.info(`Owner ${ownerAddress} cannot create AgentBotRunner. Missing orm in config.`);
            throw new Error(`Missing orm in config for owner ${ownerAddress}.`);
        }
        return new AgentBotRunner(secrets, contexts, botConfig.orm, botConfig.loopDelay, botConfig.notifiers);
    }
}
