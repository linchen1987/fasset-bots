// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "blazeswap/contracts/shared/libraries/Babylonian.sol";
import "./Structs.sol";
import "./Constants.sol";

import "hardhat/console.sol";

library Optimum {
    using Babylonian for uint256;

    function getFlashLoanedVaultCollateral(
        EcosystemData memory _data
    )
        internal pure
        returns (uint256)
    {
        bool numeric
            =  _data.reservePathDex1.length > 1
            || _data.reservePathDex2.length > 1;
        uint256 optVaultCollateral = numeric
            ? numericOptimalVaultCollateral(_data)
            : symbolicOptimalVaultCollateral(_data);
        return _capOrroundInputUpToAmg(_data, optVaultCollateral);
    }

    function symbolicOptimalVaultCollateral(
        EcosystemData memory _data
    )
        internal pure
        returns (uint256 _amount)
    {
        // this formula only works with the default swap path
        require(_data.reservePathDex1.length == 1, "Optimum: invalid dex1 path");
        require(_data.reservePathDex2.length == 1, "Optimum: invalid dex2 path");
        uint256 reserveVaultCT1 = _data.reservePathDex1[0].reserveA;
        uint256 reserveFAsset = _data.reservePathDex1[0].reserveB;
        uint256 reservePoolCT = _data.reservePathDex2[0].reserveA;
        uint256 reserveVaultCT2 = _data.reservePathDex2[0].reserveB;
        // to avoid overflow, we never multiply three non-bips vars
        // (two leave some space, as uniswap allows only 112-bit reserves)
        {
            // scope to avoid stack too deep error
            _amount
                = reserveVaultCT1
                * DEX_FACTOR_BIPS
                / DEX_MAX_BIPS
                * reservePoolCT;
            _amount = _amount.sqrt();
        }
        {
            // scope to avoid stack too deep error
            uint256 _aux1
                = reserveFAsset
                * _data.liquidationFactorVaultBips
                / MAX_BIPS
                * _data.priceFAssetVaultCTMul
                / _data.priceFAssetVaultCTDiv
                * reservePoolCT;
            uint256 _aux2
                = reserveFAsset
                * _data.liquidationFactorPoolBips
                / MAX_BIPS
                * _data.priceFAssetPoolCTMul
                / _data.priceFAssetPoolCTDiv
                * DEX_FACTOR_BIPS
                / DEX_MAX_BIPS
                * reserveVaultCT2;
            _amount *= (_aux1 + _aux2).sqrt();
        }
        {
            // scope to avoid stack too deep error
            uint256 _aux1
                = reserveVaultCT1
                * reservePoolCT;
            if (_aux1 >= _amount) {
                return 0;
            }
            _amount -= _aux1;
        }
        _amount *= DEX_MAX_BIPS;
        _amount /= DEX_FACTOR_BIPS;
        _amount /= reservePoolCT;
    }

    // note: The method finds maximums on the edges of the interval
    function numericOptimalVaultCollateral(
        EcosystemData memory _data
    )
        internal pure
        returns (uint256)
    {
        // assume there's one maximum (probably is tho) and find it with "Golden Section Search"
        uint256 phi = 1618; // Approximation of the golden ratio * 1000
        uint256 invPhi = 1000; // Inverse of phi for fixed point math
        uint256 a = 0;
        uint256 b = _data.maxLiquidatedFAssetUBA;
        for (uint256 i = 0; i < MAX_BISECTION_ITERATIONS; i++) {
            uint256 c = _roundUpWithPrecision(b - (b - a) * invPhi / phi, _data.assetMintingGranularityUBA);
            uint256 d = _roundUpWithPrecision(a + (b - a) * invPhi / phi, _data.assetMintingGranularityUBA);
            if (b - d <= BISECTION_PRECISION)
                break;
            uint256 profitAtC = _calcArbitrageProfit(_data, c);
            uint256 profitAtD = _calcArbitrageProfit(_data, d);
            if (profitAtC > profitAtD) {
                b = d;
            } else {
                a = c;
            }
        }
        uint256 avg = _roundUpWithPrecision((a + b) / 2, _data.assetMintingGranularityUBA);
        uint256 profitAtB = _calcArbitrageProfit(_data, b);
        uint256 profitAtAvg = _calcArbitrageProfit(_data, avg);
        console.log("max profit", Math.max(profitAtAvg, profitAtB));
        if (profitAtAvg == 0 && profitAtB == 0)
            return 0;
        if (profitAtAvg <= profitAtB)
            return _calcSwapAmountIn(b, _data.reservePathDex1);
        return _calcSwapAmountIn(avg, _data.reservePathDex1);
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    // helper functions

    // reduce the amount in such a way that once it gets swapped through the dex1 path,
    // it will produce output that is a multiplier of AMG
    function _capOrroundInputUpToAmg(
        EcosystemData memory _data,
        uint256 _amountIn
    ) private pure returns (uint256) {
        uint256 amountOut = _calcSwapAmountOut(_amountIn, _data.reservePathDex1);
        if (amountOut > _data.maxLiquidatedFAssetUBA) {
            amountOut = _data.maxLiquidatedFAssetUBA; // cap
        }
        uint256 amountOutRoundedToAmg = _roundUpWithPrecision(
            amountOut, _data.assetMintingGranularityUBA);
        if (amountOutRoundedToAmg == 0) return 0;
        uint256 amountIn = _calcSwapAmountIn(amountOutRoundedToAmg, _data.reservePathDex1);
        return amountIn;
    }

    function _calcArbitrageProfit(
        EcosystemData memory _data,
        uint256 _fAssetAmount
    )
        internal pure
        returns (uint256 _profit)
    {
        uint256 vaultLiquidationReward = _fAssetAmount
            * _data.liquidationFactorVaultBips
            * _data.priceFAssetVaultCTMul
            / MAX_BIPS
            / _data.priceFAssetVaultCTDiv;
        uint256 poolLiquidationReward = _fAssetAmount
            * _data.liquidationFactorPoolBips
            * _data.priceFAssetPoolCTMul
            / MAX_BIPS
            / _data.priceFAssetPoolCTDiv;
        uint256 vaultTotalReward = vaultLiquidationReward + _calcSwapAmountOut(
            poolLiquidationReward,
            _data.reservePathDex2
        );
        uint256 vaultAmount = _calcSwapAmountIn(_fAssetAmount, _data.reservePathDex1);
        return vaultTotalReward > vaultAmount ? vaultTotalReward - vaultAmount : 0;
    }

    function _calcSwapAmountIn(
        uint256 _amountOut,
        LiquidityPoolReserves[] memory _reservePath
    )
        private pure
        returns (uint256 _amountIn)
    {
        _amountIn = _amountOut;
        for (uint256 i = _reservePath.length; i > 0; i--) {
            _amountIn = _calcSwapAmountIn(
                _amountIn,
                _reservePath[i-1].reserveA,
                _reservePath[i-1].reserveB
            );
        }
    }

    function _calcSwapAmountOut(
        uint256 _amountIn,
        LiquidityPoolReserves[] memory _reservePath
    )
        private pure
        returns (uint256 _amountOut)
    {
        _amountOut = _amountIn;
        for (uint256 i = 0; i < _reservePath.length; i++) {
            _amountOut = _calcSwapAmountOut(
                _amountOut,
                _reservePath[i].reserveA,
                _reservePath[i].reserveB
            );
        }
    }

    // given an output amount of an asset and pair reserves,
    // returns a required input amount of the other asset
    function _calcSwapAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut
    )
        private pure
        returns (uint256 amountIn)
    {
        uint256 numerator = reserveIn * amountOut * DEX_MAX_BIPS;
        uint256 denominator = (reserveOut - amountOut) * DEX_FACTOR_BIPS;
        amountIn = numerator / denominator + 1;
    }

    // given an input amount of an asset and pair reserves,
    // returns the maximum output amount of the other asset
    function _calcSwapAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    )
        private pure
        returns (uint256 amountOut)
    {
        uint256 amountInWithFee = amountIn * DEX_FACTOR_BIPS;
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = reserveIn * DEX_MAX_BIPS + amountInWithFee;
        amountOut = numerator / denominator;
    }

    function _roundUpWithPrecision(
        uint256 _amount,
        uint256 _precision
    )
        private pure
        returns (uint256)
    {
        uint256 _aux = _amount % _precision;
        return (_aux == 0) ? _amount : _amount + _precision - _aux;
    }

}