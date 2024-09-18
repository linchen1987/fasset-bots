import { IService } from "../../interfaces/IService";
import BN from "bn.js";
import { logger } from "../../utils/logger";
import {
    checkIfIsDeleting,
    createInitialTransactionEntity, setAccountIsDeleting,
} from "../../db/dbutils";
import { ServiceRepository } from "../../ServiceRepository";
import { EntityManager } from "@mikro-orm/core";
import {
    ChainType,
    UTXO_OUTPUT_SIZE, UTXO_OUTPUT_SIZE_SEGWIT,
} from "../../utils/constants";
import { TransactionEntity } from "../../entity/transaction";
import { UTXOEntity } from "../../entity/utxo";
import * as bitcore from "bitcore-lib";
import { Transaction } from "bitcore-lib";
import {
    getAccountBalance,
    getCore,
    getDustAmount,
} from "./UTXOUtils";
import { getDefaultFeePerKB, unPrefix0x } from "../../utils/utils";
import UnspentOutput = Transaction.UnspentOutput;
import { toBN, toNumber } from "../../utils/bnutils";
import { TransactionData, TransactionUTXOService } from "./TransactionUTXOService";
import { TransactionFeeService } from "./TransactionFeeService";
import { LessThanDustAmountError, InvalidFeeError, NotEnoughUTXOsError } from "../../utils/axios-error-utils";
import { UTXO } from "../../interfaces/IWalletTransaction";

export class TransactionService implements IService {

    private readonly chainType: ChainType;
    private readonly transactionFeeService: TransactionFeeService;

    constructor(chainType: ChainType) {
        this.chainType = chainType;
        this.transactionFeeService = ServiceRepository.get(this.chainType, TransactionFeeService);
    }

    async createPaymentTransaction(
        chainType: ChainType,
        source: string,
        destination: string,
        amountInSatoshi: BN | null,
        feeInSatoshi?: BN,
        note?: string,
        maxFeeInSatoshi?: BN,
        executeUntilBlock?: number,
        executeUntilTimestamp?: BN,
    ): Promise<number> {
        logger.info(`Received request to create transaction from ${source} to ${destination} with amount ${amountInSatoshi} and reference ${note}, with limits ${executeUntilBlock} and ${executeUntilTimestamp}`);
        const em = ServiceRepository.get(this.chainType, EntityManager);
        if (await checkIfIsDeleting(em, source)) {
            logger.error(`Cannot receive requests. ${source} is deleting`);
            throw new Error(`Cannot receive requests. ${source} is deleting`);
        }
        const ent = await createInitialTransactionEntity(
            em,
            chainType,
            source,
            destination,
            amountInSatoshi,
            feeInSatoshi,
            note,
            maxFeeInSatoshi,
            executeUntilBlock,
            executeUntilTimestamp,
        );
        return ent.id;
    }

    async createDeleteAccountTransaction(
        chainType: ChainType,
        source: string,
        destination: string,
        feeInSatoshi?: BN,
        note?: string,
        maxFeeInSatoshi?: BN,
        executeUntilBlock?: number,
        executeUntilTimestamp?: BN,
    ): Promise<number> {
        logger.info(`Received request to delete account from ${source} to ${destination} with reference ${note}`);
        const em = ServiceRepository.get(this.chainType, EntityManager);
        if (await checkIfIsDeleting(em, source)) {
            logger.error(`Cannot receive requests. ${source} is deleting`);
            throw new Error(`Cannot receive requests. ${source} is deleting`);
        }
        await setAccountIsDeleting(em, source);
        const ent = await createInitialTransactionEntity(
            em,
            chainType,
            source,
            destination,
            null,
            feeInSatoshi,
            note,
            maxFeeInSatoshi,
            executeUntilBlock,
            executeUntilTimestamp,
        );
        return ent.id;
    }

    /**
     * @param txDbId
     * @param {string} source
     * @param {string} destination
     * @param {BN|null} amountInSatoshi - if null => empty all funds
     * @param {BN|undefined} feeInSatoshi - automatically set if undefined
     * @param {string|undefined} note
     * @param txForReplacement
     * @returns {Object} - BTC/DOGE transaction object
     */
    async preparePaymentTransaction(
        txDbId: number,
        source: string,
        destination: string,
        amountInSatoshi: BN | null,
        feeInSatoshi?: BN,
        note?: string,
        txForReplacement?: TransactionEntity,
    ): Promise<[bitcore.Transaction, UTXOEntity[]]> {
        const isPayment = amountInSatoshi != null;
        const txData = {
            source: source,
            destination: destination,
            amount: amountInSatoshi,
            fee: feeInSatoshi,
            useChange: isPayment,
            note: note,
        } as TransactionData;

        let utxos;
        let feePerKB;

        if (isPayment && !feeInSatoshi) {
            feePerKB = await ServiceRepository.get(this.chainType, TransactionFeeService).getFeePerKB();
            txData.feePerKB = feePerKB;
        }

        if (amountInSatoshi == null) {
            utxos = await ServiceRepository.get(this.chainType, TransactionUTXOService).getAllUTXOs(source);

            feePerKB = await ServiceRepository.get(this.chainType, TransactionFeeService).getFeePerKB();
            // Fee should be reduced for 1 one output, this is because the transaction above is calculated using change, because bitcore otherwise uses everything as fee
            feeInSatoshi = toBN(this.createBitcoreTransaction(source, destination, new BN(0), undefined, feePerKB, utxos, true, note).getFee())
                .sub(feePerKB.muln(this.getOutputSize()).divn(1000));

            amountInSatoshi = (await getAccountBalance(this.chainType, source)).sub(feeInSatoshi);
        } else {
            utxos = await ServiceRepository.get(this.chainType, TransactionUTXOService).fetchUTXOs(txData, txForReplacement);
        }

        const utxosAmount = utxos.reduce((accumulator, utxo) => accumulator.add(utxo.value), new BN(0));

        if (utxos.length === 0 || utxosAmount.lt(amountInSatoshi.add(feeInSatoshi ?? new BN(0)))) {
            logger.warn(`Not enough UTXOs for creating transaction ${txDbId}`)
            throw new NotEnoughUTXOsError(`Not enough UTXOs for creating transaction ${txDbId}`);
        }

        if (amountInSatoshi.lte(getDustAmount(this.chainType))) {
            logger.warn(`Will not prepare transaction ${txDbId}, for ${source}. Amount ${amountInSatoshi.toString()} is less than dust ${getDustAmount(this.chainType).toString()}`);
            throw new LessThanDustAmountError(
                `Will not prepare transaction ${txDbId}, for ${source}. Amount ${amountInSatoshi.toString()} is less than dust ${getDustAmount(this.chainType).toString()}`,
            );
        }

        const tr = this.createBitcoreTransaction(source, destination, amountInSatoshi, feeInSatoshi, feePerKB, utxos, isPayment, note);

        // TODO If change is very small (slightly above dust amount) we just add it as fee (one output is 31vBytes + we need to use it as output next time that is 68vBytes)
        // Determine how much above dust amount do we consider - It would make sense up to average 100vBytes * 5sat/vByte? - and we do it only when current fee status is MID/HIGH

        if (feeInSatoshi) {
            // Fetch temporary UTXOs to ensure that extremely low fees are rejected before sending tx to mempool
            const tmpUTXOs = await ServiceRepository.get(this.chainType, TransactionUTXOService).fetchUTXOs(txData, txForReplacement);
            const bitcoreEstFee = toBN(this.createBitcoreTransaction(source, destination, amountInSatoshi, undefined, undefined, tmpUTXOs, true, note).getFee());

            if (this.transactionFeeService.hasTooHighOrLowFee(feeInSatoshi, bitcoreEstFee)) {
                const estFee = await this.transactionFeeService.getEstimateFee(tr.inputs.length, tr.outputs.length);
                const correctFee = this.transactionFeeService.hasTooHighOrLowFee(estFee, bitcoreEstFee) ? toBN(bitcoreEstFee) : estFee;
                throw new InvalidFeeError(
                    `Transaction ${txDbId}: Provided fee ${feeInSatoshi.toNumber()} fails bitcore serialization checks! bitcoreEstFee: ${bitcoreEstFee}, estFee: ${estFee.toNumber()}`,
                    correctFee,
                );
            }
            // https://github.com/bitcoin/bitcoin/blob/55d663cb15151773cd043fc9535d6245f8ba6c99/doc/policy/mempool-replacements.md?plain=1#L37
            if (txForReplacement) {//TODO
                const totalFee = await this.transactionFeeService.calculateTotalFeeOfDescendants(ServiceRepository.get(this.chainType, EntityManager), txForReplacement);
                const relayFee = bitcoreEstFee.div(getDefaultFeePerKB(this.chainType)).muln(1000);

                if (feeInSatoshi.sub(totalFee).lt(relayFee)) {
                    // Set the new fee to (sum of all descendant fees + size of replacement tx * relayFee) * feeIncrease
                    const correctFee = totalFee.add(relayFee.muln(this.transactionFeeService.relayFeePerB)).muln(this.transactionFeeService.feeIncrease); // TODO: Is this a good fee?
                    throw new InvalidFeeError(
                        `Transaction ${txDbId}: Additional fee ${feeInSatoshi.toNumber()} for replacement tx is lower than relay fee`,
                        correctFee,
                    );
                }
            }
            tr.fee(toNumber(feeInSatoshi));
        }

        return [tr, utxos];
    }

    createBitcoreTransaction(
        source: string,
        destination: string,
        amountInSatoshi: BN,
        fee: BN | undefined,
        feePerKB: BN | undefined,
        utxos: UTXOEntity[],
        useChange: boolean,
        note?: string,
    ) {
        const txUTXOs = utxos.map((utxo) => ({
            txid: utxo.mintTransactionHash,
            outputIndex: utxo.position,
            scriptPubKey: utxo.script,
            satoshis: utxo.value.toNumber(),
        }) as UTXO);

        const core = getCore(this.chainType);
        const tr = new core.Transaction().from(txUTXOs.map((utxo) => new UnspentOutput(utxo))).to(destination, toNumber(amountInSatoshi));

        if (note) {
            tr.addData(Buffer.from(unPrefix0x(note), "hex"));
        }
        tr.enableRBF();

        if (fee) {
            tr.fee(toNumber(fee));
        } else if (feePerKB) {
            tr.feePerKb(feePerKB.toNumber());
        }

        if (useChange) {
            tr.change(source);
        }

        return tr;
    }

    private getOutputSize() {
        if (this.chainType === ChainType.DOGE || this.chainType === ChainType.testDOGE) {
            return UTXO_OUTPUT_SIZE;
        } else {
            return UTXO_OUTPUT_SIZE_SEGWIT;
        }
    }
}