/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Truffle } from "./types";

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface DiamondCutFacetContract
  extends Truffle.Contract<DiamondCutFacetInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<DiamondCutFacetInstance>;
}

export interface DiamondCut {
  name: "DiamondCut";
  args: {
    _diamondCut: {
      facetAddress: string;
      action: BN;
      functionSelectors: string[];
    }[];
    _init: string;
    _calldata: string;
    0: { facetAddress: string; action: BN; functionSelectors: string[] }[];
    1: string;
    2: string;
  };
}

export interface GovernanceCallTimelocked {
  name: "GovernanceCallTimelocked";
  args: {
    encodedCall: string;
    encodedCallHash: string;
    allowedAfterTimestamp: BN;
    0: string;
    1: string;
    2: BN;
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
    encodedCallHash: string;
    0: string;
  };
}

export interface TimelockedGovernanceCallExecuted {
  name: "TimelockedGovernanceCallExecuted";
  args: {
    encodedCallHash: string;
    0: string;
  };
}

export type AllEvents =
  | DiamondCut
  | GovernanceCallTimelocked
  | GovernanceInitialised
  | GovernedProductionModeEntered
  | TimelockedGovernanceCallCanceled
  | TimelockedGovernanceCallExecuted;

export interface DiamondCutFacetInstance extends Truffle.ContractInstance {
  cancelGovernanceCall: {
    (_encodedCall: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _encodedCall: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _encodedCall: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _encodedCall: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  diamondCut: {
    (
      _diamondCut: {
        facetAddress: string;
        action: number | BN | string;
        functionSelectors: string[];
      }[],
      _init: string,
      _calldata: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _diamondCut: {
        facetAddress: string;
        action: number | BN | string;
        functionSelectors: string[];
      }[],
      _init: string,
      _calldata: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _diamondCut: {
        facetAddress: string;
        action: number | BN | string;
        functionSelectors: string[];
      }[],
      _init: string,
      _calldata: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _diamondCut: {
        facetAddress: string;
        action: number | BN | string;
        functionSelectors: string[];
      }[],
      _init: string,
      _calldata: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  executeGovernanceCall: {
    (_encodedCall: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _encodedCall: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _encodedCall: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _encodedCall: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  governance(txDetails?: Truffle.TransactionDetails): Promise<string>;

  governanceSettings(txDetails?: Truffle.TransactionDetails): Promise<string>;

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

  methods: {
    cancelGovernanceCall: {
      (_encodedCall: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _encodedCall: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _encodedCall: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _encodedCall: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    diamondCut: {
      (
        _diamondCut: {
          facetAddress: string;
          action: number | BN | string;
          functionSelectors: string[];
        }[],
        _init: string,
        _calldata: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _diamondCut: {
          facetAddress: string;
          action: number | BN | string;
          functionSelectors: string[];
        }[],
        _init: string,
        _calldata: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _diamondCut: {
          facetAddress: string;
          action: number | BN | string;
          functionSelectors: string[];
        }[],
        _init: string,
        _calldata: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _diamondCut: {
          facetAddress: string;
          action: number | BN | string;
          functionSelectors: string[];
        }[],
        _init: string,
        _calldata: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    executeGovernanceCall: {
      (_encodedCall: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _encodedCall: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _encodedCall: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _encodedCall: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    governance(txDetails?: Truffle.TransactionDetails): Promise<string>;

    governanceSettings(txDetails?: Truffle.TransactionDetails): Promise<string>;

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
