/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IDistributionToDelegatorsContract
  extends Truffle.Contract<IDistributionToDelegatorsInstance> {
  "new"(
    meta?: Truffle.TransactionDetails
  ): Promise<IDistributionToDelegatorsInstance>;
}

export interface AccountClaimed {
  name: "AccountClaimed";
  args: {
    whoClaimed: string;
    sentTo: string;
    month: BN;
    amountWei: BN;
    0: string;
    1: string;
    2: BN;
    3: BN;
  };
}

export interface AccountOptOut {
  name: "AccountOptOut";
  args: {
    theAccount: string;
    confirmed: boolean;
    0: string;
    1: boolean;
  };
}

export interface AllowedClaimRecipientsChanged {
  name: "AllowedClaimRecipientsChanged";
  args: {
    rewardOwner: string;
    recipients: string[];
    0: string;
    1: string[];
  };
}

export interface ClaimExecutorsChanged {
  name: "ClaimExecutorsChanged";
  args: {
    rewardOwner: string;
    executors: string[];
    0: string;
    1: string[];
  };
}

export interface EntitlementStart {
  name: "EntitlementStart";
  args: {
    entitlementStartTs: BN;
    0: BN;
  };
}

type AllEvents =
  | AccountClaimed
  | AccountOptOut
  | AllowedClaimRecipientsChanged
  | ClaimExecutorsChanged
  | EntitlementStart;

export interface IDistributionToDelegatorsInstance
  extends Truffle.ContractInstance {
  allowedClaimRecipients(
    _rewardOwner: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string[]>;

  claim: {
    (
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  claimAndWrap: {
    (
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  claimAndWrapByExecutor: {
    (
      _rewardOwner: string,
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _rewardOwner: string,
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      _rewardOwner: string,
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _rewardOwner: string,
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  claimByExecutor: {
    (
      _rewardOwner: string,
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _rewardOwner: string,
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      _rewardOwner: string,
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _rewardOwner: string,
      _recipient: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  claimExecutors(
    _rewardOwner: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string[]>;

  claimToPersonalDelegationAccount: {
    (
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  claimToPersonalDelegationAccountByExecutor: {
    (
      _rewardOwner: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _rewardOwner: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      _rewardOwner: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _rewardOwner: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getClaimableAmount(
    _month: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getClaimableAmountOf(
    account: string,
    _month: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getClaimedAmount(
    _month: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getClaimedAmountOf(
    _account: string,
    _month: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getCurrentMonth(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  getMonthToExpireNext(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  optOutOfAirdrop: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  secondsTillNextClaim(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  setAllowedClaimRecipients: {
    (_recipients: string[], txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _recipients: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _recipients: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _recipients: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setClaimExecutors: {
    (_executors: string[], txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _executors: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _executors: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _executors: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    allowedClaimRecipients(
      _rewardOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string[]>;

    claim: {
      (
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    claimAndWrap: {
      (
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    claimAndWrapByExecutor: {
      (
        _rewardOwner: string,
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _rewardOwner: string,
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        _rewardOwner: string,
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _rewardOwner: string,
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    claimByExecutor: {
      (
        _rewardOwner: string,
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _rewardOwner: string,
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        _rewardOwner: string,
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _rewardOwner: string,
        _recipient: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    claimExecutors(
      _rewardOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string[]>;

    claimToPersonalDelegationAccount: {
      (
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    claimToPersonalDelegationAccountByExecutor: {
      (
        _rewardOwner: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _rewardOwner: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        _rewardOwner: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _rewardOwner: string,
        _month: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getClaimableAmount(
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getClaimableAmountOf(
      account: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getClaimedAmount(
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getClaimedAmountOf(
      _account: string,
      _month: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getCurrentMonth(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    getMonthToExpireNext(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    optOutOfAirdrop: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    secondsTillNextClaim(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    setAllowedClaimRecipients: {
      (_recipients: string[], txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _recipients: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _recipients: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _recipients: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setClaimExecutors: {
      (_executors: string[], txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _executors: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _executors: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _executors: string[],
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
