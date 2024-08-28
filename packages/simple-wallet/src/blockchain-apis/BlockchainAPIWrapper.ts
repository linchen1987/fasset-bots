import { IBlockchainAPI, MempoolUTXO, MempoolUTXOMWithoutScript } from "../interfaces/IBlockchainAPI";
import { AxiosInstance, AxiosResponse } from "axios";
import { BitcoreAPI } from "./BitcoreAPI";
import { BlockbookAPI } from "./BlockbookAPI";
import { createAxiosConfig } from "../chain-clients/utils";
import { BaseWalletConfig } from "../interfaces/IWalletTransaction";
import { ChainType } from "../utils/constants";
import { tryWithClients } from "./utils";

export class BlockchainAPIWrapper implements IBlockchainAPI {
    client: AxiosInstance;
    clients: any = {};

    constructor(createConfig: BaseWalletConfig, chainType: ChainType) {
        const axiosConfig = createAxiosConfig(chainType, createConfig.url, createConfig.rateLimitOptions, createConfig.apiTokenKey, createConfig.username, createConfig.password);

        this.clients[createConfig.url] = (createConfig.api === "bitcore" ? new BitcoreAPI(axiosConfig, createConfig.rateLimitOptions) : new BlockbookAPI(axiosConfig, createConfig.rateLimitOptions, createConfig.em));;
        this.client = this.clients[createConfig.url].client;

        if (createConfig.fallbackAPIs) {
            for (const fallbackAPI of createConfig.fallbackAPIs) {
                const axiosConfig = createAxiosConfig(chainType, fallbackAPI.url, createConfig.rateLimitOptions, fallbackAPI.apiTokenKey, fallbackAPI.username, fallbackAPI.password);
                this.clients[fallbackAPI.url] = (fallbackAPI.type === "bitcore" ? new BitcoreAPI(axiosConfig, createConfig.rateLimitOptions) : new BlockbookAPI(axiosConfig, createConfig.rateLimitOptions, createConfig.em));
            }
        }
    }

    async getAccountBalance(account: string): Promise<number | undefined> {
        return tryWithClients(this.clients, (client: IBlockchainAPI) => client.getAccountBalance(account), "getAccountBalance");
    }

    async getCurrentBlockHeight(): Promise<number> {
        return tryWithClients(this.clients, (client: IBlockchainAPI) => client.getCurrentBlockHeight(), "getCurrentBlockHeight");
    }

    async getCurrentFeeRate(nextBlocks: number): Promise<number> {
        return tryWithClients(this.clients, (client: IBlockchainAPI) => client.getCurrentFeeRate(nextBlocks), "getCurrentFeeRate");
    }

    async getTransaction(txHash: string | undefined): Promise<AxiosResponse> {
        return tryWithClients(this.clients, (client: IBlockchainAPI) => client.getTransaction(txHash), "getTransaction");
    }

    async getUTXOScript(address: string, txHash: string, vout: number): Promise<string> {
        return tryWithClients(this.clients, (client: IBlockchainAPI) => client.getUTXOScript(address, txHash, vout), "getUTXOScript");
    }

    async getUTXOsFromMempool(address: string): Promise<MempoolUTXO[]> {
        return tryWithClients(this.clients, (client: IBlockchainAPI) => client.getUTXOsFromMempool(address), "getUTXOsFromMempool");
    }

    async getUTXOsWithoutScriptFromMempool(address: string): Promise<MempoolUTXOMWithoutScript[]> {
        return tryWithClients(this.clients, (client: IBlockchainAPI) => client.getUTXOsWithoutScriptFromMempool(address), "getUTXOsWithoutScriptFromMempool");
    }

    async sendTransaction(tx: string): Promise<AxiosResponse> {
        return tryWithClients(this.clients, (client: IBlockchainAPI) => client.sendTransaction(tx), "sendTransaction");
    }
}