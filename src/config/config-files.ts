import { ChainInfo, NativeChainInfo } from "../fasset/ChainInfo";
import { DatabaseType, SchemaUpdate } from "./orm";

export interface OrmConfigOptions {
    type: DatabaseType;
    schemaUpdate?: SchemaUpdate;
    debug?: boolean;
    // conection building - either clientUrl or some combination of others
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

export interface BotConfigFile {
    defaultAgentSettingsPath?: string; // only for agent bot
    ormOptions?: OrmConfigOptions; // only for agent bot
    fAssetInfos: BotFAssetInfo[];
    // notifierFile: string;
    loopDelay: number;
    nativeChainInfo: NativeChainInfo;
    rpcUrl: string;
    attestationProviderUrls: string[];
    stateConnectorAddress: string;
    stateConnectorProofVerifierAddress: string;
    // either one must be set
    addressUpdater?: string;
    contractsJsonFile?: string;
}

export interface BotFAssetInfo extends ChainInfo {
    walletUrl?: string; // only for agent bot
    inTestnet?: boolean; // only for agent bot, optional also for agent bot
    indexerUrl: string;
    // either one must be set
    assetManager?: string;
    fAssetSymbol?: string;
    // optional settings
    priceChangeEmitter?: string; // the name of the contract (in Contracts file) that emits 'PriceEpochFinalized' event; default is 'FtsoManager'
}

export interface AgentSettingsConfig {
    vaultCollateralFtsoSymbol: string;
    poolTokenSuffix: string;
    feeBIPS: string | number;
    poolFeeShareBIPS: string | number;
    mintingVaultCollateralRatioConstant: number;
    mintingPoolCollateralRatioConstant: number;
    poolExitCollateralRatioConstant: number;
    buyFAssetByAgentFactorBIPS: string | number;
    poolTopupCollateralRatioConstant: number;
    poolTopupTokenPriceFactorBIPS: string | number;
}

export type Schema_BotConfigFile = BotConfigFile & { $schema?: string };
export type Schema_AgentSettingsConfig = AgentSettingsConfig & { $schema?: string };