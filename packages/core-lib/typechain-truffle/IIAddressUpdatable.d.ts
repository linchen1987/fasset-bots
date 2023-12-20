/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IIAddressUpdatableContract
  extends Truffle.Contract<IIAddressUpdatableInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<IIAddressUpdatableInstance>;
}

type AllEvents = never;

export interface IIAddressUpdatableInstance extends Truffle.ContractInstance {
  updateContractAddresses: {
    (
      _contractNameHashes: string[],
      _contractAddresses: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _contractNameHashes: string[],
      _contractAddresses: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _contractNameHashes: string[],
      _contractAddresses: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _contractNameHashes: string[],
      _contractAddresses: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    updateContractAddresses: {
      (
        _contractNameHashes: string[],
        _contractAddresses: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _contractNameHashes: string[],
        _contractAddresses: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _contractNameHashes: string[],
        _contractAddresses: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _contractNameHashes: string[],
        _contractAddresses: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
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