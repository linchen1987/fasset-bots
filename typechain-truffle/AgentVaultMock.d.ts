/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface AgentVaultMockContract
  extends Truffle.Contract<AgentVaultMockInstance> {
  "new"(
    _assetManager: string,
    _owner: string,
    meta?: Truffle.TransactionDetails
  ): Promise<AgentVaultMockInstance>;
}

type AllEvents = never;

export interface AgentVaultMockInstance extends Truffle.ContractInstance {
  assetManager(txDetails?: Truffle.TransactionDetails): Promise<string>;

  callFunctionAt: {
    (
      _contract: string,
      _payload: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _contract: string,
      _payload: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _contract: string,
      _payload: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _contract: string,
      _payload: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  enterPool: {
    (_contingencyPool: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _contingencyPool: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _contingencyPool: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _contingencyPool: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

  methods: {
    assetManager(txDetails?: Truffle.TransactionDetails): Promise<string>;

    callFunctionAt: {
      (
        _contract: string,
        _payload: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _contract: string,
        _payload: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _contract: string,
        _payload: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _contract: string,
        _payload: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    enterPool: {
      (
        _contingencyPool: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _contingencyPool: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _contingencyPool: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _contingencyPool: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    owner(txDetails?: Truffle.TransactionDetails): Promise<string>;
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
