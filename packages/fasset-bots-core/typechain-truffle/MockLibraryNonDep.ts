/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Truffle } from "./types";

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface MockLibraryNonDepContract
  extends Truffle.Contract<MockLibraryNonDepInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<MockLibraryNonDepInstance>;
}

export interface AgentCollateralTypeChanged {
  name: "AgentCollateralTypeChanged";
  args: {
    agentVault: string;
    collateralClass: BN;
    token: string;
    0: string;
    1: BN;
    2: string;
  };
}

export interface DustChanged {
  name: "DustChanged";
  args: {
    agentVault: string;
    dustUBA: BN;
    0: string;
    1: BN;
  };
}

export interface LiquidationEnded {
  name: "LiquidationEnded";
  args: {
    agentVault: string;
    0: string;
  };
}

export interface PoolTokenRedemptionAnnounced {
  name: "PoolTokenRedemptionAnnounced";
  args: {
    agentVault: string;
    amountWei: BN;
    withdrawalAllowedAt: BN;
    0: string;
    1: BN;
    2: BN;
  };
}

export interface RedemptionTicketCreated {
  name: "RedemptionTicketCreated";
  args: {
    agentVault: string;
    redemptionTicketId: BN;
    ticketValueUBA: BN;
    0: string;
    1: BN;
    2: BN;
  };
}

export interface VaultCollateralWithdrawalAnnounced {
  name: "VaultCollateralWithdrawalAnnounced";
  args: {
    agentVault: string;
    amountWei: BN;
    withdrawalAllowedAt: BN;
    0: string;
    1: BN;
    2: BN;
  };
}

export type AllEvents =
  | AgentCollateralTypeChanged
  | DustChanged
  | LiquidationEnded
  | PoolTokenRedemptionAnnounced
  | RedemptionTicketCreated
  | VaultCollateralWithdrawalAnnounced;

export interface MockLibraryNonDepInstance extends Truffle.ContractInstance {
  getAgentVaultOwner(
    _agentVault: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  getAllAgents(
    _start: number | BN | string,
    _end: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: string[]; 1: BN }>;

  getFAssetsBackedByPool(
    _agentVault: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  isLockedVaultToken(
    _agentVault: string,
    _token: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  methods: {
    getAgentVaultOwner(
      _agentVault: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    getAllAgents(
      _start: number | BN | string,
      _end: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: string[]; 1: BN }>;

    getFAssetsBackedByPool(
      _agentVault: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    isLockedVaultToken(
      _agentVault: string,
      _token: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
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
