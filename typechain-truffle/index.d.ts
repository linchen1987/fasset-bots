/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { MockContractContract } from "./MockContract";
import { MockInterfaceContract } from "./MockInterface";
import { ERC20Contract } from "./ERC20";
import { IERC20MetadataContract } from "./IERC20Metadata";
import { IERC20Contract } from "./IERC20";
import { AgentVaultContract } from "./AgentVault";
import { AgentVaultFactoryContract } from "./AgentVaultFactory";
import { AssetManagerContract } from "./AssetManager";
import { AssetManagerControllerContract } from "./AssetManagerController";
import { CollateralPoolContract } from "./CollateralPool";
import { CollateralPoolFactoryContract } from "./CollateralPoolFactory";
import { CollateralPoolTokenContract } from "./CollateralPoolToken";
import { FAssetContract } from "./FAsset";
import { WhitelistContract } from "./Whitelist";
import { IAddressValidatorContract } from "./IAddressValidator";
import { IAgentVaultContract } from "./IAgentVault";
import { IAgentVaultFactoryContract } from "./IAgentVaultFactory";
import { IAssetManagerContract } from "./IAssetManager";
import { IAssetManagerEventsContract } from "./IAssetManagerEvents";
import { ICollateralPoolContract } from "./ICollateralPool";
import { ICollateralPoolFactoryContract } from "./ICollateralPoolFactory";
import { ICollateralPoolTokenContract } from "./ICollateralPoolToken";
import { IFAssetContract } from "./IFAsset";
import { ILiquidationStrategyContract } from "./ILiquidationStrategy";
import { IWhitelistContract } from "./IWhitelist";
import { IWNatContract } from "./IWNat";
import { AgentsExternalContract } from "./AgentsExternal";
import { AMEventsContract } from "./AMEvents";
import { AvailableAgentsContract } from "./AvailableAgents";
import { CollateralReservationsContract } from "./CollateralReservations";
import { CollateralTokensContract } from "./CollateralTokens";
import { FullAgentInfoContract } from "./FullAgentInfo";
import { LiquidationStrategyImplContract } from "./LiquidationStrategyImpl";
import { ConversionMockContract } from "./ConversionMock";
import { RedemptionQueueMockContract } from "./RedemptionQueueMock";
import { AgentVaultMockContract } from "./AgentVaultMock";
import { AssetManagerMockContract } from "./AssetManagerMock";
import { DistributionToDelegatorsContract } from "./DistributionToDelegators";
import { ERC20MockContract } from "./ERC20Mock";
import { FAssetMockContract } from "./FAssetMock";
import { FtsoManagerMockContract } from "./FtsoManagerMock";
import { FtsoMockContract } from "./FtsoMock";
import { FtsoRegistryMockContract } from "./FtsoRegistryMock";
import { TrivialAddressValidatorMockContract } from "./TrivialAddressValidatorMock";
import { AttestationClientBaseContract } from "./AttestationClientBase";
import { AttestationClientMockContract } from "./AttestationClientMock";
import { AttestationClientSCContract } from "./AttestationClientSC";
import { StateConnectorMockContract } from "./StateConnectorMock";
import { IAttestationClientContract } from "./IAttestationClient";
import { IStateConnectorContract } from "./IStateConnector";
import { AddressUpdatableContract } from "./AddressUpdatable";
import { GovernedContract } from "./Governed";
import { GovernedBaseContract } from "./GovernedBase";
import { AddressUpdatableMockContract } from "./AddressUpdatableMock";
import { GovernedMockContract } from "./GovernedMock";
import { NativeTokenBurnerContract } from "./NativeTokenBurner";
import { SafeMath64MockContract } from "./SafeMath64Mock";
import { SafePctMockContract } from "./SafePctMock";
import { AddressUpdaterContract } from "./AddressUpdater";
import { CheckPointableContract } from "./CheckPointable";
import { DelegatableContract } from "./Delegatable";
import { DelegationHistoryContract } from "./DelegationHistory";
import { GovernanceSettingsContract } from "./GovernanceSettings";
import { IFlareDaemonizeContract } from "./IFlareDaemonize";
import { IIAddressUpdaterContract } from "./IIAddressUpdater";
import { IIFtsoManagerContract } from "./IIFtsoManager";
import { IIFtsoRegistryContract } from "./IIFtsoRegistry";
import { PercentageDelegationContract } from "./PercentageDelegation";
import { SuicidalMockContract } from "./SuicidalMock";
import { VPContractContract } from "./VPContract";
import { VPTokenContract } from "./VPToken";
import { WNatContract } from "./WNat";
import { IIAddressUpdatableContract } from "./IIAddressUpdatable";
import { IIFtsoContract } from "./IIFtso";
import { IFtsoGenesisContract } from "./IFtsoGenesis";
import { IFtsoManagerGenesisContract } from "./IFtsoManagerGenesis";
import { IFtsoRegistryGenesisContract } from "./IFtsoRegistryGenesis";
import { IICleanableContract } from "./IICleanable";
import { IIGovernanceVotePowerContract } from "./IIGovernanceVotePower";
import { IIVPContractContract } from "./IIVPContract";
import { IIVPTokenContract } from "./IIVPToken";
import { IClaimSetupManagerContract } from "./IClaimSetupManager";
import { IDelegationAccountContract } from "./IDelegationAccount";
import { IDistributionToDelegatorsContract } from "./IDistributionToDelegators";
import { IFtsoContract } from "./IFtso";
import { IFtsoManagerContract } from "./IFtsoManager";
import { IFtsoRegistryContract } from "./IFtsoRegistry";
import { IFtsoRewardManagerContract } from "./IFtsoRewardManager";
import { IGovernanceSettingsContract } from "./IGovernanceSettings";
import { IGovernanceVotePowerContract } from "./IGovernanceVotePower";
import { IVPContractEventsContract } from "./IVPContractEvents";
import { IVPTokenContract } from "./IVPToken";

declare global {
  namespace Truffle {
    interface Artifacts {
      require(name: "MockContract"): MockContractContract;
      require(name: "MockInterface"): MockInterfaceContract;
      require(name: "ERC20"): ERC20Contract;
      require(name: "IERC20Metadata"): IERC20MetadataContract;
      require(name: "IERC20"): IERC20Contract;
      require(name: "AgentVault"): AgentVaultContract;
      require(name: "AgentVaultFactory"): AgentVaultFactoryContract;
      require(name: "AssetManager"): AssetManagerContract;
      require(name: "AssetManagerController"): AssetManagerControllerContract;
      require(name: "CollateralPool"): CollateralPoolContract;
      require(name: "CollateralPoolFactory"): CollateralPoolFactoryContract;
      require(name: "CollateralPoolToken"): CollateralPoolTokenContract;
      require(name: "FAsset"): FAssetContract;
      require(name: "Whitelist"): WhitelistContract;
      require(name: "IAddressValidator"): IAddressValidatorContract;
      require(name: "IAgentVault"): IAgentVaultContract;
      require(name: "IAgentVaultFactory"): IAgentVaultFactoryContract;
      require(name: "IAssetManager"): IAssetManagerContract;
      require(name: "IAssetManagerEvents"): IAssetManagerEventsContract;
      require(name: "ICollateralPool"): ICollateralPoolContract;
      require(name: "ICollateralPoolFactory"): ICollateralPoolFactoryContract;
      require(name: "ICollateralPoolToken"): ICollateralPoolTokenContract;
      require(name: "IFAsset"): IFAssetContract;
      require(name: "ILiquidationStrategy"): ILiquidationStrategyContract;
      require(name: "IWhitelist"): IWhitelistContract;
      require(name: "IWNat"): IWNatContract;
      require(name: "AgentsExternal"): AgentsExternalContract;
      require(name: "AMEvents"): AMEventsContract;
      require(name: "AvailableAgents"): AvailableAgentsContract;
      require(name: "CollateralReservations"): CollateralReservationsContract;
      require(name: "CollateralTokens"): CollateralTokensContract;
      require(name: "FullAgentInfo"): FullAgentInfoContract;
      require(name: "LiquidationStrategyImpl"): LiquidationStrategyImplContract;
      require(name: "ConversionMock"): ConversionMockContract;
      require(name: "RedemptionQueueMock"): RedemptionQueueMockContract;
      require(name: "AgentVaultMock"): AgentVaultMockContract;
      require(name: "AssetManagerMock"): AssetManagerMockContract;
      require(
        name: "DistributionToDelegators"
      ): DistributionToDelegatorsContract;
      require(name: "ERC20Mock"): ERC20MockContract;
      require(name: "FAssetMock"): FAssetMockContract;
      require(name: "FtsoManagerMock"): FtsoManagerMockContract;
      require(name: "FtsoMock"): FtsoMockContract;
      require(name: "FtsoRegistryMock"): FtsoRegistryMockContract;
      require(
        name: "TrivialAddressValidatorMock"
      ): TrivialAddressValidatorMockContract;
      require(name: "AttestationClientBase"): AttestationClientBaseContract;
      require(name: "AttestationClientMock"): AttestationClientMockContract;
      require(name: "AttestationClientSC"): AttestationClientSCContract;
      require(name: "StateConnectorMock"): StateConnectorMockContract;
      require(name: "IAttestationClient"): IAttestationClientContract;
      require(name: "IStateConnector"): IStateConnectorContract;
      require(name: "AddressUpdatable"): AddressUpdatableContract;
      require(name: "Governed"): GovernedContract;
      require(name: "GovernedBase"): GovernedBaseContract;
      require(name: "AddressUpdatableMock"): AddressUpdatableMockContract;
      require(name: "GovernedMock"): GovernedMockContract;
      require(name: "NativeTokenBurner"): NativeTokenBurnerContract;
      require(name: "SafeMath64Mock"): SafeMath64MockContract;
      require(name: "SafePctMock"): SafePctMockContract;
      require(name: "AddressUpdater"): AddressUpdaterContract;
      require(name: "CheckPointable"): CheckPointableContract;
      require(name: "Delegatable"): DelegatableContract;
      require(name: "DelegationHistory"): DelegationHistoryContract;
      require(name: "GovernanceSettings"): GovernanceSettingsContract;
      require(name: "IFlareDaemonize"): IFlareDaemonizeContract;
      require(name: "IIAddressUpdater"): IIAddressUpdaterContract;
      require(name: "IIFtsoManager"): IIFtsoManagerContract;
      require(name: "IIFtsoRegistry"): IIFtsoRegistryContract;
      require(name: "PercentageDelegation"): PercentageDelegationContract;
      require(name: "SuicidalMock"): SuicidalMockContract;
      require(name: "VPContract"): VPContractContract;
      require(name: "VPToken"): VPTokenContract;
      require(name: "WNat"): WNatContract;
      require(name: "IIAddressUpdatable"): IIAddressUpdatableContract;
      require(name: "IIFtso"): IIFtsoContract;
      require(name: "IFtsoGenesis"): IFtsoGenesisContract;
      require(name: "IFtsoManagerGenesis"): IFtsoManagerGenesisContract;
      require(name: "IFtsoRegistryGenesis"): IFtsoRegistryGenesisContract;
      require(name: "IICleanable"): IICleanableContract;
      require(name: "IIGovernanceVotePower"): IIGovernanceVotePowerContract;
      require(name: "IIVPContract"): IIVPContractContract;
      require(name: "IIVPToken"): IIVPTokenContract;
      require(name: "IClaimSetupManager"): IClaimSetupManagerContract;
      require(name: "IDelegationAccount"): IDelegationAccountContract;
      require(
        name: "IDistributionToDelegators"
      ): IDistributionToDelegatorsContract;
      require(name: "IFtso"): IFtsoContract;
      require(name: "IFtsoManager"): IFtsoManagerContract;
      require(name: "IFtsoRegistry"): IFtsoRegistryContract;
      require(name: "IFtsoRewardManager"): IFtsoRewardManagerContract;
      require(name: "IGovernanceSettings"): IGovernanceSettingsContract;
      require(name: "IGovernanceVotePower"): IGovernanceVotePowerContract;
      require(name: "IVPContractEvents"): IVPContractEventsContract;
      require(name: "IVPToken"): IVPTokenContract;
    }
  }
}

export { MockContractContract, MockContractInstance } from "./MockContract";
export { MockInterfaceContract, MockInterfaceInstance } from "./MockInterface";
export { ERC20Contract, ERC20Instance } from "./ERC20";
export {
  IERC20MetadataContract,
  IERC20MetadataInstance,
} from "./IERC20Metadata";
export { IERC20Contract, IERC20Instance } from "./IERC20";
export { AgentVaultContract, AgentVaultInstance } from "./AgentVault";
export {
  AgentVaultFactoryContract,
  AgentVaultFactoryInstance,
} from "./AgentVaultFactory";
export { AssetManagerContract, AssetManagerInstance } from "./AssetManager";
export {
  AssetManagerControllerContract,
  AssetManagerControllerInstance,
} from "./AssetManagerController";
export {
  CollateralPoolContract,
  CollateralPoolInstance,
} from "./CollateralPool";
export {
  CollateralPoolFactoryContract,
  CollateralPoolFactoryInstance,
} from "./CollateralPoolFactory";
export {
  CollateralPoolTokenContract,
  CollateralPoolTokenInstance,
} from "./CollateralPoolToken";
export { FAssetContract, FAssetInstance } from "./FAsset";
export { WhitelistContract, WhitelistInstance } from "./Whitelist";
export {
  IAddressValidatorContract,
  IAddressValidatorInstance,
} from "./IAddressValidator";
export { IAgentVaultContract, IAgentVaultInstance } from "./IAgentVault";
export {
  IAgentVaultFactoryContract,
  IAgentVaultFactoryInstance,
} from "./IAgentVaultFactory";
export { IAssetManagerContract, IAssetManagerInstance } from "./IAssetManager";
export {
  IAssetManagerEventsContract,
  IAssetManagerEventsInstance,
} from "./IAssetManagerEvents";
export {
  ICollateralPoolContract,
  ICollateralPoolInstance,
} from "./ICollateralPool";
export {
  ICollateralPoolFactoryContract,
  ICollateralPoolFactoryInstance,
} from "./ICollateralPoolFactory";
export {
  ICollateralPoolTokenContract,
  ICollateralPoolTokenInstance,
} from "./ICollateralPoolToken";
export { IFAssetContract, IFAssetInstance } from "./IFAsset";
export {
  ILiquidationStrategyContract,
  ILiquidationStrategyInstance,
} from "./ILiquidationStrategy";
export { IWhitelistContract, IWhitelistInstance } from "./IWhitelist";
export { IWNatContract, IWNatInstance } from "./IWNat";
export {
  AgentsExternalContract,
  AgentsExternalInstance,
} from "./AgentsExternal";
export { AMEventsContract, AMEventsInstance } from "./AMEvents";
export {
  AvailableAgentsContract,
  AvailableAgentsInstance,
} from "./AvailableAgents";
export {
  CollateralReservationsContract,
  CollateralReservationsInstance,
} from "./CollateralReservations";
export {
  CollateralTokensContract,
  CollateralTokensInstance,
} from "./CollateralTokens";
export { FullAgentInfoContract, FullAgentInfoInstance } from "./FullAgentInfo";
export {
  LiquidationStrategyImplContract,
  LiquidationStrategyImplInstance,
} from "./LiquidationStrategyImpl";
export {
  ConversionMockContract,
  ConversionMockInstance,
} from "./ConversionMock";
export {
  RedemptionQueueMockContract,
  RedemptionQueueMockInstance,
} from "./RedemptionQueueMock";
export {
  AgentVaultMockContract,
  AgentVaultMockInstance,
} from "./AgentVaultMock";
export {
  AssetManagerMockContract,
  AssetManagerMockInstance,
} from "./AssetManagerMock";
export {
  DistributionToDelegatorsContract,
  DistributionToDelegatorsInstance,
} from "./DistributionToDelegators";
export { ERC20MockContract, ERC20MockInstance } from "./ERC20Mock";
export { FAssetMockContract, FAssetMockInstance } from "./FAssetMock";
export {
  FtsoManagerMockContract,
  FtsoManagerMockInstance,
} from "./FtsoManagerMock";
export { FtsoMockContract, FtsoMockInstance } from "./FtsoMock";
export {
  FtsoRegistryMockContract,
  FtsoRegistryMockInstance,
} from "./FtsoRegistryMock";
export {
  TrivialAddressValidatorMockContract,
  TrivialAddressValidatorMockInstance,
} from "./TrivialAddressValidatorMock";
export {
  AttestationClientBaseContract,
  AttestationClientBaseInstance,
} from "./AttestationClientBase";
export {
  AttestationClientMockContract,
  AttestationClientMockInstance,
} from "./AttestationClientMock";
export {
  AttestationClientSCContract,
  AttestationClientSCInstance,
} from "./AttestationClientSC";
export {
  StateConnectorMockContract,
  StateConnectorMockInstance,
} from "./StateConnectorMock";
export {
  IAttestationClientContract,
  IAttestationClientInstance,
} from "./IAttestationClient";
export {
  IStateConnectorContract,
  IStateConnectorInstance,
} from "./IStateConnector";
export {
  AddressUpdatableContract,
  AddressUpdatableInstance,
} from "./AddressUpdatable";
export { GovernedContract, GovernedInstance } from "./Governed";
export { GovernedBaseContract, GovernedBaseInstance } from "./GovernedBase";
export {
  AddressUpdatableMockContract,
  AddressUpdatableMockInstance,
} from "./AddressUpdatableMock";
export { GovernedMockContract, GovernedMockInstance } from "./GovernedMock";
export {
  NativeTokenBurnerContract,
  NativeTokenBurnerInstance,
} from "./NativeTokenBurner";
export {
  SafeMath64MockContract,
  SafeMath64MockInstance,
} from "./SafeMath64Mock";
export { SafePctMockContract, SafePctMockInstance } from "./SafePctMock";
export {
  AddressUpdaterContract,
  AddressUpdaterInstance,
} from "./AddressUpdater";
export {
  CheckPointableContract,
  CheckPointableInstance,
} from "./CheckPointable";
export { DelegatableContract, DelegatableInstance } from "./Delegatable";
export {
  DelegationHistoryContract,
  DelegationHistoryInstance,
} from "./DelegationHistory";
export {
  GovernanceSettingsContract,
  GovernanceSettingsInstance,
} from "./GovernanceSettings";
export {
  IFlareDaemonizeContract,
  IFlareDaemonizeInstance,
} from "./IFlareDaemonize";
export {
  IIAddressUpdaterContract,
  IIAddressUpdaterInstance,
} from "./IIAddressUpdater";
export { IIFtsoManagerContract, IIFtsoManagerInstance } from "./IIFtsoManager";
export {
  IIFtsoRegistryContract,
  IIFtsoRegistryInstance,
} from "./IIFtsoRegistry";
export {
  PercentageDelegationContract,
  PercentageDelegationInstance,
} from "./PercentageDelegation";
export { SuicidalMockContract, SuicidalMockInstance } from "./SuicidalMock";
export { VPContractContract, VPContractInstance } from "./VPContract";
export { VPTokenContract, VPTokenInstance } from "./VPToken";
export { WNatContract, WNatInstance } from "./WNat";
export {
  IIAddressUpdatableContract,
  IIAddressUpdatableInstance,
} from "./IIAddressUpdatable";
export { IIFtsoContract, IIFtsoInstance } from "./IIFtso";
export { IFtsoGenesisContract, IFtsoGenesisInstance } from "./IFtsoGenesis";
export {
  IFtsoManagerGenesisContract,
  IFtsoManagerGenesisInstance,
} from "./IFtsoManagerGenesis";
export {
  IFtsoRegistryGenesisContract,
  IFtsoRegistryGenesisInstance,
} from "./IFtsoRegistryGenesis";
export { IICleanableContract, IICleanableInstance } from "./IICleanable";
export {
  IIGovernanceVotePowerContract,
  IIGovernanceVotePowerInstance,
} from "./IIGovernanceVotePower";
export { IIVPContractContract, IIVPContractInstance } from "./IIVPContract";
export { IIVPTokenContract, IIVPTokenInstance } from "./IIVPToken";
export {
  IClaimSetupManagerContract,
  IClaimSetupManagerInstance,
} from "./IClaimSetupManager";
export {
  IDelegationAccountContract,
  IDelegationAccountInstance,
} from "./IDelegationAccount";
export {
  IDistributionToDelegatorsContract,
  IDistributionToDelegatorsInstance,
} from "./IDistributionToDelegators";
export { IFtsoContract, IFtsoInstance } from "./IFtso";
export { IFtsoManagerContract, IFtsoManagerInstance } from "./IFtsoManager";
export { IFtsoRegistryContract, IFtsoRegistryInstance } from "./IFtsoRegistry";
export {
  IFtsoRewardManagerContract,
  IFtsoRewardManagerInstance,
} from "./IFtsoRewardManager";
export {
  IGovernanceSettingsContract,
  IGovernanceSettingsInstance,
} from "./IGovernanceSettings";
export {
  IGovernanceVotePowerContract,
  IGovernanceVotePowerInstance,
} from "./IGovernanceVotePower";
export {
  IVPContractEventsContract,
  IVPContractEventsInstance,
} from "./IVPContractEvents";
export { IVPTokenContract, IVPTokenInstance } from "./IVPToken";
