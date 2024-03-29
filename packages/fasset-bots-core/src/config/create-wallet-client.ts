import { StuckTransaction, WALLET } from "@flarelabs/simple-wallet";
import { decodeAttestationName, encodeAttestationName } from "@flarenetwork/state-connector-protocol";
import { SourceId } from "../underlying-chain/SourceId";
import { getSecrets } from "./secrets";

const supportedSourceIds = [SourceId.XRP, SourceId.BTC, SourceId.DOGE, SourceId.testXRP, SourceId.testBTC, SourceId.testDOGE];

export function supportedSourceId(sourceId: SourceId) {
    return supportedSourceIds.includes(encodedChainId(sourceId));
}

export function encodedChainId(chainId: string) {
    return chainId.startsWith("0x") ? chainId : encodeAttestationName(chainId);
}

export function decodedChainId(chainId: string) {
    return chainId.startsWith("0x") ? decodeAttestationName(chainId) : chainId;
}

/**
 * Creates wallet client.
 * @param sourceId chain source
 * @param walletUrl chain's url
 * @param inTestnet if testnet should be used, optional parameter
 * @returns instance of Wallet implementation according to sourceId
 */
export function createWalletClient(
    sourceId: SourceId,
    walletUrl: string,
    options: StuckTransaction = {}
): WALLET.ALGO | WALLET.BTC | WALLET.DOGE | WALLET.LTC | WALLET.XRP {
    if (!supportedSourceId(sourceId)) {
        throw new Error(`SourceId ${decodedChainId(sourceId)} not supported.`);
    }
    if (sourceId === SourceId.BTC || sourceId === SourceId.testBTC) {
        return new WALLET.BTC({
            url: walletUrl,
            username: "",
            password: "",
            inTestnet: sourceId === SourceId.testBTC ? true : false,
            apiTokenKey: getSecrets().apiKey.btc_rpc,
            stuckTransactionOptions: options,
        }); // UtxoMccCreate
    } else if (sourceId === SourceId.DOGE || sourceId === SourceId.testDOGE) {
        return new WALLET.DOGE({
            url: walletUrl,
            username: "",
            password: "",
            inTestnet: sourceId === SourceId.testDOGE ? true : false,
            apiTokenKey: getSecrets().apiKey.doge_rpc,
            stuckTransactionOptions: options,
        }); // UtxoMccCreate
    } else {
        return new WALLET.XRP({
            url: walletUrl,
            username: "",
            password: "",
            apiTokenKey: getSecrets().apiKey.xrp_rpc,
            inTestnet: sourceId === SourceId.testXRP ? true : false,
            stuckTransactionOptions: options,
        }); // XrpMccCreate
    }
}
