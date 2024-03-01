import { Contract, MaxUint256 } from "ethers"
import { waitFinalize } from "../finalization"
import { abi as uniswapV2PairAbi } from '../../../../artifacts/contracts/interface/IUniswapV2/IUniswapV2Pair.sol/IUniswapV2Pair.json'
import type { Signer, JsonRpcProvider, AddressLike } from "ethers"
import type { IUniswapV2Router, IERC20Metadata, IUniswapV2Pair } from "../../../../types"


export async function safelyGetReserves(
    uniswapV2: IUniswapV2Router,
    tokenA: IERC20Metadata,
    tokenB: IERC20Metadata
): Promise<[bigint, bigint]> {
    let reserveA = BigInt(0)
    let reserveB = BigInt(0)
    try {({ 0: reserveA, 1: reserveB } = await uniswapV2.getReserves(tokenA, tokenB))} catch (e) {}
    return [reserveA, reserveB]
}

export async function getPairFor(
    uniswapV2: IUniswapV2Router,
    tokenA: AddressLike,
    tokenB: AddressLike,
    provider: JsonRpcProvider
): Promise<IUniswapV2Pair> {
    const address = await uniswapV2.pairFor(tokenA, tokenB)
    return new Contract(address, uniswapV2PairAbi, provider) as any
}

// uniswapV2 add liquidity with wait finalize
export async function addLiquidity(
    uniswapV2: IUniswapV2Router,
    tokenA: IERC20Metadata,
    tokenB: IERC20Metadata,
    amountA: bigint,
    amountB: bigint,
    signer: Signer,
    provider: JsonRpcProvider
): Promise<void> {
    await waitFinalize(provider, signer, tokenA.connect(signer).approve(uniswapV2, amountA))
    await waitFinalize(provider, signer, tokenB.connect(signer).approve(uniswapV2, amountB))
    await waitFinalize(provider, signer, uniswapV2.connect(signer).addLiquidity(
        tokenA, tokenB,
        amountA, amountB,
        0, 0, 0, 0,
        signer,
        MaxUint256
    ))
}

// remove liquidity with wait finalize
export async function removeLiquidity(
    uniswapV2: IUniswapV2Router,
    tokenA: IERC20Metadata,
    tokenB: IERC20Metadata,
    signer: Signer,
    provider: JsonRpcProvider
): Promise<void> {
    const pair = await getPairFor(uniswapV2, tokenA, tokenB, provider)
    const dexTokens = await pair.balanceOf(signer)
    if (dexTokens > BigInt(0)) {
        await waitFinalize(provider, signer, pair.connect(signer).approve(uniswapV2, dexTokens))
        await waitFinalize(provider, signer, uniswapV2.connect(signer).removeLiquidity(
            tokenA, tokenB,
            dexTokens,
            0, 0,
            signer,
            MaxUint256
        ))
    } else {
        console.log('remove liquidity failure: no liquidity to remove')
    }
}

export async function swap(
    uniswapV2: IUniswapV2Router,
    tokenA: IERC20Metadata,
    tokenB: IERC20Metadata,
    amountA: bigint,
    signer: Signer,
    provider: JsonRpcProvider
): Promise<void> {
    await waitFinalize(provider, signer, tokenA.connect(signer).approve(uniswapV2, amountA))
    await waitFinalize(provider, signer, uniswapV2.connect(signer).swapExactTokensForTokens(
        amountA, 0,
        [tokenA, tokenB],
        signer,
        MaxUint256
    ))
}