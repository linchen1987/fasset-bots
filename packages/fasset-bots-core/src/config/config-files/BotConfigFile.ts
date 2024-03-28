import { ChainInfo, NativeChainInfo } from "../../fasset/ChainInfo";
import { DatabaseType, SchemaUpdate } from "../orm";

export interface OrmConfigOptions {
    type: DatabaseType;
    schemaUpdate?: SchemaUpdate;
    debug?: boolean;
    // connection building - either clientUrl or some combination of others
    clientUrl?: string;
    dbName?: string;
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    charset?: string;
    // allow other options
    [key: string]: any;
}

export interface BotFAssetInfo extends ChainInfo {
    walletUrl?: string; // only for agent bot
    inTestnet?: boolean; // only for agent bot, optional also for agent bot
    indexerUrl?: string; // only for agent bot, challenger and timeKeeper
    // either one must be set
    assetManager?: string;
    fAssetSymbol?: string;
    // optional settings
    priceChangeEmitter?: string; // the name of the contract (in Contracts file) that emits 'PriceEpochFinalized' event; default is 'FtsoManager'
}

export interface BotStrategyDefinition {
    className: string;
    config?: any;
}

export interface BotConfigFile {
    ormOptions?: OrmConfigOptions; // only for agent bot
    walletOptions?: {
        blockOffset?: number; // How many block to wait for transaction to be validated
        retries?: number; // How many times should transaction retry to successfully submit
        feeIncrease?: number; // Factor to increase fee in resubmitting process
    }; // optional wallet options, only for agent
    fAssetInfos: BotFAssetInfo[];
    // notifierFile: string;
    loopDelay: number;
    nativeChainInfo: NativeChainInfo;
    rpcUrl: string;
    alertsUrl?: string;
    attestationProviderUrls?: string[]; // only for agent bot, challenger and timeKeeper
    // either one must be set
    addressUpdater?: string;
    contractsJsonFile?: string;
    // liquidation strategies for liquidator and challenger
    liquidationStrategy?: BotStrategyDefinition; // only for liquidator
    challengeStrategy?: BotStrategyDefinition; // only for challenger
}

export type Schema_BotConfigFile = BotConfigFile & { $schema?: string };
