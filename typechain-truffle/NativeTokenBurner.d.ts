/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface NativeTokenBurnerContract
  extends Truffle.Contract<NativeTokenBurnerInstance> {
  "new"(
    _burnAddress: string,
    meta?: Truffle.TransactionDetails
  ): Promise<NativeTokenBurnerInstance>;
}

export interface Burned {
  name: "Burned";
  args: {
    burnAddress: string;
    burnedWei: BN;
    0: string;
    1: BN;
  };
}

export interface Received {
  name: "Received";
  args: {
    amountWei: BN;
    0: BN;
  };
}

type AllEvents = Burned | Received;

export interface NativeTokenBurnerInstance extends Truffle.ContractInstance {
  burnAddress(txDetails?: Truffle.TransactionDetails): Promise<string>;

  die: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  methods: {
    burnAddress(txDetails?: Truffle.TransactionDetails): Promise<string>;

    die: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}