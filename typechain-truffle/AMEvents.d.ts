/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface AMEventsContract extends Truffle.Contract<AMEventsInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<AMEventsInstance>;
}

export interface AgentAvailable {
  name: "AgentAvailable";
  args: {
    agentVault: string;
    feeBIPS: BN;
    agentMinCollateralRatioBIPS: BN;
    freeCollateralLots: BN;
    0: string;
    1: BN;
    2: BN;
    3: BN;
  };
}

export interface AgentCreated {
  name: "AgentCreated";
  args: {
    owner: string;
    agentType: BN;
    agentVault: string;
    underlyingAddress: string;
    0: string;
    1: BN;
    2: string;
    3: string;
  };
}

export interface AgentDestroyAnnounced {
  name: "AgentDestroyAnnounced";
  args: {
    agentVault: string;
    timestamp: BN;
    0: string;
    1: BN;
  };
}

export interface AgentDestroyed {
  name: "AgentDestroyed";
  args: {
    agentVault: string;
    0: string;
  };
}

export interface AgentInCCB {
  name: "AgentInCCB";
  args: {
    agentVault: string;
    timestamp: BN;
    0: string;
    1: BN;
  };
}

export interface AvailableAgentExited {
  name: "AvailableAgentExited";
  args: {
    agentVault: string;
    0: string;
  };
}

export interface CollateralReservationDeleted {
  name: "CollateralReservationDeleted";
  args: {
    agentVault: string;
    minter: string;
    collateralReservationId: BN;
    reservedAmountUBA: BN;
    0: string;
    1: string;
    2: BN;
    3: BN;
  };
}

export interface CollateralReserved {
  name: "CollateralReserved";
  args: {
    agentVault: string;
    minter: string;
    collateralReservationId: BN;
    valueUBA: BN;
    feeUBA: BN;
    lastUnderlyingBlock: BN;
    lastUnderlyingTimestamp: BN;
    paymentAddress: string;
    paymentReference: string;
    0: string;
    1: string;
    2: BN;
    3: BN;
    4: BN;
    5: BN;
    6: BN;
    7: string;
    8: string;
  };
}

export interface CollateralWithdrawalAnnounced {
  name: "CollateralWithdrawalAnnounced";
  args: {
    agentVault: string;
    valueNATWei: BN;
    timestamp: BN;
    0: string;
    1: BN;
    2: BN;
  };
}

export interface ContractChanged {
  name: "ContractChanged";
  args: {
    name: string;
    value: string;
    0: string;
    1: string;
  };
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

export interface DustChanged {
  name: "DustChanged";
  args: {
    agentVault: string;
    dustUBA: BN;
    0: string;
    1: BN;
  };
}

export interface DustConvertedToTicket {
  name: "DustConvertedToTicket";
  args: {
    agentVault: string;
    redemptionTicketId: BN;
    valueUBA: BN;
    0: string;
    1: BN;
    2: BN;
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

export interface LiquidationEnded {
  name: "LiquidationEnded";
  args: {
    agentVault: string;
    0: string;
  };
}

export interface LiquidationPerformed {
  name: "LiquidationPerformed";
  args: {
    agentVault: string;
    liquidator: string;
    valueUBA: BN;
    0: string;
    1: string;
    2: BN;
  };
}

export interface LiquidationStarted {
  name: "LiquidationStarted";
  args: {
    agentVault: string;
    timestamp: BN;
    0: string;
    1: BN;
  };
}

export interface MintingExecuted {
  name: "MintingExecuted";
  args: {
    agentVault: string;
    collateralReservationId: BN;
    redemptionTicketId: BN;
    mintedAmountUBA: BN;
    receivedFeeUBA: BN;
    0: string;
    1: BN;
    2: BN;
    3: BN;
    4: BN;
  };
}

export interface MintingPaymentDefault {
  name: "MintingPaymentDefault";
  args: {
    agentVault: string;
    minter: string;
    collateralReservationId: BN;
    reservedAmountUBA: BN;
    0: string;
    1: string;
    2: BN;
    3: BN;
  };
}

export interface RedemptionDefault {
  name: "RedemptionDefault";
  args: {
    agentVault: string;
    redeemer: string;
    redemptionAmountUBA: BN;
    redeemedCollateralWei: BN;
    requestId: BN;
    0: string;
    1: string;
    2: BN;
    3: BN;
    4: BN;
  };
}

export interface RedemptionFinished {
  name: "RedemptionFinished";
  args: {
    agentVault: string;
    freedUnderlyingBalanceUBA: BN;
    requestId: BN;
    0: string;
    1: BN;
    2: BN;
  };
}

export interface RedemptionPaymentBlocked {
  name: "RedemptionPaymentBlocked";
  args: {
    agentVault: string;
    redeemer: string;
    transactionHash: string;
    redemptionAmountUBA: BN;
    requestId: BN;
    0: string;
    1: string;
    2: string;
    3: BN;
    4: BN;
  };
}

export interface RedemptionPaymentFailed {
  name: "RedemptionPaymentFailed";
  args: {
    agentVault: string;
    redeemer: string;
    transactionHash: string;
    requestId: BN;
    failureReason: string;
    0: string;
    1: string;
    2: string;
    3: BN;
    4: string;
  };
}

export interface RedemptionPerformed {
  name: "RedemptionPerformed";
  args: {
    agentVault: string;
    redeemer: string;
    transactionHash: string;
    valueUBA: BN;
    requestId: BN;
    0: string;
    1: string;
    2: string;
    3: BN;
    4: BN;
  };
}

export interface RedemptionRequestIncomplete {
  name: "RedemptionRequestIncomplete";
  args: {
    redeemer: string;
    remainingLots: BN;
    0: string;
    1: BN;
  };
}

export interface RedemptionRequested {
  name: "RedemptionRequested";
  args: {
    agentVault: string;
    requestId: BN;
    paymentAddress: string;
    valueUBA: BN;
    feeUBA: BN;
    lastUnderlyingBlock: BN;
    lastUnderlyingTimestamp: BN;
    paymentReference: string;
    0: string;
    1: BN;
    2: string;
    3: BN;
    4: BN;
    5: BN;
    6: BN;
    7: string;
  };
}

export interface SelfClose {
  name: "SelfClose";
  args: {
    agentVault: string;
    valueUBA: BN;
    0: string;
    1: BN;
  };
}

export interface SettingArrayChanged {
  name: "SettingArrayChanged";
  args: {
    name: string;
    value: BN[];
    0: string;
    1: BN[];
  };
}

export interface SettingChanged {
  name: "SettingChanged";
  args: {
    name: string;
    value: BN;
    0: string;
    1: BN;
  };
}

export interface UnderlyingBalanceToppedUp {
  name: "UnderlyingBalanceToppedUp";
  args: {
    agentVault: string;
    freeBalanceChangeUBA: BN;
    0: string;
    1: BN;
  };
}

export interface UnderlyingFreeBalanceNegative {
  name: "UnderlyingFreeBalanceNegative";
  args: {
    agentVault: string;
    freeBalance: BN;
    0: string;
    1: BN;
  };
}

export interface UnderlyingWithdrawalAnnounced {
  name: "UnderlyingWithdrawalAnnounced";
  args: {
    agentVault: string;
    announcementId: BN;
    paymentReference: string;
    0: string;
    1: BN;
    2: string;
  };
}

export interface UnderlyingWithdrawalCancelled {
  name: "UnderlyingWithdrawalCancelled";
  args: {
    agentVault: string;
    announcementId: BN;
    0: string;
    1: BN;
  };
}

export interface UnderlyingWithdrawalConfirmed {
  name: "UnderlyingWithdrawalConfirmed";
  args: {
    agentVault: string;
    spentUBA: BN;
    transactionHash: string;
    announcementId: BN;
    0: string;
    1: BN;
    2: string;
    3: BN;
  };
}

type AllEvents =
  | AgentAvailable
  | AgentCreated
  | AgentDestroyAnnounced
  | AgentDestroyed
  | AgentInCCB
  | AvailableAgentExited
  | CollateralReservationDeleted
  | CollateralReserved
  | CollateralWithdrawalAnnounced
  | ContractChanged
  | DuplicatePaymentConfirmed
  | DustChanged
  | DustConvertedToTicket
  | FullLiquidationStarted
  | IllegalPaymentConfirmed
  | LiquidationEnded
  | LiquidationPerformed
  | LiquidationStarted
  | MintingExecuted
  | MintingPaymentDefault
  | RedemptionDefault
  | RedemptionFinished
  | RedemptionPaymentBlocked
  | RedemptionPaymentFailed
  | RedemptionPerformed
  | RedemptionRequestIncomplete
  | RedemptionRequested
  | SelfClose
  | SettingArrayChanged
  | SettingChanged
  | UnderlyingBalanceToppedUp
  | UnderlyingFreeBalanceNegative
  | UnderlyingWithdrawalAnnounced
  | UnderlyingWithdrawalCancelled
  | UnderlyingWithdrawalConfirmed;

export interface AMEventsInstance extends Truffle.ContractInstance {
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
