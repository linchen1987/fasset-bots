/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Truffle } from "./types";

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IAgentVaultFactoryContract
  extends Truffle.Contract<IAgentVaultFactoryInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<IAgentVaultFactoryInstance>;
}

export type AllEvents = never;

export interface IAgentVaultFactoryInstance extends Truffle.ContractInstance {
  create: {
    (_assetManager: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _assetManager: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    sendTransaction(
      _assetManager: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _assetManager: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  implementation(txDetails?: Truffle.TransactionDetails): Promise<string>;

  upgradeInitCall(
    _proxy: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  methods: {
    create: {
      (_assetManager: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _assetManager: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      sendTransaction(
        _assetManager: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _assetManager: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    implementation(txDetails?: Truffle.TransactionDetails): Promise<string>;

    upgradeInitCall(
      _proxy: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
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
