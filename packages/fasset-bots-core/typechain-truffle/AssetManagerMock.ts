/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Truffle } from "./types";

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface AssetManagerMockContract
  extends Truffle.Contract<AssetManagerMockInstance> {
  "new"(
    _wNat: string,
    meta?: Truffle.TransactionDetails
  ): Promise<AssetManagerMockInstance>;
}

export interface AgentRedemption {
  name: "AgentRedemption";
  args: {
    _amountUBA: BN;
    _executor: string;
    0: BN;
    1: string;
  };
}

export interface AgentRedemptionInCollateral {
  name: "AgentRedemptionInCollateral";
  args: {
    _amountUBA: BN;
    0: BN;
  };
}

export type AllEvents = AgentRedemption | AgentRedemptionInCollateral;

export interface AssetManagerMockInstance extends Truffle.ContractInstance {
  assetPriceDiv(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  assetPriceMul(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  assetPriceNatWei(
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN; 1: BN }>;

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

  fAsset(txDetails?: Truffle.TransactionDetails): Promise<string>;

  fasset(txDetails?: Truffle.TransactionDetails): Promise<string>;

  getAgentVaultOwner(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  getCollateralPool(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  getCollateralPoolTokenTimelockSeconds(
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getFAssetsBackedByPool(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getWNat(txDetails?: Truffle.TransactionDetails): Promise<string>;

  isAgentVaultOwner(
    arg0: string,
    _address: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  lotSize(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  maxRedemptionFromAgent(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  payoutNAT: {
    (
      _agentVault: string,
      _recipient: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _agentVault: string,
      _recipient: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _agentVault: string,
      _recipient: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _agentVault: string,
      _recipient: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  redeemFromAgent: {
    (
      arg0: string,
      arg1: string,
      _amountUBA: number | BN | string,
      arg3: string,
      _executor: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      arg0: string,
      arg1: string,
      _amountUBA: number | BN | string,
      arg3: string,
      _executor: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      arg0: string,
      arg1: string,
      _amountUBA: number | BN | string,
      arg3: string,
      _executor: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      arg0: string,
      arg1: string,
      _amountUBA: number | BN | string,
      arg3: string,
      _executor: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  redeemFromAgentInCollateral: {
    (
      arg0: string,
      arg1: string,
      _amountUBA: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      arg0: string,
      arg1: string,
      _amountUBA: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      arg0: string,
      arg1: string,
      _amountUBA: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      arg0: string,
      arg1: string,
      _amountUBA: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  registerFAssetForCollateralPool: {
    (_fasset: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _fasset: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _fasset: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _fasset: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setAssetPriceNatWei: {
    (
      _mul: number | BN | string,
      _div: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _mul: number | BN | string,
      _div: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _mul: number | BN | string,
      _div: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _mul: number | BN | string,
      _div: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setCheckForValidAgentVaultAddress: {
    (_check: boolean, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _check: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _check: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _check: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setCollateralPool: {
    (pool: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(pool: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      pool: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      pool: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setCommonOwner: {
    (_owner: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(_owner: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      _owner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _owner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setLotSize: {
    (
      _lotSize: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _lotSize: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _lotSize: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _lotSize: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setMaxRedemptionFromAgent: {
    (
      _maxRedemption: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _maxRedemption: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _maxRedemption: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _maxRedemption: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setTimelockDuration: {
    (
      _timelockDuration: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _timelockDuration: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _timelockDuration: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _timelockDuration: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  updateCollateral: {
    (
      arg0: string,
      arg1: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      arg0: string,
      arg1: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      arg0: string,
      arg1: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      arg0: string,
      arg1: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    assetPriceDiv(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    assetPriceMul(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    assetPriceNatWei(
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: BN }>;

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

    fAsset(txDetails?: Truffle.TransactionDetails): Promise<string>;

    fasset(txDetails?: Truffle.TransactionDetails): Promise<string>;

    getAgentVaultOwner(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    getCollateralPool(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    getCollateralPoolTokenTimelockSeconds(
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getFAssetsBackedByPool(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getWNat(txDetails?: Truffle.TransactionDetails): Promise<string>;

    isAgentVaultOwner(
      arg0: string,
      _address: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    lotSize(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    maxRedemptionFromAgent(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    payoutNAT: {
      (
        _agentVault: string,
        _recipient: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _agentVault: string,
        _recipient: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _agentVault: string,
        _recipient: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _agentVault: string,
        _recipient: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    redeemFromAgent: {
      (
        arg0: string,
        arg1: string,
        _amountUBA: number | BN | string,
        arg3: string,
        _executor: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        arg0: string,
        arg1: string,
        _amountUBA: number | BN | string,
        arg3: string,
        _executor: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        arg0: string,
        arg1: string,
        _amountUBA: number | BN | string,
        arg3: string,
        _executor: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        arg0: string,
        arg1: string,
        _amountUBA: number | BN | string,
        arg3: string,
        _executor: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    redeemFromAgentInCollateral: {
      (
        arg0: string,
        arg1: string,
        _amountUBA: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        arg0: string,
        arg1: string,
        _amountUBA: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        arg0: string,
        arg1: string,
        _amountUBA: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        arg0: string,
        arg1: string,
        _amountUBA: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    registerFAssetForCollateralPool: {
      (_fasset: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _fasset: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _fasset: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _fasset: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setAssetPriceNatWei: {
      (
        _mul: number | BN | string,
        _div: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _mul: number | BN | string,
        _div: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _mul: number | BN | string,
        _div: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _mul: number | BN | string,
        _div: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setCheckForValidAgentVaultAddress: {
      (_check: boolean, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _check: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _check: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _check: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setCollateralPool: {
      (pool: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(pool: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(
        pool: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        pool: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setCommonOwner: {
      (_owner: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _owner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _owner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _owner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setLotSize: {
      (
        _lotSize: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _lotSize: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _lotSize: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _lotSize: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setMaxRedemptionFromAgent: {
      (
        _maxRedemption: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _maxRedemption: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _maxRedemption: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _maxRedemption: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setTimelockDuration: {
      (
        _timelockDuration: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _timelockDuration: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _timelockDuration: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _timelockDuration: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    updateCollateral: {
      (
        arg0: string,
        arg1: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        arg0: string,
        arg1: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        arg0: string,
        arg1: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        arg0: string,
        arg1: string,
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
