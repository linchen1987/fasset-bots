/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface CollateralTokensContract
  extends Truffle.Contract<CollateralTokensInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<CollateralTokensInstance>;
}

type AllEvents = never;

export interface CollateralTokensInstance extends Truffle.ContractInstance {
  getAllTokenInfos(
    txDetails?: Truffle.TransactionDetails
  ): Promise<
    {
      collateralClass: BN;
      token: string;
      decimals: BN;
      validUntil: BN;
      directPricePair: boolean;
      assetFtsoSymbol: string;
      tokenFtsoSymbol: string;
      minCollateralRatioBIPS: BN;
      ccbMinCollateralRatioBIPS: BN;
      safetyMinCollateralRatioBIPS: BN;
    }[]
  >;

  getInfo(
    _tokenClass: number | BN | string,
    _token: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{
    collateralClass: BN;
    token: string;
    decimals: BN;
    validUntil: BN;
    directPricePair: boolean;
    assetFtsoSymbol: string;
    tokenFtsoSymbol: string;
    minCollateralRatioBIPS: BN;
    ccbMinCollateralRatioBIPS: BN;
    safetyMinCollateralRatioBIPS: BN;
  }>;

  methods: {
    getAllTokenInfos(
      txDetails?: Truffle.TransactionDetails
    ): Promise<
      {
        collateralClass: BN;
        token: string;
        decimals: BN;
        validUntil: BN;
        directPricePair: boolean;
        assetFtsoSymbol: string;
        tokenFtsoSymbol: string;
        minCollateralRatioBIPS: BN;
        ccbMinCollateralRatioBIPS: BN;
        safetyMinCollateralRatioBIPS: BN;
      }[]
    >;

    getInfo(
      _tokenClass: number | BN | string,
      _token: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{
      collateralClass: BN;
      token: string;
      decimals: BN;
      validUntil: BN;
      directPricePair: boolean;
      assetFtsoSymbol: string;
      tokenFtsoSymbol: string;
      minCollateralRatioBIPS: BN;
      ccbMinCollateralRatioBIPS: BN;
      safetyMinCollateralRatioBIPS: BN;
    }>;
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
