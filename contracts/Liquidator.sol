// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "fasset/contracts/fasset/interface/IFAsset.sol";
import "fasset/contracts/userInterfaces/IAssetManager.sol";
import "./interface/ILiquidator.sol";
import "./lib/LiquidatorMath.sol";

import "hardhat/console.sol";

enum FlashLoanLockType {
    INACTIVE,
    CALL,
    END_CALL
}

// always assume pool = wrapped native
contract Liquidator is ILiquidator, ReentrancyGuard, Ownable {

    IWNat public immutable wNat; // wrapped native address is constant
    IERC3156FlashLender public flashLender;
    IBlazeSwapRouter public blazeswap;

    // needed for flash loan to only get executed once from runArbitrage
    FlashLoanLockType private flashLoanLockType;

    constructor(
        IWNat _wNat,
        IERC3156FlashLender _flashLender,
        IBlazeSwapRouter _blazeSwap
    ) Ownable() {
        wNat = _wNat;
        flashLender = _flashLender;
        blazeswap = _blazeSwap;
    }

    modifier flashLoanInitiatorLock() {
        flashLoanLockType = FlashLoanLockType.CALL;
        _;
        // after flash loaning there is no external contract calls
        require(flashLoanLockType == FlashLoanLockType.END_CALL,
            "Flash loan not ended by onFlashLoan");
        flashLoanLockType = FlashLoanLockType.INACTIVE;
    }

    modifier flashLoanReceiverLock() {
        require(flashLoanLockType == FlashLoanLockType.CALL,
            "Flash loan not initiated by runArbitrageWithCustomParams");
        flashLoanLockType = FlashLoanLockType.END_CALL;
        _;
    }

    function runArbitrage(
        IIAgentVault _agentVault
    ) external {
        runArbitrageWithCustomParams(_agentVault, flashLender, blazeswap);
    }

    function runArbitrageWithCustomParams(
        IIAgentVault _agentVault,
        IERC3156FlashLender _flashLender,
        IBlazeSwapRouter _blazeSwap
    ) public flashLoanInitiatorLock nonReentrant {
        // extrapolate data
        IAssetManager assetManager = _agentVault.assetManager();
        AssetManagerSettings.Data memory assetManagerSettings = assetManager.getSettings();
        AgentInfo.Info memory agentInfo = assetManager.getAgentInfo(address(_agentVault));
        // send vault collateral to owner (so arbitrage fails in case of decreased funds)
        IERC20 vaultToken = agentInfo.vaultCollateralToken;
        vaultToken.transfer(owner(), vaultToken.balanceOf(address(this)));
        // get max and optimal vault collateral to flash loan
        uint256 maxVaultFlashLoan = flashLender.maxFlashLoan(address(vaultToken));
        uint256 optimalVaultAmount = LiquidatorMath.getUsedVaultCollateral(
            address(wNat),
            agentInfo,
            assetManagerSettings,
            _blazeSwap
        );
        // run flash loan
        _flashLender.flashLoan(
            this,
            address(vaultToken),
            Math.min(optimalVaultAmount, maxVaultFlashLoan),
            abi.encode(
                assetManagerSettings.fAsset,
                assetManager,
                _agentVault,
                _blazeSwap
            )
        );
        // send earnings to sender (have to fix so they are not stolen in onFlashLoan)
        vaultToken.transfer(msg.sender, vaultToken.balanceOf(address(this)));
    }

    // dangerous: think this through!
    // cannot reenter due to flashLoanReceiverLock!
    // can only be run through runArbitrageWithCustomParams and once!
    // previous point makes sure _token is always vault collateral
    // tokens are transfered to owner at runArbitrageWithCustomParams,
    // so contract has zero token balance at each call!
    function onFlashLoan(
        address /* _initiator */,
        address _token,
        uint256 _amount,
        uint256 _fee,
        bytes calldata _data
    ) external flashLoanReceiverLock returns (bytes32) {
        // check that starting contract vault collateral balance
        // is correct (note that anyone can call onFlashLoan)
        uint256 balance = IERC20(_token).balanceOf(address(this));
        require(balance == _amount, "Incorrect flash loan amount");
        // execute arbitrage
        (
            IFAsset _fAsset,
            IAssetManager _assetManager,
            IIAgentVault _agentVault,
            IBlazeSwapRouter _blazeSwap
        ) = abi.decode(_data, (
            IFAsset,
            IAssetManager,
            IIAgentVault,
            IBlazeSwapRouter
        ));
        _executeArbitrage(
            IERC20(_token),
            _fAsset,
            _assetManager,
            _agentVault,
            _blazeSwap,
            _amount
        );
        // approve flash loan spending to flash lender
        IERC20(_token).approve(address(msg.sender), _amount + _fee);
        return keccak256("ERC3156FlashBorrower.onFlashLoan");
    }

    function _executeArbitrage(
        IERC20 _vaultToken,
        IFAsset _fAsset,
        IAssetManager _assetManager,
        IAgentVault _agentVault,
        IBlazeSwapRouter _blazeSwap,
        uint256 _vaultAmount
    ) internal {
        IERC20 _poolToken = wNat; // gas savings
        // swap vault collateral for f-asset
        _vaultToken.approve(address(_blazeSwap), _vaultAmount);
        (, uint256[] memory obtainedFAsset) = _blazeSwap.swapExactTokensForTokens(
            _vaultAmount, 0,
            _toDynamicArray(address(_vaultToken), address(_fAsset)),
            address(this),
            block.timestamp
        );
        _vaultToken.approve(address(_blazeSwap), 0);
        // liquidate obtained f-asset
        (,, uint256 obtainedPool) = _assetManager.liquidate(
            address(_agentVault),
            obtainedFAsset[1]
        );
        // swap pool for vault collateral
        if (obtainedPool > 0) {
            _poolToken.approve(address(_blazeSwap), obtainedPool);
            _blazeSwap.swapExactTokensForTokens(
                obtainedPool, 0,
                _toDynamicArray(address(_poolToken), address(_vaultToken)),
                address(this),
                block.timestamp
            );
            _poolToken.approve(address(_blazeSwap), 0);
        }
    }

    function withdrawToken(IERC20 token) external onlyOwner {
        token.transfer(owner(), token.balanceOf(address(this)));
    }

    function withderawNat() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function _toDynamicArray(
        address _x,
        address _y
    ) private pure returns (address[] memory) {
        address[] memory _arr = new address[](2);
        _arr[0] = _x;
        _arr[1] = _y;
        return _arr;
    }
}
