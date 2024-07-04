import { WALLET } from "../../src";
import { ICreateWalletResponse } from "../../src/interfaces/WriteWalletInterface";
import chaiAsPromised from "chai-as-promised";
import { expect, use } from "chai";
use(chaiAsPromised);
import WAValidator from "wallet-address-validator";
import { BTC_LTC_DOGE_DEC_PLACES } from "../../src/utils/constants";
import { toBNExp } from "../../src/utils/bnutils";
import rewire from "rewire";

const rewiredUTXOWalletImplementation = rewire("../../src/chain-clients/UTXOWalletImplementation");
const rewiredUTXOWalletImplementationClass = rewiredUTXOWalletImplementation.__get__("UTXOWalletImplementation");

const LTCMccConnectionTest = {
   url: process.env.LTC_URL ?? "",
   username: "",
   password: "",
   inTestnet: true,
};

const fundedMnemonic = "once marine attract scorpion track summer choice hamster";
const fundedAddress = "n1Dugv8YbnKQbinGwWKQGkpRwqqHbo2zD4";
const targetMnemonic = "involve essay clean frequent stumble cheese elite custom athlete rack obey walk";
const targetAddress = "mwLGdsLWvvGFapcFsx8mwxBUHfsmTecXe2";

const amountToSendInSatoshi = toBNExp(0.0011, BTC_LTC_DOGE_DEC_PLACES);
const feeInSatoshi = toBNExp(0.0012, BTC_LTC_DOGE_DEC_PLACES);
const maxFeeInSatoshi = toBNExp(0.0011, BTC_LTC_DOGE_DEC_PLACES);

let wClient: WALLET.LTC;
let fundedWallet: ICreateWalletResponse;

describe("Litecoin wallet tests", () => {
   before(async () => {
      wClient = await WALLET.LTC.initialize(LTCMccConnectionTest);
   });

   it("Should create account", async () => {
      const newAccount = wClient.createWallet();
      expect(newAccount.address).to.not.be.null;
      fundedWallet = wClient.createWalletFromMnemonic(fundedMnemonic);
      expect(fundedWallet.address).to.eq(fundedAddress);
      const targetWallet = wClient.createWalletFromMnemonic(targetMnemonic);
      expect(targetWallet.address).to.eq(targetAddress);

      expect(WAValidator.validate(newAccount.address, "LTC", "testnet")).to.be.true;
      expect(WAValidator.validate(fundedWallet.address, "LTC", "testnet")).to.be.true;
      expect(WAValidator.validate(targetWallet.address, "LTC", "testnet")).to.be.true;
   });

   it("Should submit transaction", async () => {
      const rewired = new rewiredUTXOWalletImplementationClass(LTCMccConnectionTest);
      fundedWallet = rewired.createWalletFromMnemonic(fundedMnemonic);
      const fee = await rewired.getCurrentTransactionFee({source: fundedWallet.address, amount: amountToSendInSatoshi, destination: targetAddress});
      const submitted = await rewired.executeLockedSignedTransactionAndWait(fundedWallet.address, fundedWallet.privateKey, targetAddress, amountToSendInSatoshi, undefined, undefined, fee.muln(2));
      expect(typeof submitted).to.equal("object");
   });

   it("Should create transaction with custom fee", async () => {
      const rewired = new rewiredUTXOWalletImplementationClass(LTCMccConnectionTest);
      fundedWallet = rewired.createWalletFromMnemonic(fundedMnemonic);
      const tr = await rewired.preparePaymentTransaction(fundedWallet.address, targetAddress, amountToSendInSatoshi, feeInSatoshi, "Note");
      expect(typeof tr).to.equal("object");
   });

   it("Should not create transaction: maxFee > fee", async () => {
      const rewired = new rewiredUTXOWalletImplementationClass(LTCMccConnectionTest);
      fundedWallet = rewired.createWalletFromMnemonic(fundedMnemonic);
      await expect(rewired.preparePaymentTransaction(fundedWallet.address, targetAddress, amountToSendInSatoshi, feeInSatoshi, "Note", maxFeeInSatoshi)).to.eventually
         .be.rejected;
   });

   it("Should receive fee", async () => {
      const fee = await wClient.getCurrentTransactionFee({source: fundedAddress, amount: amountToSendInSatoshi, destination: targetAddress});
      expect(fee).not.to.be.null;
   });

   // TODO: Internal Server Error: txn-mempool-conflict
   it.skip("Should create and delete account", async () => {
      const rewired = new rewiredUTXOWalletImplementationClass(LTCMccConnectionTest);
      const toDelete = rewired.createWallet();
      expect(toDelete.address).to.not.be.null;
      expect(WAValidator.validate(toDelete.address, "LTC", "testnet")).to.be.true;
      fundedWallet = rewired.createWalletFromMnemonic(fundedMnemonic);
      expect(WAValidator.validate(fundedWallet.address, "LTC", "testnet")).to.be.true;
      // fund toDelete account
      await rewired.executeLockedSignedTransactionAndWait(fundedWallet.address, fundedWallet.privateKey, toDelete.address, amountToSendInSatoshi);
      const balance = await rewired.getAccountBalance(toDelete.address);
      // delete toDelete account
      const note = "deadc000000000000000000000000000000000000beefbeaddeafdeaddeedcab";
      await rewired.deleteAccount(toDelete.address, toDelete.privateKey, fundedWallet.address, undefined, note);
      const balance2 = await rewired.getAccountBalance(toDelete.address);
      expect(balance.gt(balance2));
   });
});
