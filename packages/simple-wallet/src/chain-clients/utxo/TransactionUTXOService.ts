import {
    createTransactionInputEntity,
    fetchTransactionEntityById,
    fetchUnspentUTXOs,
    fetchUTXOEntity,
    fetchUTXOsByTxId,
    transactional,
    transformUTXOEntToTxInputEntity,
    updateTransactionEntity,
    updateUTXOEntity,
} from "../../db/dbutils";
import BN from "bn.js";
import { TransactionEntity, TransactionStatus } from "../../entity/transaction";
import { SpentHeightEnum, UTXOEntity } from "../../entity/utxo";
import { ServiceRepository } from "../../ServiceRepository";
import { BTC_DOGE_DEC_PLACES, ChainType, MEMPOOL_CHAIN_LENGTH_LIMIT } from "../../utils/constants";
import { logger } from "../../utils/logger";
import { EntityManager, IDatabaseDriver, Loaded, RequiredEntityData } from "@mikro-orm/core";
import { FeeStatus, TransactionFeeService } from "./TransactionFeeService";
import { toBN, toBNExp } from "../../utils/bnutils";
import { TransactionInputEntity } from "../../entity/transactionInput";
import { TransactionService } from "./TransactionService";
import { getDustAmount, isEnoughUTXOs } from "./UTXOUtils";
import { UTXORawTransaction, UTXOVinResponse } from "../../interfaces/IBlockchainAPI";
import { UTXOBlockchainAPI } from "../../blockchain-apis/UTXOBlockchainAPI";

export interface TransactionData {
    source: string;
    destination: string;
    amount: BN;
    fee?: BN;
    feePerKB?: BN;
    useChange: boolean;
    note?: string;
}

export class TransactionUTXOService {
    private readonly chainType: ChainType;
    private readonly enoughConfirmations: number;

    readonly minimumUTXOValue: BN;

    private readonly rootEm: EntityManager;
    private readonly blockchainAPI: UTXOBlockchainAPI;

    constructor(chainType: ChainType, enoughConfirmations: number) {
        this.chainType = chainType;
        this.enoughConfirmations = enoughConfirmations;

        /* istanbul ignore next */
        if (this.chainType === ChainType.testDOGE || this.chainType === ChainType.DOGE) {
            this.minimumUTXOValue = toBNExp(0.1, BTC_DOGE_DEC_PLACES);
        } else if (this.chainType === ChainType.testBTC || this.chainType === ChainType.BTC) {
            this.minimumUTXOValue = toBNExp(0.0001, BTC_DOGE_DEC_PLACES); // 10k sats
        } else {
            this.minimumUTXOValue = toBNExp(0.0001, BTC_DOGE_DEC_PLACES); // 10k sats
        }

        this.rootEm = ServiceRepository.get(this.chainType, EntityManager<IDatabaseDriver>);
        this.blockchainAPI = ServiceRepository.get(this.chainType, UTXOBlockchainAPI);
    }

    /**
     * Retrieves unspent transactions in format accepted by transaction
     * @param txData
     * @param rbfUTXOs
     * @returns {UTXOEntity[]}
     */
    async fetchUTXOs(txData: TransactionData, rbfUTXOs?: UTXOEntity[]): Promise<UTXOEntity[]> {
        logger.info(`Listing UTXOs for address ${txData.source}`);
        const currentFeeStatus = await ServiceRepository.get(this.chainType, TransactionFeeService).getCurrentFeeStatus();
        const fetchUnspent = await fetchUnspentUTXOs(this.rootEm, txData.source, rbfUTXOs ?? []);
        const needed = await this.selectUTXOs(fetchUnspent, rbfUTXOs ?? [], txData, currentFeeStatus);
        if (needed) {
            return needed;
        }
        return [];
    }

    // allUTXOs = currently available UTXOs (either from db or db + fetch from mempool)
    private async selectUTXOs(allUTXOs: UTXOEntity[], rbfUTXOs: UTXOEntity[], txData: TransactionData, feeStatus: FeeStatus) {
        // filter out dust inputs
        const validUTXOs = allUTXOs.filter((utxo) => utxo.value.gte(getDustAmount(this.chainType)));
        const validRbfUTXOs = rbfUTXOs.filter((utxo) => utxo.value.gte(getDustAmount(this.chainType))); // should not be necessary

        if (!isEnoughUTXOs(rbfUTXOs.concat(allUTXOs), txData.amount, txData.fee)) {
            logger.info(`Account doesn't have enough UTXOs - Skipping selection.
                Amount: ${txData.amount.toNumber()},
                UTXO values: [${rbfUTXOs.concat(allUTXOs).map(t => t.value.toNumber()).join(', ')}],
                ${txData.fee ? "fee" : "feePerKB"}: ${txData.fee?.toNumber() ?? txData.feePerKB?.toNumber()}`
            );
            return null;
        }

        const minimalUTXOs = validUTXOs.filter((utxo) => utxo.value.lt(this.minimumUTXOValue));
        const notMinimalUTXOs = validUTXOs.filter((utxo) => utxo.value.gte(this.minimumUTXOValue));

        let utxos: UTXOEntity[] = notMinimalUTXOs;
        let usingMinimalUTXOs = false; // If we're using the UTXOs which are < this.minimumUTXOValue

        if (!isEnoughUTXOs(validRbfUTXOs.concat(notMinimalUTXOs), txData.amount, txData.fee)) {
            utxos = validUTXOs;
            usingMinimalUTXOs = true;
        }

        if (rbfUTXOs) {
            utxos = utxos.filter(t => t.confirmed);
        }

        let res: UTXOEntity[] | null = null;

        /* istanbul ignore else */
        if (feeStatus == FeeStatus.HIGH) {
            // order by value, confirmed
            utxos = this.sortUTXOs(utxos);
            res = await this.collectUTXOs(utxos, validRbfUTXOs, txData);
        } else if (feeStatus == FeeStatus.MEDIUM || feeStatus == FeeStatus.LOW) {
            // check if we can build tx with utxos with utxo.value < amountToSend
            const smallUTXOs = utxos.filter((utxo) => utxo.value.lte(txData.amount));
            if (isEnoughUTXOs(smallUTXOs, txData.amount, txData.fee)) {
                res = await this.collectUTXOs(smallUTXOs, validRbfUTXOs, txData);
            }
            if (!res) {
                res = await this.collectUTXOs(utxos, validRbfUTXOs, txData);
            }
        }

        if (res && (feeStatus == FeeStatus.HIGH || feeStatus == FeeStatus.MEDIUM)) {
            res = await this.removeExcessUTXOs(res, validRbfUTXOs.length, txData, feeStatus);
        }

        const maximumNumberOfUTXOs = this.getMaximumNumberOfUTXOs(feeStatus);
        if (res && !usingMinimalUTXOs && feeStatus == FeeStatus.LOW && res.length < maximumNumberOfUTXOs) {
            for (let i = 0; i < maximumNumberOfUTXOs - res.length && i < minimalUTXOs.length; i++) {
                res.push(minimalUTXOs[i]);
            }
        }

        return res;
    }

    private async collectUTXOs(utxos: UTXOEntity[], rbfUTXOs: UTXOEntity[], txData: TransactionData) {
        const baseUTXOs: UTXOEntity[] = rbfUTXOs.slice(); // UTXOs needed for creating tx with >= 0 output
        const additionalUTXOs: UTXOEntity[] = rbfUTXOs.slice(); // UTXOs needed for creating tx with >= minimalUTXOSize output

        const rbfUTXOsValueLeft = rbfUTXOs.length > 0 ? await this.calculateChangeValue(txData, baseUTXOs) : new BN(0);
        if (rbfUTXOsValueLeft.gte(this.minimumUTXOValue)) {
            return baseUTXOs;
        }

        let positiveValueReached = rbfUTXOsValueLeft.gt(getDustAmount(this.chainType)) && rbfUTXOs.length > 0;
        for (const utxo of utxos) {
            const numAncestors = await this.getNumberOfMempoolAncestors(utxo.mintTransactionHash);
            if (numAncestors + 1 >= MEMPOOL_CHAIN_LENGTH_LIMIT) {
                logger.info(
                    `Number of UTXO mempool ancestors ${numAncestors} is >= than limit of ${MEMPOOL_CHAIN_LENGTH_LIMIT} for UTXO with hash ${utxo.mintTransactionHash}`
                );
                continue; //skip this utxo
            }

            if (!positiveValueReached) {
                baseUTXOs.push(utxo);
                additionalUTXOs.push(utxo);
                const satisfiedChangeForBase = (await this.calculateChangeValue(txData, baseUTXOs)).gt(getDustAmount(this.chainType));
                positiveValueReached = satisfiedChangeForBase;
            } else {
                if (utxo.confirmed) {
                    additionalUTXOs.push(utxo);
                }
            }
            const satisfiedChangeForAdditional = (await this.calculateChangeValue(txData, additionalUTXOs)).gte(this.minimumUTXOValue);
            if (satisfiedChangeForAdditional) {
                return additionalUTXOs;
            }
        }

        if (!positiveValueReached) {
            logger.info(
                `Failed to collect enough UTXOs to cover amount and fee.
                    Amount: ${txData.amount.toNumber()},
                    UTXO values: [${baseUTXOs.map(t => t.value.toNumber()).join(', ')}],
                    ${txData.fee ? "fee" : "feePerKB"}: ${txData.fee?.toNumber() ?? txData.feePerKB?.toNumber()}`
            );
        }
        return positiveValueReached ? baseUTXOs : null;
    }

    private async removeExcessUTXOs(utxos: UTXOEntity[], rbfUTXOsLength: number, txData: TransactionData, feeStatus: FeeStatus) {
        const baseUTXOs: UTXOEntity[] = utxos.slice(0, rbfUTXOsLength); // UTXOs needed for creating tx with >= 0 output
        const additionalUTXOs: UTXOEntity[] = utxos.slice(0, rbfUTXOsLength); // UTXOs needed for creating tx with >= minimalUTXOSize output

        const nonRbfUTXOs = this.sortUTXOs(utxos.slice(rbfUTXOsLength));
        let positiveValueReached = false;

        if (nonRbfUTXOs.length === 0) {
            return utxos;
        }

        for (const utxo of nonRbfUTXOs) {
            if (!positiveValueReached) {
                baseUTXOs.push(utxo);
            }
            additionalUTXOs.push(utxo);

            if (!positiveValueReached && (await this.calculateChangeValue(txData, baseUTXOs)).gt(getDustAmount(this.chainType))) {
                positiveValueReached = true;
            }
            if ((await this.calculateChangeValue(txData, additionalUTXOs)).gte(this.minimumUTXOValue) && (additionalUTXOs.length - baseUTXOs.length) < this.getMaximumNumberOfUTXOs(feeStatus) / 2) {
                return additionalUTXOs;
            }
        }

        return positiveValueReached ? baseUTXOs : null;
    }

    public async getNumberOfMempoolAncestors(txHash: string): Promise<number> {
        const ancestors = await this.getMempoolAncestors(txHash);
        return ancestors.filter((t) => t.transactionHash !== txHash).length;
    }

    private async getMempoolAncestors(txHash: string): Promise<Loaded<TransactionEntity, "inputs" | "outputs">[]> {
        const txEnt = await this.getTransactionEntityByHash(txHash);
        if (
            !txEnt ||
            txEnt.status === TransactionStatus.TX_SUCCESS ||
            txEnt.status === TransactionStatus.TX_FAILED ||
            txEnt.status === TransactionStatus.TX_SUBMISSION_FAILED
        ) {
            return [];
        } else {
            let ancestors = [txEnt];
            for (const input of txEnt.inputs.getItems().filter((t) => t.transactionHash !== txHash)) {
                // this filter is here because of a weird orm bug
                const res = await this.getMempoolAncestors(input.transactionHash);
                ancestors = [...ancestors, ...res];
                if (ancestors.length >= MEMPOOL_CHAIN_LENGTH_LIMIT) {
                    return ancestors;
                }
            }
            return ancestors;
        }
    }

    private async calculateChangeValue(txData: TransactionData, utxos: UTXOEntity[]): Promise<BN> {
        const transactionService = ServiceRepository.get(this.chainType, TransactionService);
        const tr = await transactionService.createBitcoreTransaction(
            txData.source,
            txData.destination,
            txData.amount,
            txData.fee,
            txData.feePerKB,
            utxos,
            txData.useChange,
            txData.note
        );
        const valueBeforeFee = utxos.reduce((acc, utxo) => acc.add(utxo.value), new BN(0)).sub(txData.amount);
        const calculatedTxFee = toBN(tr.getFee());
        if (txData.fee) {
            return valueBeforeFee.sub(txData.fee);
        } else if (calculatedTxFee.ltn(0)) {
            return toBN(-10); // return any negative value
        } else {
            return valueBeforeFee.sub(calculatedTxFee);
        }
    }

    async checkIfTxUsesAlreadySpentUTXOs(txId: number) {
        const utxoEnts = await fetchUTXOsByTxId(this.rootEm, txId);
        const txEnt = await fetchTransactionEntityById(this.rootEm, txId);
        if (txEnt.rbfReplacementFor) {
            return false;
        }
        for (const utxo of utxoEnts) {
            // If there's an UTXO that's already been SENT/SPENT we should create tx again
            if (utxo.spentHeight !== SpentHeightEnum.UNSPENT) {
                logger.warn(`Transaction ${txId} tried to use already SENT/SPENT utxo with hash ${utxo.mintTransactionHash}`);
                await updateTransactionEntity(this.rootEm, txId, (txEnt) => {
                    txEnt.status = TransactionStatus.TX_CREATED;
                    txEnt.utxos.removeAll();
                    txEnt.inputs.removeAll();
                    txEnt.outputs.removeAll();
                    txEnt.raw = "";
                    txEnt.transactionHash = "";
                });

                const txEnt = await fetchTransactionEntityById(this.rootEm, txId);
                txEnt.inputs.map((input) => this.rootEm.remove(input));
                txEnt.outputs.map((output) => this.rootEm.remove(output));
                await this.rootEm.persistAndFlush(txEnt);

                return true;
            }
        }
        return false;
    }

    private async getTransactionEntityByHash(txHash: string) {
        let txEnt = await this.rootEm.findOne(TransactionEntity, { transactionHash: txHash }, { populate: ["inputs", "outputs"] });
        if (txEnt && txEnt.status != TransactionStatus.TX_SUBMISSION_FAILED) {
            const tr = await this.blockchainAPI.getTransaction(txHash);
            if (tr.blockHash && tr.confirmations >= this.enoughConfirmations) {
                txEnt.status = TransactionStatus.TX_SUCCESS;
                await this.rootEm.persistAndFlush(txEnt);
            }
        }
        if (!txEnt) {
            const tr = await this.blockchainAPI.getTransaction(txHash);
            logger.warn(`Tx with hash ${txHash} not in db, fetched from api`);
            /* istanbul ignore else */
            if (tr) {
                await transactional(this.rootEm, async (em) => {
                    /* istanbul ignore next */
                    const txEnt = em.create(TransactionEntity, {
                        chainType: this.chainType,
                        source: tr.vin[0].addresses[0] ?? "FETCHED_VIA_API_UNKNOWN_SOURCE",
                        destination: "FETCHED_VIA_API_UNKNOWN_DESTINATION",
                        transactionHash: txHash,
                        fee: toBN(tr.fees),
                        status: tr.blockHash && tr.confirmations >= this.enoughConfirmations ? TransactionStatus.TX_SUCCESS : TransactionStatus.TX_SUBMITTED,
                    } as RequiredEntityData<TransactionEntity>);

                    const inputs = tr.vin.map((t: UTXOVinResponse) => createTransactionInputEntity(txEnt, t.txid, t.value, t.vout ?? 0, ""));
                    txEnt.inputs.add(inputs);

                    await em.persistAndFlush(txEnt);
                    await em.persistAndFlush(inputs);
                });
            }

            txEnt = await this.rootEm.findOne(TransactionEntity, { transactionHash: txHash }, { populate: ["inputs", "outputs"] });
        }

        return txEnt;
    }

    async handleMissingUTXOScripts(utxos: UTXOEntity[]) {
        const updatedUtxos: UTXOEntity[] = [];
        for (const utxo of utxos) {
            if (!utxo.script) {
                const script = await this.blockchainAPI.getUTXOScript(utxo.mintTransactionHash, utxo.position);
                await updateUTXOEntity(this.rootEm, utxo.mintTransactionHash, utxo.position, (utxoEnt) => {
                    utxoEnt.script = script;
                });
                const updatedUtxo = await fetchUTXOEntity(this.rootEm, utxo.mintTransactionHash, utxo.position);
                updatedUtxos.push(updatedUtxo);
            } else {
                updatedUtxos.push(utxo);
            }
        }
        return updatedUtxos;
    }

    async createInputsFromUTXOs(dbUTXOs: UTXOEntity[], txId: number) {
        const inputs: TransactionInputEntity[] = [];
        for (const utxo of dbUTXOs) {
            const tx = await this.getTransactionEntityByHash(utxo.mintTransactionHash);
            /* istanbul ignore else */
            if (tx) {
                inputs.push(transformUTXOEntToTxInputEntity(utxo, tx));
            } else {
                logger.warn(`Transaction ${txId}: Transaction (utxo) with hash ${utxo.mintTransactionHash} could not be found on api`);
            }
        }
        await this.rootEm.persistAndFlush(inputs);
        return inputs;
    }

    async updateTransactionInputSpentStatus(txId: number, status: SpentHeightEnum) {
        const txEnt = await fetchTransactionEntityById(this.rootEm, txId);
        const transaction = JSON.parse(txEnt.raw!) as UTXORawTransaction;
        for (const input of transaction.inputs) {
            await updateUTXOEntity(this.rootEm, input.prevTxId, input.outputIndex, (utxoEnt) => {
                utxoEnt.spentHeight = status;
            });
        }
    }

    private sortUTXOs(utxos: UTXOEntity[]) {
        return utxos.sort((a, b) => {
            if (a.confirmed === b.confirmed) {
                const valueComparison = b.value.sub(a.value).toNumber(); // if they are both confirmed or unconfirmed, sort by value
                if (valueComparison === 0) { // if values are also the same => shuffle randomly
                    return Math.random() < 0.5 ? -1 : 1;
                }
                return valueComparison;
            }
            return Number(b.confirmed) - Number(a.confirmed);
        });
    }

    private getMaximumNumberOfUTXOs(status: FeeStatus) {
        switch (status) {
            case FeeStatus.HIGH:
                return 10;
            case FeeStatus.MEDIUM:
                return 15;
            case FeeStatus.LOW:
                return 20;
        }
    }
}
