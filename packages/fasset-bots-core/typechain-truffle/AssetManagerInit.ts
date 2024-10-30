/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Truffle } from "./types";

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface AssetManagerInitContract
  extends Truffle.Contract<AssetManagerInitInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<AssetManagerInitInstance>;
}

export interface CollateralTypeAdded {
  name: "CollateralTypeAdded";
  args: {
    collateralClass: BN;
    token: string;
    decimals: BN;
    directPricePair: boolean;
    assetFtsoSymbol: string;
    tokenFtsoSymbol: string;
    minCollateralRatioBIPS: BN;
    ccbMinCollateralRatioBIPS: BN;
    safetyMinCollateralRatioBIPS: BN;
    0: BN;
    1: string;
    2: BN;
    3: boolean;
    4: string;
    5: string;
    6: BN;
    7: BN;
    8: BN;
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
  | CollateralTypeAdded
  | GovernanceCallTimelocked
  | GovernanceInitialised
  | GovernedProductionModeEntered
  | TimelockedGovernanceCallCanceled
  | TimelockedGovernanceCallExecuted;

export interface AssetManagerInitInstance extends Truffle.ContractInstance {
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

  init: {
    (
      _governanceSettings: string,
      _initialGovernance: string,
      _settings: {
        assetManagerController: string;
        fAsset: string;
        agentVaultFactory: string;
        collateralPoolFactory: string;
        collateralPoolTokenFactory: string;
        poolTokenSuffix: string;
        whitelist: string;
        agentOwnerRegistry: string;
        fdcVerification: string;
        burnAddress: string;
        priceReader: string;
        assetDecimals: number | BN | string;
        assetMintingDecimals: number | BN | string;
        chainId: string;
        averageBlockTimeMS: number | BN | string;
        mintingPoolHoldingsRequiredBIPS: number | BN | string;
        collateralReservationFeeBIPS: number | BN | string;
        assetUnitUBA: number | BN | string;
        assetMintingGranularityUBA: number | BN | string;
        lotSizeAMG: number | BN | string;
        minUnderlyingBackingBIPS: number | BN | string;
        requireEOAAddressProof: boolean;
        mintingCapAMG: number | BN | string;
        underlyingBlocksForPayment: number | BN | string;
        underlyingSecondsForPayment: number | BN | string;
        redemptionFeeBIPS: number | BN | string;
        redemptionDefaultFactorVaultCollateralBIPS: number | BN | string;
        redemptionDefaultFactorPoolBIPS: number | BN | string;
        confirmationByOthersAfterSeconds: number | BN | string;
        confirmationByOthersRewardUSD5: number | BN | string;
        maxRedeemedTickets: number | BN | string;
        paymentChallengeRewardBIPS: number | BN | string;
        paymentChallengeRewardUSD5: number | BN | string;
        withdrawalWaitMinSeconds: number | BN | string;
        maxTrustedPriceAgeSeconds: number | BN | string;
        ccbTimeSeconds: number | BN | string;
        attestationWindowSeconds: number | BN | string;
        minUpdateRepeatTimeSeconds: number | BN | string;
        buybackCollateralFactorBIPS: number | BN | string;
        announcedUnderlyingConfirmationMinSeconds: number | BN | string;
        tokenInvalidationTimeMinSeconds: number | BN | string;
        vaultCollateralBuyForFlareFactorBIPS: number | BN | string;
        agentExitAvailableTimelockSeconds: number | BN | string;
        agentFeeChangeTimelockSeconds: number | BN | string;
        agentMintingCRChangeTimelockSeconds: number | BN | string;
        poolExitAndTopupChangeTimelockSeconds: number | BN | string;
        agentTimelockedOperationWindowSeconds: number | BN | string;
        collateralPoolTokenTimelockSeconds: number | BN | string;
        liquidationStepSeconds: number | BN | string;
        liquidationCollateralFactorBIPS: (number | BN | string)[];
        liquidationFactorVaultCollateralBIPS: (number | BN | string)[];
        diamondCutMinTimelockSeconds: number | BN | string;
        maxEmergencyPauseDurationSeconds: number | BN | string;
        emergencyPauseDurationResetAfterSeconds: number | BN | string;
        cancelCollateralReservationAfterSeconds: number | BN | string;
        rejectRedemptionRequestWindowSeconds: number | BN | string;
        takeOverRedemptionRequestWindowSeconds: number | BN | string;
        rejectedRedemptionDefaultFactorVaultCollateralBIPS:
          | number
          | BN
          | string;
        rejectedRedemptionDefaultFactorPoolBIPS: number | BN | string;
      },
      _initialCollateralTypes: {
        collateralClass: number | BN | string;
        token: string;
        decimals: number | BN | string;
        validUntil: number | BN | string;
        directPricePair: boolean;
        assetFtsoSymbol: string;
        tokenFtsoSymbol: string;
        minCollateralRatioBIPS: number | BN | string;
        ccbMinCollateralRatioBIPS: number | BN | string;
        safetyMinCollateralRatioBIPS: number | BN | string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _governanceSettings: string,
      _initialGovernance: string,
      _settings: {
        assetManagerController: string;
        fAsset: string;
        agentVaultFactory: string;
        collateralPoolFactory: string;
        collateralPoolTokenFactory: string;
        poolTokenSuffix: string;
        whitelist: string;
        agentOwnerRegistry: string;
        fdcVerification: string;
        burnAddress: string;
        priceReader: string;
        assetDecimals: number | BN | string;
        assetMintingDecimals: number | BN | string;
        chainId: string;
        averageBlockTimeMS: number | BN | string;
        mintingPoolHoldingsRequiredBIPS: number | BN | string;
        collateralReservationFeeBIPS: number | BN | string;
        assetUnitUBA: number | BN | string;
        assetMintingGranularityUBA: number | BN | string;
        lotSizeAMG: number | BN | string;
        minUnderlyingBackingBIPS: number | BN | string;
        requireEOAAddressProof: boolean;
        mintingCapAMG: number | BN | string;
        underlyingBlocksForPayment: number | BN | string;
        underlyingSecondsForPayment: number | BN | string;
        redemptionFeeBIPS: number | BN | string;
        redemptionDefaultFactorVaultCollateralBIPS: number | BN | string;
        redemptionDefaultFactorPoolBIPS: number | BN | string;
        confirmationByOthersAfterSeconds: number | BN | string;
        confirmationByOthersRewardUSD5: number | BN | string;
        maxRedeemedTickets: number | BN | string;
        paymentChallengeRewardBIPS: number | BN | string;
        paymentChallengeRewardUSD5: number | BN | string;
        withdrawalWaitMinSeconds: number | BN | string;
        maxTrustedPriceAgeSeconds: number | BN | string;
        ccbTimeSeconds: number | BN | string;
        attestationWindowSeconds: number | BN | string;
        minUpdateRepeatTimeSeconds: number | BN | string;
        buybackCollateralFactorBIPS: number | BN | string;
        announcedUnderlyingConfirmationMinSeconds: number | BN | string;
        tokenInvalidationTimeMinSeconds: number | BN | string;
        vaultCollateralBuyForFlareFactorBIPS: number | BN | string;
        agentExitAvailableTimelockSeconds: number | BN | string;
        agentFeeChangeTimelockSeconds: number | BN | string;
        agentMintingCRChangeTimelockSeconds: number | BN | string;
        poolExitAndTopupChangeTimelockSeconds: number | BN | string;
        agentTimelockedOperationWindowSeconds: number | BN | string;
        collateralPoolTokenTimelockSeconds: number | BN | string;
        liquidationStepSeconds: number | BN | string;
        liquidationCollateralFactorBIPS: (number | BN | string)[];
        liquidationFactorVaultCollateralBIPS: (number | BN | string)[];
        diamondCutMinTimelockSeconds: number | BN | string;
        maxEmergencyPauseDurationSeconds: number | BN | string;
        emergencyPauseDurationResetAfterSeconds: number | BN | string;
        cancelCollateralReservationAfterSeconds: number | BN | string;
        rejectRedemptionRequestWindowSeconds: number | BN | string;
        takeOverRedemptionRequestWindowSeconds: number | BN | string;
        rejectedRedemptionDefaultFactorVaultCollateralBIPS:
          | number
          | BN
          | string;
        rejectedRedemptionDefaultFactorPoolBIPS: number | BN | string;
      },
      _initialCollateralTypes: {
        collateralClass: number | BN | string;
        token: string;
        decimals: number | BN | string;
        validUntil: number | BN | string;
        directPricePair: boolean;
        assetFtsoSymbol: string;
        tokenFtsoSymbol: string;
        minCollateralRatioBIPS: number | BN | string;
        ccbMinCollateralRatioBIPS: number | BN | string;
        safetyMinCollateralRatioBIPS: number | BN | string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _governanceSettings: string,
      _initialGovernance: string,
      _settings: {
        assetManagerController: string;
        fAsset: string;
        agentVaultFactory: string;
        collateralPoolFactory: string;
        collateralPoolTokenFactory: string;
        poolTokenSuffix: string;
        whitelist: string;
        agentOwnerRegistry: string;
        fdcVerification: string;
        burnAddress: string;
        priceReader: string;
        assetDecimals: number | BN | string;
        assetMintingDecimals: number | BN | string;
        chainId: string;
        averageBlockTimeMS: number | BN | string;
        mintingPoolHoldingsRequiredBIPS: number | BN | string;
        collateralReservationFeeBIPS: number | BN | string;
        assetUnitUBA: number | BN | string;
        assetMintingGranularityUBA: number | BN | string;
        lotSizeAMG: number | BN | string;
        minUnderlyingBackingBIPS: number | BN | string;
        requireEOAAddressProof: boolean;
        mintingCapAMG: number | BN | string;
        underlyingBlocksForPayment: number | BN | string;
        underlyingSecondsForPayment: number | BN | string;
        redemptionFeeBIPS: number | BN | string;
        redemptionDefaultFactorVaultCollateralBIPS: number | BN | string;
        redemptionDefaultFactorPoolBIPS: number | BN | string;
        confirmationByOthersAfterSeconds: number | BN | string;
        confirmationByOthersRewardUSD5: number | BN | string;
        maxRedeemedTickets: number | BN | string;
        paymentChallengeRewardBIPS: number | BN | string;
        paymentChallengeRewardUSD5: number | BN | string;
        withdrawalWaitMinSeconds: number | BN | string;
        maxTrustedPriceAgeSeconds: number | BN | string;
        ccbTimeSeconds: number | BN | string;
        attestationWindowSeconds: number | BN | string;
        minUpdateRepeatTimeSeconds: number | BN | string;
        buybackCollateralFactorBIPS: number | BN | string;
        announcedUnderlyingConfirmationMinSeconds: number | BN | string;
        tokenInvalidationTimeMinSeconds: number | BN | string;
        vaultCollateralBuyForFlareFactorBIPS: number | BN | string;
        agentExitAvailableTimelockSeconds: number | BN | string;
        agentFeeChangeTimelockSeconds: number | BN | string;
        agentMintingCRChangeTimelockSeconds: number | BN | string;
        poolExitAndTopupChangeTimelockSeconds: number | BN | string;
        agentTimelockedOperationWindowSeconds: number | BN | string;
        collateralPoolTokenTimelockSeconds: number | BN | string;
        liquidationStepSeconds: number | BN | string;
        liquidationCollateralFactorBIPS: (number | BN | string)[];
        liquidationFactorVaultCollateralBIPS: (number | BN | string)[];
        diamondCutMinTimelockSeconds: number | BN | string;
        maxEmergencyPauseDurationSeconds: number | BN | string;
        emergencyPauseDurationResetAfterSeconds: number | BN | string;
        cancelCollateralReservationAfterSeconds: number | BN | string;
        rejectRedemptionRequestWindowSeconds: number | BN | string;
        takeOverRedemptionRequestWindowSeconds: number | BN | string;
        rejectedRedemptionDefaultFactorVaultCollateralBIPS:
          | number
          | BN
          | string;
        rejectedRedemptionDefaultFactorPoolBIPS: number | BN | string;
      },
      _initialCollateralTypes: {
        collateralClass: number | BN | string;
        token: string;
        decimals: number | BN | string;
        validUntil: number | BN | string;
        directPricePair: boolean;
        assetFtsoSymbol: string;
        tokenFtsoSymbol: string;
        minCollateralRatioBIPS: number | BN | string;
        ccbMinCollateralRatioBIPS: number | BN | string;
        safetyMinCollateralRatioBIPS: number | BN | string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _governanceSettings: string,
      _initialGovernance: string,
      _settings: {
        assetManagerController: string;
        fAsset: string;
        agentVaultFactory: string;
        collateralPoolFactory: string;
        collateralPoolTokenFactory: string;
        poolTokenSuffix: string;
        whitelist: string;
        agentOwnerRegistry: string;
        fdcVerification: string;
        burnAddress: string;
        priceReader: string;
        assetDecimals: number | BN | string;
        assetMintingDecimals: number | BN | string;
        chainId: string;
        averageBlockTimeMS: number | BN | string;
        mintingPoolHoldingsRequiredBIPS: number | BN | string;
        collateralReservationFeeBIPS: number | BN | string;
        assetUnitUBA: number | BN | string;
        assetMintingGranularityUBA: number | BN | string;
        lotSizeAMG: number | BN | string;
        minUnderlyingBackingBIPS: number | BN | string;
        requireEOAAddressProof: boolean;
        mintingCapAMG: number | BN | string;
        underlyingBlocksForPayment: number | BN | string;
        underlyingSecondsForPayment: number | BN | string;
        redemptionFeeBIPS: number | BN | string;
        redemptionDefaultFactorVaultCollateralBIPS: number | BN | string;
        redemptionDefaultFactorPoolBIPS: number | BN | string;
        confirmationByOthersAfterSeconds: number | BN | string;
        confirmationByOthersRewardUSD5: number | BN | string;
        maxRedeemedTickets: number | BN | string;
        paymentChallengeRewardBIPS: number | BN | string;
        paymentChallengeRewardUSD5: number | BN | string;
        withdrawalWaitMinSeconds: number | BN | string;
        maxTrustedPriceAgeSeconds: number | BN | string;
        ccbTimeSeconds: number | BN | string;
        attestationWindowSeconds: number | BN | string;
        minUpdateRepeatTimeSeconds: number | BN | string;
        buybackCollateralFactorBIPS: number | BN | string;
        announcedUnderlyingConfirmationMinSeconds: number | BN | string;
        tokenInvalidationTimeMinSeconds: number | BN | string;
        vaultCollateralBuyForFlareFactorBIPS: number | BN | string;
        agentExitAvailableTimelockSeconds: number | BN | string;
        agentFeeChangeTimelockSeconds: number | BN | string;
        agentMintingCRChangeTimelockSeconds: number | BN | string;
        poolExitAndTopupChangeTimelockSeconds: number | BN | string;
        agentTimelockedOperationWindowSeconds: number | BN | string;
        collateralPoolTokenTimelockSeconds: number | BN | string;
        liquidationStepSeconds: number | BN | string;
        liquidationCollateralFactorBIPS: (number | BN | string)[];
        liquidationFactorVaultCollateralBIPS: (number | BN | string)[];
        diamondCutMinTimelockSeconds: number | BN | string;
        maxEmergencyPauseDurationSeconds: number | BN | string;
        emergencyPauseDurationResetAfterSeconds: number | BN | string;
        cancelCollateralReservationAfterSeconds: number | BN | string;
        rejectRedemptionRequestWindowSeconds: number | BN | string;
        takeOverRedemptionRequestWindowSeconds: number | BN | string;
        rejectedRedemptionDefaultFactorVaultCollateralBIPS:
          | number
          | BN
          | string;
        rejectedRedemptionDefaultFactorPoolBIPS: number | BN | string;
      },
      _initialCollateralTypes: {
        collateralClass: number | BN | string;
        token: string;
        decimals: number | BN | string;
        validUntil: number | BN | string;
        directPricePair: boolean;
        assetFtsoSymbol: string;
        tokenFtsoSymbol: string;
        minCollateralRatioBIPS: number | BN | string;
        ccbMinCollateralRatioBIPS: number | BN | string;
        safetyMinCollateralRatioBIPS: number | BN | string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

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

    init: {
      (
        _governanceSettings: string,
        _initialGovernance: string,
        _settings: {
          assetManagerController: string;
          fAsset: string;
          agentVaultFactory: string;
          collateralPoolFactory: string;
          collateralPoolTokenFactory: string;
          poolTokenSuffix: string;
          whitelist: string;
          agentOwnerRegistry: string;
          fdcVerification: string;
          burnAddress: string;
          priceReader: string;
          assetDecimals: number | BN | string;
          assetMintingDecimals: number | BN | string;
          chainId: string;
          averageBlockTimeMS: number | BN | string;
          mintingPoolHoldingsRequiredBIPS: number | BN | string;
          collateralReservationFeeBIPS: number | BN | string;
          assetUnitUBA: number | BN | string;
          assetMintingGranularityUBA: number | BN | string;
          lotSizeAMG: number | BN | string;
          minUnderlyingBackingBIPS: number | BN | string;
          requireEOAAddressProof: boolean;
          mintingCapAMG: number | BN | string;
          underlyingBlocksForPayment: number | BN | string;
          underlyingSecondsForPayment: number | BN | string;
          redemptionFeeBIPS: number | BN | string;
          redemptionDefaultFactorVaultCollateralBIPS: number | BN | string;
          redemptionDefaultFactorPoolBIPS: number | BN | string;
          confirmationByOthersAfterSeconds: number | BN | string;
          confirmationByOthersRewardUSD5: number | BN | string;
          maxRedeemedTickets: number | BN | string;
          paymentChallengeRewardBIPS: number | BN | string;
          paymentChallengeRewardUSD5: number | BN | string;
          withdrawalWaitMinSeconds: number | BN | string;
          maxTrustedPriceAgeSeconds: number | BN | string;
          ccbTimeSeconds: number | BN | string;
          attestationWindowSeconds: number | BN | string;
          minUpdateRepeatTimeSeconds: number | BN | string;
          buybackCollateralFactorBIPS: number | BN | string;
          announcedUnderlyingConfirmationMinSeconds: number | BN | string;
          tokenInvalidationTimeMinSeconds: number | BN | string;
          vaultCollateralBuyForFlareFactorBIPS: number | BN | string;
          agentExitAvailableTimelockSeconds: number | BN | string;
          agentFeeChangeTimelockSeconds: number | BN | string;
          agentMintingCRChangeTimelockSeconds: number | BN | string;
          poolExitAndTopupChangeTimelockSeconds: number | BN | string;
          agentTimelockedOperationWindowSeconds: number | BN | string;
          collateralPoolTokenTimelockSeconds: number | BN | string;
          liquidationStepSeconds: number | BN | string;
          liquidationCollateralFactorBIPS: (number | BN | string)[];
          liquidationFactorVaultCollateralBIPS: (number | BN | string)[];
          diamondCutMinTimelockSeconds: number | BN | string;
          maxEmergencyPauseDurationSeconds: number | BN | string;
          emergencyPauseDurationResetAfterSeconds: number | BN | string;
          cancelCollateralReservationAfterSeconds: number | BN | string;
          rejectRedemptionRequestWindowSeconds: number | BN | string;
          takeOverRedemptionRequestWindowSeconds: number | BN | string;
          rejectedRedemptionDefaultFactorVaultCollateralBIPS:
            | number
            | BN
            | string;
          rejectedRedemptionDefaultFactorPoolBIPS: number | BN | string;
        },
        _initialCollateralTypes: {
          collateralClass: number | BN | string;
          token: string;
          decimals: number | BN | string;
          validUntil: number | BN | string;
          directPricePair: boolean;
          assetFtsoSymbol: string;
          tokenFtsoSymbol: string;
          minCollateralRatioBIPS: number | BN | string;
          ccbMinCollateralRatioBIPS: number | BN | string;
          safetyMinCollateralRatioBIPS: number | BN | string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _governanceSettings: string,
        _initialGovernance: string,
        _settings: {
          assetManagerController: string;
          fAsset: string;
          agentVaultFactory: string;
          collateralPoolFactory: string;
          collateralPoolTokenFactory: string;
          poolTokenSuffix: string;
          whitelist: string;
          agentOwnerRegistry: string;
          fdcVerification: string;
          burnAddress: string;
          priceReader: string;
          assetDecimals: number | BN | string;
          assetMintingDecimals: number | BN | string;
          chainId: string;
          averageBlockTimeMS: number | BN | string;
          mintingPoolHoldingsRequiredBIPS: number | BN | string;
          collateralReservationFeeBIPS: number | BN | string;
          assetUnitUBA: number | BN | string;
          assetMintingGranularityUBA: number | BN | string;
          lotSizeAMG: number | BN | string;
          minUnderlyingBackingBIPS: number | BN | string;
          requireEOAAddressProof: boolean;
          mintingCapAMG: number | BN | string;
          underlyingBlocksForPayment: number | BN | string;
          underlyingSecondsForPayment: number | BN | string;
          redemptionFeeBIPS: number | BN | string;
          redemptionDefaultFactorVaultCollateralBIPS: number | BN | string;
          redemptionDefaultFactorPoolBIPS: number | BN | string;
          confirmationByOthersAfterSeconds: number | BN | string;
          confirmationByOthersRewardUSD5: number | BN | string;
          maxRedeemedTickets: number | BN | string;
          paymentChallengeRewardBIPS: number | BN | string;
          paymentChallengeRewardUSD5: number | BN | string;
          withdrawalWaitMinSeconds: number | BN | string;
          maxTrustedPriceAgeSeconds: number | BN | string;
          ccbTimeSeconds: number | BN | string;
          attestationWindowSeconds: number | BN | string;
          minUpdateRepeatTimeSeconds: number | BN | string;
          buybackCollateralFactorBIPS: number | BN | string;
          announcedUnderlyingConfirmationMinSeconds: number | BN | string;
          tokenInvalidationTimeMinSeconds: number | BN | string;
          vaultCollateralBuyForFlareFactorBIPS: number | BN | string;
          agentExitAvailableTimelockSeconds: number | BN | string;
          agentFeeChangeTimelockSeconds: number | BN | string;
          agentMintingCRChangeTimelockSeconds: number | BN | string;
          poolExitAndTopupChangeTimelockSeconds: number | BN | string;
          agentTimelockedOperationWindowSeconds: number | BN | string;
          collateralPoolTokenTimelockSeconds: number | BN | string;
          liquidationStepSeconds: number | BN | string;
          liquidationCollateralFactorBIPS: (number | BN | string)[];
          liquidationFactorVaultCollateralBIPS: (number | BN | string)[];
          diamondCutMinTimelockSeconds: number | BN | string;
          maxEmergencyPauseDurationSeconds: number | BN | string;
          emergencyPauseDurationResetAfterSeconds: number | BN | string;
          cancelCollateralReservationAfterSeconds: number | BN | string;
          rejectRedemptionRequestWindowSeconds: number | BN | string;
          takeOverRedemptionRequestWindowSeconds: number | BN | string;
          rejectedRedemptionDefaultFactorVaultCollateralBIPS:
            | number
            | BN
            | string;
          rejectedRedemptionDefaultFactorPoolBIPS: number | BN | string;
        },
        _initialCollateralTypes: {
          collateralClass: number | BN | string;
          token: string;
          decimals: number | BN | string;
          validUntil: number | BN | string;
          directPricePair: boolean;
          assetFtsoSymbol: string;
          tokenFtsoSymbol: string;
          minCollateralRatioBIPS: number | BN | string;
          ccbMinCollateralRatioBIPS: number | BN | string;
          safetyMinCollateralRatioBIPS: number | BN | string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _governanceSettings: string,
        _initialGovernance: string,
        _settings: {
          assetManagerController: string;
          fAsset: string;
          agentVaultFactory: string;
          collateralPoolFactory: string;
          collateralPoolTokenFactory: string;
          poolTokenSuffix: string;
          whitelist: string;
          agentOwnerRegistry: string;
          fdcVerification: string;
          burnAddress: string;
          priceReader: string;
          assetDecimals: number | BN | string;
          assetMintingDecimals: number | BN | string;
          chainId: string;
          averageBlockTimeMS: number | BN | string;
          mintingPoolHoldingsRequiredBIPS: number | BN | string;
          collateralReservationFeeBIPS: number | BN | string;
          assetUnitUBA: number | BN | string;
          assetMintingGranularityUBA: number | BN | string;
          lotSizeAMG: number | BN | string;
          minUnderlyingBackingBIPS: number | BN | string;
          requireEOAAddressProof: boolean;
          mintingCapAMG: number | BN | string;
          underlyingBlocksForPayment: number | BN | string;
          underlyingSecondsForPayment: number | BN | string;
          redemptionFeeBIPS: number | BN | string;
          redemptionDefaultFactorVaultCollateralBIPS: number | BN | string;
          redemptionDefaultFactorPoolBIPS: number | BN | string;
          confirmationByOthersAfterSeconds: number | BN | string;
          confirmationByOthersRewardUSD5: number | BN | string;
          maxRedeemedTickets: number | BN | string;
          paymentChallengeRewardBIPS: number | BN | string;
          paymentChallengeRewardUSD5: number | BN | string;
          withdrawalWaitMinSeconds: number | BN | string;
          maxTrustedPriceAgeSeconds: number | BN | string;
          ccbTimeSeconds: number | BN | string;
          attestationWindowSeconds: number | BN | string;
          minUpdateRepeatTimeSeconds: number | BN | string;
          buybackCollateralFactorBIPS: number | BN | string;
          announcedUnderlyingConfirmationMinSeconds: number | BN | string;
          tokenInvalidationTimeMinSeconds: number | BN | string;
          vaultCollateralBuyForFlareFactorBIPS: number | BN | string;
          agentExitAvailableTimelockSeconds: number | BN | string;
          agentFeeChangeTimelockSeconds: number | BN | string;
          agentMintingCRChangeTimelockSeconds: number | BN | string;
          poolExitAndTopupChangeTimelockSeconds: number | BN | string;
          agentTimelockedOperationWindowSeconds: number | BN | string;
          collateralPoolTokenTimelockSeconds: number | BN | string;
          liquidationStepSeconds: number | BN | string;
          liquidationCollateralFactorBIPS: (number | BN | string)[];
          liquidationFactorVaultCollateralBIPS: (number | BN | string)[];
          diamondCutMinTimelockSeconds: number | BN | string;
          maxEmergencyPauseDurationSeconds: number | BN | string;
          emergencyPauseDurationResetAfterSeconds: number | BN | string;
          cancelCollateralReservationAfterSeconds: number | BN | string;
          rejectRedemptionRequestWindowSeconds: number | BN | string;
          takeOverRedemptionRequestWindowSeconds: number | BN | string;
          rejectedRedemptionDefaultFactorVaultCollateralBIPS:
            | number
            | BN
            | string;
          rejectedRedemptionDefaultFactorPoolBIPS: number | BN | string;
        },
        _initialCollateralTypes: {
          collateralClass: number | BN | string;
          token: string;
          decimals: number | BN | string;
          validUntil: number | BN | string;
          directPricePair: boolean;
          assetFtsoSymbol: string;
          tokenFtsoSymbol: string;
          minCollateralRatioBIPS: number | BN | string;
          ccbMinCollateralRatioBIPS: number | BN | string;
          safetyMinCollateralRatioBIPS: number | BN | string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _governanceSettings: string,
        _initialGovernance: string,
        _settings: {
          assetManagerController: string;
          fAsset: string;
          agentVaultFactory: string;
          collateralPoolFactory: string;
          collateralPoolTokenFactory: string;
          poolTokenSuffix: string;
          whitelist: string;
          agentOwnerRegistry: string;
          fdcVerification: string;
          burnAddress: string;
          priceReader: string;
          assetDecimals: number | BN | string;
          assetMintingDecimals: number | BN | string;
          chainId: string;
          averageBlockTimeMS: number | BN | string;
          mintingPoolHoldingsRequiredBIPS: number | BN | string;
          collateralReservationFeeBIPS: number | BN | string;
          assetUnitUBA: number | BN | string;
          assetMintingGranularityUBA: number | BN | string;
          lotSizeAMG: number | BN | string;
          minUnderlyingBackingBIPS: number | BN | string;
          requireEOAAddressProof: boolean;
          mintingCapAMG: number | BN | string;
          underlyingBlocksForPayment: number | BN | string;
          underlyingSecondsForPayment: number | BN | string;
          redemptionFeeBIPS: number | BN | string;
          redemptionDefaultFactorVaultCollateralBIPS: number | BN | string;
          redemptionDefaultFactorPoolBIPS: number | BN | string;
          confirmationByOthersAfterSeconds: number | BN | string;
          confirmationByOthersRewardUSD5: number | BN | string;
          maxRedeemedTickets: number | BN | string;
          paymentChallengeRewardBIPS: number | BN | string;
          paymentChallengeRewardUSD5: number | BN | string;
          withdrawalWaitMinSeconds: number | BN | string;
          maxTrustedPriceAgeSeconds: number | BN | string;
          ccbTimeSeconds: number | BN | string;
          attestationWindowSeconds: number | BN | string;
          minUpdateRepeatTimeSeconds: number | BN | string;
          buybackCollateralFactorBIPS: number | BN | string;
          announcedUnderlyingConfirmationMinSeconds: number | BN | string;
          tokenInvalidationTimeMinSeconds: number | BN | string;
          vaultCollateralBuyForFlareFactorBIPS: number | BN | string;
          agentExitAvailableTimelockSeconds: number | BN | string;
          agentFeeChangeTimelockSeconds: number | BN | string;
          agentMintingCRChangeTimelockSeconds: number | BN | string;
          poolExitAndTopupChangeTimelockSeconds: number | BN | string;
          agentTimelockedOperationWindowSeconds: number | BN | string;
          collateralPoolTokenTimelockSeconds: number | BN | string;
          liquidationStepSeconds: number | BN | string;
          liquidationCollateralFactorBIPS: (number | BN | string)[];
          liquidationFactorVaultCollateralBIPS: (number | BN | string)[];
          diamondCutMinTimelockSeconds: number | BN | string;
          maxEmergencyPauseDurationSeconds: number | BN | string;
          emergencyPauseDurationResetAfterSeconds: number | BN | string;
          cancelCollateralReservationAfterSeconds: number | BN | string;
          rejectRedemptionRequestWindowSeconds: number | BN | string;
          takeOverRedemptionRequestWindowSeconds: number | BN | string;
          rejectedRedemptionDefaultFactorVaultCollateralBIPS:
            | number
            | BN
            | string;
          rejectedRedemptionDefaultFactorPoolBIPS: number | BN | string;
        },
        _initialCollateralTypes: {
          collateralClass: number | BN | string;
          token: string;
          decimals: number | BN | string;
          validUntil: number | BN | string;
          directPricePair: boolean;
          assetFtsoSymbol: string;
          tokenFtsoSymbol: string;
          minCollateralRatioBIPS: number | BN | string;
          ccbMinCollateralRatioBIPS: number | BN | string;
          safetyMinCollateralRatioBIPS: number | BN | string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

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
