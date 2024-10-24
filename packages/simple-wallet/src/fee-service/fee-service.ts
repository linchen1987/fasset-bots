import {
    BTC_DOGE_DEC_PLACES,
    ChainType,
} from "../utils/constants";
import { sleepMs } from "../utils/utils";
import { BlockStats } from "../interfaces/IWalletTransaction";
import { toBN, toBNExp } from "../utils/bnutils";
import BN from "bn.js";
import { logger } from "../utils/logger";

import { errorMessage } from "../utils/axios-utils";
import { ServiceRepository } from "../ServiceRepository";
import { UTXOBlockchainAPI } from "../blockchain-apis/UTXOBlockchainAPI";

export class BlockchainFeeService {
    blockchainAPI: UTXOBlockchainAPI;
    history: BlockStats[] = [];
    numberOfBlocksInHistory = 11;
    sleepTimeMs = 5000;
    chainType: ChainType;
    useNBlocksToCalculateFee = 5;
    monitoringId: string;

    constructor(chainType: ChainType, monitoringId: string) {
        this.chainType = chainType;
        this.blockchainAPI = ServiceRepository.get(this.chainType, UTXOBlockchainAPI);
        this.monitoringId = monitoringId;
    }

    getLatestFeeStats(): BN {
        const totalBlocks = this.history.length;
        if (totalBlocks === 0) {
            return toBN(0);
        }
        const recentHistory = this.history.slice(- this.useNBlocksToCalculateFee);
        let weightedFeeSum = toBN(0);
        let totalWeight = 0;
        recentHistory.forEach((block, index) => {
            const weight = index + 1;
            weightedFeeSum = weightedFeeSum.add(block.averageFeePerKB.muln(weight));
            totalWeight += weight;
        });
        const movingAverageWeightedFee = weightedFeeSum.divn(totalWeight);
        return movingAverageWeightedFee;
    }

    getLatestMedianTime(): BN | null {
        /* istanbul ignore if */
        if (this.history.length < this.numberOfBlocksInHistory) {
            return null;
        }
        const blockTimes = this.history.map(block => block.blockTime);
        blockTimes.sort((a, b) => a.sub(b).toNumber());
        const latestMedianTime = blockTimes[Math.floor(blockTimes.length / 2)];
        return latestMedianTime;
    }

    async monitorFees(monitoring: boolean): Promise<void> {
        if (monitoring === false) {
            logger.info(`${this.monitoringId}: Stopped monitoring fees.`)
            return;
        }
        logger.info(`${this.monitoringId}: Started monitoring fees.`);

        while (monitoring) {
            const currentBlockHeight = await this.getCurrentBlockHeight();
            /* istanbul ignore next */
            const lastStoredBlockHeight = this.history[this.history.length - 1]?.blockHeight;
            if (!currentBlockHeight || currentBlockHeight <= lastStoredBlockHeight) {
                await sleepMs(this.sleepTimeMs);
                continue;
            }

            let blockHeightToFetch = lastStoredBlockHeight + 1;
            while (blockHeightToFetch <= currentBlockHeight) {
                const feeStats = await this.getFeeStatsWithRetry(blockHeightToFetch);
                /* istanbul ignore else */
                if (feeStats) {
                    /* istanbul ignore else */
                    if (this.history.length >= this.numberOfBlocksInHistory) {
                        this.history.shift(); // remove oldest block
                    }
                    this.history.push({
                        blockHeight: blockHeightToFetch,
                        averageFeePerKB: feeStats.averageFeePerKB,
                        blockTime: feeStats.blockTime,
                    });
                } else {
                    logger.error(`Missing block ${blockHeightToFetch}`);
                }
                blockHeightToFetch++;
            }
            await sleepMs(this.sleepTimeMs);
        }
    }

    async setupHistory(): Promise<void> {
        if (this.history.length === this.numberOfBlocksInHistory) {
            return;
        }
        logger.info(`${this.monitoringId}: Setup history started.`)
        const currentBlockHeight = await this.getCurrentBlockHeight();
        /* istanbul ignore next */
        if (currentBlockHeight === 0) {
            return;
        }
        let blockHeightToFetch = currentBlockHeight;
        while (this.history.length < this.numberOfBlocksInHistory) {
            const feeStats = await this.getFeeStatsWithRetry(blockHeightToFetch);
            /* istanbul ignore else */
            if (feeStats) {
                this.history.unshift({
                    blockHeight: blockHeightToFetch,
                    averageFeePerKB: feeStats.averageFeePerKB,
                    blockTime: feeStats.blockTime,
                });
                blockHeightToFetch--;
            } else {
                logger.error(`Failed to retrieve fee stats for block ${blockHeightToFetch} during history setup.`);
            }
        }
        logger.info(`${this.monitoringId}: Setup history completed.`)
    }

    async getCurrentBlockHeight() {
        try {
            const blockHeight = await this.blockchainAPI.getCurrentBlockHeight()
            return blockHeight;
        } catch (error) /* istanbul ignore next */ {
            logger.error(`Fee service failed to fetch block height ${errorMessage(error)}`);
            return 0;
        }
    }

    async getFeeStatsFromIndexer(blockHeight: number): Promise<{ blockHeight: number, averageFeePerKB: BN, blockTime: BN } | null> {
        try {
            const avgFee = await this.blockchainAPI.getCurrentFeeRate(blockHeight);
            const blockTime = await this.blockchainAPI.getBlockTimeAt(blockHeight);
            return {
                blockHeight: blockHeight,
                averageFeePerKB: toBNExp(avgFee, BTC_DOGE_DEC_PLACES),
                blockTime: blockTime
            };
        } catch (error) /* istanbul ignore next */ {
            logger.error(`Error fetching fee stats from indexer for block ${blockHeight}: ${errorMessage(error)}`);
            return null;
        }
    }

    async getFeeStatsWithRetry(blockHeight: number, retryLimit = 3): Promise<{ blockHeight: number, averageFeePerKB: BN, blockTime: BN } | null> {
        let attempts = 0;
        while (attempts < retryLimit) {
            try {
                const feeStats = await this.getFeeStatsFromIndexer(blockHeight);
                if (feeStats) {
                    return feeStats;
                }
            } catch (error) /* istanbul ignore next */ {
                logger.warn(`Failed to fetch fee stats for block ${blockHeight} on attempt ${attempts + 1}: ${errorMessage(error)}`);
            }
            attempts++;
            await sleepMs(this.sleepTimeMs);
        }
        logger.error(`Failed to fetch fee stats for block ${blockHeight} after ${retryLimit} attempts.`);
        return null;
    }
}