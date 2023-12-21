/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Truffle } from "./types";

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface GovernanceSettingsContract
  extends Truffle.Contract<GovernanceSettingsInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<GovernanceSettingsInstance>;
}

export interface GovernanceAddressUpdated {
  name: "GovernanceAddressUpdated";
  args: {
    timestamp: BN;
    oldGovernanceAddress: string;
    newGovernanceAddress: string;
    0: BN;
    1: string;
    2: string;
  };
}

export interface GovernanceExecutorsUpdated {
  name: "GovernanceExecutorsUpdated";
  args: {
    timestamp: BN;
    oldExecutors: string[];
    newExecutors: string[];
    0: BN;
    1: string[];
    2: string[];
  };
}

export interface GovernanceTimelockUpdated {
  name: "GovernanceTimelockUpdated";
  args: {
    timestamp: BN;
    oldTimelock: BN;
    newTimelock: BN;
    0: BN;
    1: BN;
    2: BN;
  };
}

export type AllEvents =
  | GovernanceAddressUpdated
  | GovernanceExecutorsUpdated
  | GovernanceTimelockUpdated;

export interface GovernanceSettingsInstance extends Truffle.ContractInstance {
  SIGNAL_COINBASE(txDetails?: Truffle.TransactionDetails): Promise<string>;

  getExecutors(txDetails?: Truffle.TransactionDetails): Promise<string[]>;

  getGovernanceAddress(txDetails?: Truffle.TransactionDetails): Promise<string>;

  getTimelock(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  initialise: {
    (
      _governanceAddress: string,
      _timelock: number | BN | string,
      _executors: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _governanceAddress: string,
      _timelock: number | BN | string,
      _executors: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _governanceAddress: string,
      _timelock: number | BN | string,
      _executors: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _governanceAddress: string,
      _timelock: number | BN | string,
      _executors: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  isExecutor(
    _address: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  setExecutors: {
    (_newExecutors: string[], txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _newExecutors: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _newExecutors: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _newExecutors: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setGovernanceAddress: {
    (_newGovernance: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _newGovernance: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _newGovernance: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _newGovernance: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setTimelock: {
    (
      _newTimelock: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _newTimelock: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _newTimelock: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _newTimelock: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    SIGNAL_COINBASE(txDetails?: Truffle.TransactionDetails): Promise<string>;

    getExecutors(txDetails?: Truffle.TransactionDetails): Promise<string[]>;

    getGovernanceAddress(
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    getTimelock(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    initialise: {
      (
        _governanceAddress: string,
        _timelock: number | BN | string,
        _executors: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _governanceAddress: string,
        _timelock: number | BN | string,
        _executors: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _governanceAddress: string,
        _timelock: number | BN | string,
        _executors: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _governanceAddress: string,
        _timelock: number | BN | string,
        _executors: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    isExecutor(
      _address: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    setExecutors: {
      (
        _newExecutors: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _newExecutors: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _newExecutors: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _newExecutors: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setGovernanceAddress: {
      (_newGovernance: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _newGovernance: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _newGovernance: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _newGovernance: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setTimelock: {
      (
        _newTimelock: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _newTimelock: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _newTimelock: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _newTimelock: number | BN | string,
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