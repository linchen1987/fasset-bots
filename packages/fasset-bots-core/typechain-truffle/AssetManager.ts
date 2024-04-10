/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Truffle } from "./types";

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface AssetManagerContract
  extends Truffle.Contract<AssetManagerInstance> {
  "new"(
    _diamondCut: {
      facetAddress: string;
      action: number | BN | string;
      functionSelectors: string[];
    }[],
    _init: string,
    _initCalldata: string,
    meta?: Truffle.TransactionDetails
  ): Promise<AssetManagerInstance>;
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

export type AllEvents = DiamondCut;

export interface AssetManagerInstance extends Truffle.ContractInstance {
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
