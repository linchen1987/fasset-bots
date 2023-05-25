/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface ChallengesContract
  extends Truffle.Contract<ChallengesInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<ChallengesInstance>;
}

export interface DuplicatePaymentConfirmed {
  name: "DuplicatePaymentConfirmed";
  args: {
    agentVault: string;
    transactionHash1: string;
    transactionHash2: string;
    0: string;
    1: string;
    2: string;
  };
}

export interface FullLiquidationStarted {
  name: "FullLiquidationStarted";
  args: {
    agentVault: string;
    timestamp: BN;
    0: string;
    1: BN;
  };
}

export interface IllegalPaymentConfirmed {
  name: "IllegalPaymentConfirmed";
  args: {
    agentVault: string;
    transactionHash: string;
    0: string;
    1: string;
  };
}

export interface UnderlyingBalanceTooLow {
  name: "UnderlyingBalanceTooLow";
  args: {
    agentVault: string;
    balance: BN;
    requiredBalance: BN;
    0: string;
    1: BN;
    2: BN;
  };
}

type AllEvents =
  | DuplicatePaymentConfirmed
  | FullLiquidationStarted
  | IllegalPaymentConfirmed
  | UnderlyingBalanceTooLow;

export interface ChallengesInstance extends Truffle.ContractInstance {
  methods: {};

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
