/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Truffle } from "./types";

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface Base58MockContract
  extends Truffle.Contract<Base58MockInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<Base58MockInstance>;
}

export type AllEvents = never;

export interface Base58MockInstance extends Truffle.ContractInstance {
  decode(
    _data: string,
    _alphabet: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: string; 1: boolean }>;

  methods: {
    decode(
      _data: string,
      _alphabet: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: string; 1: boolean }>;
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