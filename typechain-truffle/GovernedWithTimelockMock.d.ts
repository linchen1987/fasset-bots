/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface GovernedWithTimelockMockContract
  extends Truffle.Contract<GovernedWithTimelockMockInstance> {
  "new"(
    _governanceSettings: string,
    _initialGovernance: string,
    meta?: Truffle.TransactionDetails
  ): Promise<GovernedWithTimelockMockInstance>;
}

export interface GovernanceCallTimelocked {
  name: "GovernanceCallTimelocked";
  args: {
    selector: string;
    allowedAfterTimestamp: BN;
    encodedCall: string;
    0: string;
    1: BN;
    2: string;
  };
}

export interface GovernanceInitialised {
  name: "GovernanceInitialised";
  args: {
    initialGovernance: string;
    0: string;
  };
}

export interface GovernedProductionModeEntered {
  name: "GovernedProductionModeEntered";
  args: {
    governanceSettings: string;
    0: string;
  };
}

export interface TimelockedGovernanceCallCanceled {
  name: "TimelockedGovernanceCallCanceled";
  args: {
    selector: string;
    timestamp: BN;
    0: string;
    1: BN;
  };
}

export interface TimelockedGovernanceCallExecuted {
  name: "TimelockedGovernanceCallExecuted";
  args: {
    selector: string;
    timestamp: BN;
    0: string;
    1: BN;
  };
}

type AllEvents =
  | GovernanceCallTimelocked
  | GovernanceInitialised
  | GovernedProductionModeEntered
  | TimelockedGovernanceCallCanceled
  | TimelockedGovernanceCallExecuted;

export interface GovernedWithTimelockMockInstance
  extends Truffle.ContractInstance {
  a(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  b(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  cancelGovernanceCall: {
    (_selector: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _selector: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _selector: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _selector: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  changeA: {
    (
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  changeB: {
    (
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  changeWithRevert: {
    (
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _value: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  executeGovernanceCall: {
    (_selector: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _selector: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _selector: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _selector: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  governance(txDetails?: Truffle.TransactionDetails): Promise<string>;

  governanceSettings(txDetails?: Truffle.TransactionDetails): Promise<string>;

  increaseA: {
    (
      _increment: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _increment: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _increment: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _increment: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  initialise: {
    (
      _governanceSettings: string,
      _initialGovernance: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _governanceSettings: string,
      _initialGovernance: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _governanceSettings: string,
      _initialGovernance: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _governanceSettings: string,
      _initialGovernance: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  isExecutor(
    _address: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  productionMode(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

  switchToProductionMode: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  timelockedCalls(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN; 1: string }>;

  methods: {
    a(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    b(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    cancelGovernanceCall: {
      (_selector: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _selector: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _selector: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _selector: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    changeA: {
      (
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    changeB: {
      (
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    changeWithRevert: {
      (
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _value: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    executeGovernanceCall: {
      (_selector: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _selector: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _selector: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _selector: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    governance(txDetails?: Truffle.TransactionDetails): Promise<string>;

    governanceSettings(txDetails?: Truffle.TransactionDetails): Promise<string>;

    increaseA: {
      (
        _increment: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _increment: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _increment: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _increment: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    initialise: {
      (
        _governanceSettings: string,
        _initialGovernance: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _governanceSettings: string,
        _initialGovernance: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _governanceSettings: string,
        _initialGovernance: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _governanceSettings: string,
        _initialGovernance: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    isExecutor(
      _address: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    productionMode(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

    switchToProductionMode: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    timelockedCalls(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: string }>;
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