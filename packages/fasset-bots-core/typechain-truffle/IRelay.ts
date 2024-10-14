/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Truffle } from "./types";

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IRelayContract extends Truffle.Contract<IRelayInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<IRelayInstance>;
}

export type AllEvents = never;

export interface IRelayInstance extends Truffle.ContractInstance {
  merkleRoots(
    _protocolId: number | BN | string,
    _votingRoundId: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  methods: {
    merkleRoots(
      _protocolId: number | BN | string,
      _votingRoundId: number | BN | string,
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
