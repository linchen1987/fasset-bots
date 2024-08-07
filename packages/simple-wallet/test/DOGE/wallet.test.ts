import { SpentHeightEnum, UTXOEntity, WALLET } from "../../src";
import { DogecoinWalletConfig, FeeServiceConfig, ICreateWalletResponse } from "../../src/interfaces/IWalletTransaction";
import chaiAsPromised from "chai-as-promised";
import { assert, expect, use } from "chai";
import WAValidator from "wallet-address-validator";
import { BTC_DOGE_DEC_PLACES, ChainType, DOGE_DUST_AMOUNT } from "../../src/utils/constants";
import { toBNExp } from "../../src/utils/bnutils";
import rewire from "rewire";
import { TransactionStatus } from "../../src/entity/transaction";
import { initializeTestMikroORM } from "../test-orm/mikro-orm.config";
import { UnprotectedDBWalletKeys } from "../test-orm/UnprotectedDBWalletKey";
import {
    addConsoleTransportForTests,
    clearUTXOs,
    createTransactionEntity,
    loop,
    resetMonitoringOnForceExit,
    setMonitoringStatus,
    waitForTxToFinishWithStatus,
} from "../test_util/util";
import BN from "bn.js";
import { fetchMonitoringState } from "../../src/utils/lockManagement";
import { logger } from "../../src/utils/logger";
import { sleepMs } from "../../src/utils/utils";
import { fetchTransactionEntityById } from "../../src/db/dbutils";

use(chaiAsPromised);

const rewiredUTXOWalletImplementation = rewire("../../src/chain-clients/DogeWalletImplementation");
const rewiredUTXOWalletImplementationClass = rewiredUTXOWalletImplementation.__get__("DogeWalletImplementation");

const blockchainAPI = "blockbook";
const DOGEMccConnectionTestInitial = {
    url: process.env.BLOCKBOOK_DOGE_URL ?? "",
    username: "",
    password: "",
    inTestnet: true,
};
const feeServiceConfig: FeeServiceConfig = {
    indexerUrl: process.env.BLOCKBOOK_DOGE_URL ?? "",
    sleepTimeMs: 10000,
    numberOfBlocksInHistory: 3,
}
let DOGEMccConnectionTest: DogecoinWalletConfig;

const fundedMnemonic = "involve essay clean frequent stumble cheese elite custom athlete rack obey walk";
const fundedAddress = "noXb5PiT85PPyQ3WBMLY7BUExm9KpfV93S";
const targetMnemonic = "forum tissue lonely diamond sea invest hill bamboo hamster leaf asset column duck order sock dad beauty valid staff scan hospital pair law cable";
const targetAddress = "npJo8FieqEmB1NehU4jFFEFPsdvy8ippbm";

// first change derivative and xpub
// FUNDED
// xpub:  vpub5ZZjGgAiEbwK4oFTypCwvyHnE7XPFgEHB7iqUqmRrWEnQU9RKLKs6uok1zvwDvdWjmSnNgM2QnTmT477YECcxsxsdJANtdV9qmVfYc39PLS
// first change address: np3gXRRAfJ1fbw3pnkdDR96sbmhEdFjq3v
// first change address private key: ciCVd1m6gFJ2PTRuWjrmXK2KRBLkY8RzgCJ9pqfmqm1XT6L7pXwM
// TARGET
// xpub:  vpub5YEVpE5aqVJiEos7Z1iQgQPcdSM7nfQNB8dfdW7zDGGQrp3MUk2e5aAaCgfsyeQryUHHgxWGteYqkPfCBCpnEGAcqxaFpWAZ7ByJsvXPPzJ
// first change address: nkatKfFLa5wXbtuMHM5vN9qJ3v7UPfkBU9
// first change address private key: cgAnaNqPmVUr3Am1VAzGX9zGEVw5AJ2FWMYw65dBGnUUJs4iTEkP

const fundedFirstChange = {
    xpub: "vpub5ZZjGgAiEbwK4oFTypCwvyHnE7XPFgEHB7iqUqmRrWEnQU9RKLKs6uok1zvwDvdWjmSnNgM2QnTmT477YECcxsxsdJANtdV9qmVfYc39PLS",
    addres: "np3gXRRAfJ1fbw3pnkdDR96sbmhEdFjq3v",
    privateKey: "ciCVd1m6gFJ2PTRuWjrmXK2KRBLkY8RzgCJ9pqfmqm1XT6L7pXwM"
}

const targetFirstChange = {
    xpub: "vpub5YEVpE5aqVJiEos7Z1iQgQPcdSM7nfQNB8dfdW7zDGGQrp3MUk2e5aAaCgfsyeQryUHHgxWGteYqkPfCBCpnEGAcqxaFpWAZ7ByJsvXPPzJ",
    address: "nkatKfFLa5wXbtuMHM5vN9qJ3v7UPfkBU9",
    privateKey: "cgAnaNqPmVUr3Am1VAzGX9zGEVw5AJ2FWMYw65dBGnUUJs4iTEkP"
}

const note = "10000000000000000000000000000000000000000beefbeaddeafdeaddeedcab";


const DOGE_DECIMAL_PLACES = BTC_DOGE_DEC_PLACES;
const amountToSendInSatoshi = toBNExp(1.5, DOGE_DECIMAL_PLACES);
const feeInSatoshi = toBNExp(2, DOGE_DECIMAL_PLACES);
const maxFeeInSatoshi = toBNExp(1.5, DOGE_DECIMAL_PLACES);

let wClient: WALLET.DOGE;
let fundedWallet: ICreateWalletResponse;
let targetWallet: ICreateWalletResponse;

describe("Dogecoin wallet tests", () => {
    let removeConsoleLogging: () => void;

    before(async () => {
        removeConsoleLogging = addConsoleTransportForTests(logger);

        const testOrm = await initializeTestMikroORM();
        const unprotectedDBWalletKeys = new UnprotectedDBWalletKeys(testOrm.em);
        DOGEMccConnectionTest = {
            ...DOGEMccConnectionTestInitial,
            api: blockchainAPI,
            em: testOrm.em,
            walletKeys: unprotectedDBWalletKeys,
            feeServiceConfig: feeServiceConfig,
            enoughConfirmations: 1,
            rateLimitOptions: {
                timeoutMs: 2000,
            }
        };
        wClient = await WALLET.DOGE.initialize(DOGEMccConnectionTest);
        await wClient.feeService?.setupHistory();
        void wClient.feeService?.startMonitoringFees();
        void wClient.startMonitoringTransactionProgress();

        resetMonitoringOnForceExit(wClient);
    });

    after(async () => {
        await wClient.stopMonitoring();
        try {
            await loop(100, 2000, null, async () => {
                const monitoringState = await fetchMonitoringState(wClient.rootEm, wClient.chainType);
                if (!monitoringState || !monitoringState.isMonitoring) return true;
            });
        } catch (e) {
            await setMonitoringStatus(wClient.rootEm, wClient.chainType, false);
        }

        removeConsoleLogging();
    });


    it("Should create account", async () => {
        const newAccount = wClient.createWallet();
        expect(newAccount.address).to.not.be.null;

        fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);
        expect(fundedWallet.address).to.eq(fundedAddress);
        const targetWallet = wClient.createWalletFromMnemonic(targetMnemonic);
        expect(targetWallet.address).to.eq(targetAddress);

        expect(WAValidator.validate(newAccount.address, "DOGE", "testnet")).to.be.true;
        expect(WAValidator.validate(fundedWallet.address, "DOGE", "testnet")).to.be.true;
        expect(WAValidator.validate(targetWallet.address, "DOGE", "testnet")).to.be.true;

        console.log(fundedWallet);
    });

    it("Should prepare and execute transaction", async () => {
        fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);
        const id = await wClient.createPaymentTransaction(fundedWallet.address, fundedWallet.privateKey, targetAddress, amountToSendInSatoshi, undefined, note, undefined);
        expect(id).to.be.gt(0);
        await waitForTxToFinishWithStatus(2, 15 * 60, wClient.rootEm, TransactionStatus.TX_SUCCESS, id);
    });

    it("Should not submit transaction: fee > maxFee", async () => {
        fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);
        const id = await wClient.createPaymentTransaction(fundedWallet.address, fundedWallet.privateKey, targetAddress, amountToSendInSatoshi, feeInSatoshi, "Submit", maxFeeInSatoshi);
        expect(id).to.be.gt(0);

        const [txEnt,] = await waitForTxToFinishWithStatus(2, 30, wClient.rootEm, TransactionStatus.TX_FAILED, id);
        expect(txEnt.maxFee!.lt(txEnt.fee!)).to.be.true;
    });

    it("Should not create transaction: amount = dust amount", async () => {
        const rewired = await setupRewiredWallet();
        await expect(rewired.preparePaymentTransaction(fundedWallet.address, targetAddress, DOGE_DUST_AMOUNT, feeInSatoshi, "Note", maxFeeInSatoshi)).to
            .eventually.be.rejectedWith(`Will not prepare transaction for ${fundedWallet.address}. Amount ${DOGE_DUST_AMOUNT.toString()} is less than dust ${DOGE_DUST_AMOUNT.toString()}`);
    });

    it("Should receive fee", async () => {
        const fee = await wClient.getCurrentTransactionFee({
            source: fundedAddress,
            amount: amountToSendInSatoshi,
            destination: targetAddress
        });
        expect(fee).not.to.be.null;
    });

    it("Should receive latest blockHeight", async () => {
        const index = await wClient.getCurrentBlockHeight();
        expect(index).not.to.be.null;
    });

    it.skip("Should delete account", async () => {
        const targetWallet = wClient.createWalletFromMnemonic(targetMnemonic);
        const balance = await wClient.getAccountBalance(targetWallet.address);
        // delete toDelete account
        const id = await wClient.createDeleteAccountTransaction(targetWallet.address, targetWallet.privateKey, fundedAddress, undefined, note);

        await waitForTxToFinishWithStatus(2, 15 * 60, wClient.rootEm, TransactionStatus.TX_SUCCESS, id);
        const balance2 = await wClient.getAccountBalance(targetWallet.address);
        expect(balance.gt(balance2));
    });

    it("Should get account balance", async () => {
        fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);
        const accountBalance = await wClient.getAccountBalance(fundedWallet.address);
        expect(accountBalance.gt(new BN(0))).to.be.true;
    });

    it("Should get sub-account balances", async () => {
        const balanceMain = await wClient.getAccountBalance(fundedAddress);
        const balanceSub = await wClient.getAccountBalance(fundedFirstChange.addres);
        const balanceMainAndSub = await wClient.getAccountBalance(fundedAddress, [fundedFirstChange.addres]);

        expect(balanceSub.add(balanceMain).toNumber()).to.be.equal(balanceMainAndSub.toNumber());
    });

    it("Transaction with executeUntilBlock before current block height should fail", async () => {
        fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);

        const currentBlock = await wClient.getCurrentBlockHeight();
        const id = await wClient.createPaymentTransaction(fundedWallet.address, fundedWallet.privateKey, targetAddress, amountToSendInSatoshi, feeInSatoshi, "Submit", feeInSatoshi, currentBlock - 5);
        expect(id).to.be.gt(0);

        const [txEnt,] = await waitForTxToFinishWithStatus(2, 40, wClient.rootEm, TransactionStatus.TX_FAILED, id)
        expect(txEnt.status).to.equal(TransactionStatus.TX_FAILED);
    });

    it("Transaction with executeUntilBlock too low should fail (executeUntilBlock - currentBlockHeight < executionBlockOffset)", async () => {
        fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);

        const currentBlock = await wClient.getCurrentBlockHeight();
        const id = await wClient.createPaymentTransaction(fundedWallet.address, fundedWallet.privateKey, targetAddress, amountToSendInSatoshi, feeInSatoshi, "Submit", feeInSatoshi, currentBlock + 1);
        expect(id).to.be.gt(0);

        const [txEnt,] = await waitForTxToFinishWithStatus(2, 40, wClient.rootEm, TransactionStatus.TX_FAILED, id)
        expect(txEnt.status).to.equal(TransactionStatus.TX_FAILED);
    });

    it("Should submit TX_PREPARED that are in DB", async () => {
        const rewired = await setupRewiredWallet();

        const executeUntilBlock = await rewired.getCurrentBlockHeight() + rewired.blockOffset;
        const txEnt = createTransactionEntity(rewired.rootEm, ChainType.testDOGE, fundedWallet.address, targetAddress, amountToSendInSatoshi, feeInSatoshi, note, undefined, executeUntilBlock);
        const transaction = await rewired.preparePaymentTransaction(txEnt.source, txEnt.destination, txEnt.amount, txEnt.fee, note, txEnt.executeUntilBlock);
        txEnt.raw = Buffer.from(JSON.stringify(transaction));
        txEnt.status = TransactionStatus.TX_PREPARED;
        await rewired.rootEm.flush();

        const [tx,] = await waitForTxToFinishWithStatus(2, 15 * 60, rewired.rootEm, TransactionStatus.TX_SUCCESS, txEnt.id);
        expect(tx.status).to.equal(TransactionStatus.TX_SUCCESS);
    });

    it("Should handle TX_PENDING that are in DB", async () => {
        const rewired = await setupRewiredWallet();

        const fee = feeInSatoshi;
        const executeUntilBlock = await rewired.getCurrentBlockHeight() + rewired.blockOffset;
        const txEnt = createTransactionEntity(rewired.rootEm, ChainType.testDOGE, fundedWallet.address, targetAddress, amountToSendInSatoshi, fee, note, undefined, executeUntilBlock);
        const transaction = await rewired.preparePaymentTransaction(fundedWallet.address, targetAddress, amountToSendInSatoshi, fee, note, executeUntilBlock);
        const signed = await rewired.signTransaction(transaction, fundedWallet.privateKey);

        txEnt.raw = Buffer.from(JSON.stringify(transaction));
        txEnt.transactionHash = signed.txHash;
        await rewired.rootEm.flush();
        await rewired.submitTransaction(signed.txBlob, txEnt.id);

        const [tx,] = await waitForTxToFinishWithStatus(2, 15 * 60, rewired.rootEm, TransactionStatus.TX_SUCCESS, txEnt.id);
        expect(tx.status).to.equal(TransactionStatus.TX_SUCCESS);
    });

    it("Should handle empty UTXO list in DB", async () => {
        fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);
        await clearUTXOs(wClient.rootEm);
        const note = "10000000000000000000000000000000000000000beefbeaddeafdeaddeedcab";
        const id = await wClient.createPaymentTransaction(fundedWallet.address, fundedWallet.privateKey, targetAddress, amountToSendInSatoshi, feeInSatoshi, note, undefined);
        expect(id).to.be.gt(0);

        await waitForTxToFinishWithStatus(2, 15 * 60, wClient.rootEm, TransactionStatus.TX_SUCCESS, id);
    });

    it("Balance should change after transaction", async () => {
        fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);
        const sourceBalanceStart = await wClient.getAccountBalance(fundedWallet.address);
        const targetBalanceStart = await wClient.getAccountBalance(targetAddress);

        const id = await wClient.createPaymentTransaction(fundedWallet.address, fundedWallet.privateKey, targetAddress, amountToSendInSatoshi, feeInSatoshi, note, undefined);
        expect(id).to.be.gt(0);
        await waitForTxToFinishWithStatus(2, 15 * 60, wClient.rootEm, TransactionStatus.TX_SUCCESS, id);

        const sourceBalanceEnd = await wClient.getAccountBalance(fundedWallet.address);
        const targetBalanceEnd = await wClient.getAccountBalance(targetAddress);

        expect(sourceBalanceEnd.add(feeInSatoshi).add(amountToSendInSatoshi).toNumber()).to.equal(sourceBalanceStart.toNumber());
        expect(targetBalanceStart.add(amountToSendInSatoshi).toNumber()).to.be.equal(targetBalanceEnd.toNumber());
    });

    it("Transaction with execute until timestamp too low should fail", async () => {
        fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);
        const id = await wClient.createPaymentTransaction(fundedWallet.address, fundedWallet.privateKey, targetAddress, amountToSendInSatoshi, feeInSatoshi, "Submit", undefined, undefined, new Date().getTime() - 10);
        expect(id).to.be.gt(0);

        await waitForTxToFinishWithStatus(2, 30, wClient.rootEm, TransactionStatus.TX_FAILED, id);
    });

    it.skip("Stress test", async () => {
        fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);
        targetWallet = wClient.createWalletFromMnemonic(targetMnemonic);

        const N_TRANSACTIONS = 50;

        const ids = []
        for (let i = 0; i < N_TRANSACTIONS; i++) {
            let id;
            if (Math.random() > 0.5) {
                id = await wClient.createPaymentTransaction(fundedWallet.address, fundedWallet.privateKey, targetAddress, amountToSendInSatoshi, feeInSatoshi);
            } else {
                id = await wClient.createPaymentTransaction(targetWallet.address, targetWallet.privateKey, fundedWallet.address, amountToSendInSatoshi, feeInSatoshi);
            }
            ids.push(id);
        }

        for (const id of ids) {
            await waitForTxToFinishWithStatus(2, 900, wClient.rootEm, TransactionStatus.TX_SUCCESS, id);
        }
    });

    it("Transaction with a too low fee should be updated with a higher fee", async () => {
        fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);
        const startFee = toBNExp(0.0000000000001, 0);
        const id = await wClient.createPaymentTransaction(fundedWallet.address, fundedWallet.privateKey, targetAddress, amountToSendInSatoshi, startFee, note, undefined);
        expect(id).to.be.gt(0);
        const [txEnt, ] = await waitForTxToFinishWithStatus(2, 15 * 60, wClient.rootEm, TransactionStatus.TX_SUCCESS, id);
        expect(txEnt.fee?.toNumber()).to.be.gt(startFee.toNumber());
    });

    it("Already spent UTXOs with wrong status should get a new status - consistency checker", async () => {
        fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);
        const id = await wClient.createPaymentTransaction(fundedWallet.address, fundedWallet.privateKey, targetAddress, amountToSendInSatoshi, undefined, note, undefined);
        expect(id).to.be.gt(0);
        await waitForTxToFinishWithStatus(2, 15 * 60, wClient.rootEm, TransactionStatus.TX_SUCCESS, id);

        let utxoEnt;
        do {
            utxoEnt = await wClient.rootEm.findOne(UTXOEntity, { spentHeight: SpentHeightEnum.SPENT });
            await sleepMs(500);
        } while (!utxoEnt)

        utxoEnt.spentHeight = SpentHeightEnum.UNSPENT;
        await wClient.rootEm.persistAndFlush(utxoEnt);

        const id2 = await wClient.createPaymentTransaction(fundedWallet.address, fundedWallet.privateKey, targetAddress, amountToSendInSatoshi, undefined, note, undefined);
        expect(id2).to.be.gt(0);

        utxoEnt = await wClient.rootEm.findOne(UTXOEntity, { spentHeight: SpentHeightEnum.SPENT });
        assert(utxoEnt !== null);
        assert(utxoEnt.spentHeight === SpentHeightEnum.SPENT);
    });

    it("Test blockchain API connection down", async () => {
        fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);
        const id = await wClient.createPaymentTransaction(fundedWallet.address, fundedWallet.privateKey, targetAddress, amountToSendInSatoshi, undefined, note, undefined);
        expect(id).to.be.gt(0);

        const interceptorId = wClient.blockchainAPI.client.interceptors.request.use(
            config => Promise.reject(`Down`),
        );
        await sleepMs(10000);
        wClient.blockchainAPI.client.interceptors.request.eject(interceptorId);
        await waitForTxToFinishWithStatus(2, 15 * 60, wClient.rootEm, TransactionStatus.TX_SUCCESS, id);
    });

    it("Test service API connection down", async () => {
        fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);
        const id = await wClient.createPaymentTransaction(fundedWallet.address, fundedWallet.privateKey, targetAddress, amountToSendInSatoshi, undefined, note, undefined);
        expect(id).to.be.gt(0);

        const interceptorId = wClient.blockchainAPI.client.interceptors.request.use(
            config => Promise.reject(`Down`),
        );
        await sleepMs(10000);
        wClient.blockchainAPI.client.interceptors.request.eject(interceptorId);
        await waitForTxToFinishWithStatus(2, 15 * 60, wClient.rootEm, TransactionStatus.TX_SUCCESS, id);

        const txEnt = await fetchTransactionEntityById(wClient.rootEm, id);
        const rewired = await setupRewiredWallet();
        const core = rewired.getCore();
        const tr = new core.Transaction(txEnt.raw);

        const estimateFee = rewired.getEstimateFee(tr.inputs.length, tr.outputs.length);
        expect((await estimateFee).toNumber()).to.be.equal(txEnt.fee?.toNumber());

    });

});

async function setupRewiredWallet() {
    const testOrm = await initializeTestMikroORM();
    const unprotectedDBWalletKeys = new UnprotectedDBWalletKeys(testOrm.em);
    DOGEMccConnectionTest = {
        ...DOGEMccConnectionTestInitial,
        api: blockchainAPI,
        em: testOrm.em,
        walletKeys: unprotectedDBWalletKeys,
        feeServiceConfig: feeServiceConfig
    };
    const rewired = new rewiredUTXOWalletImplementationClass(DOGEMccConnectionTest);
    fundedWallet = rewired.createWalletFromMnemonic(fundedMnemonic);

    return rewired;
}
