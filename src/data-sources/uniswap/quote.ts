import { ethers, JsonRpcProvider, formatUnits, parseUnits } from 'ethers'
import { QUOTER_CONTRACT_ADDRESS, USDC_TOKEN, QUOTER_ABI, WETH_TOKEN, WBTC_TOKEN, LINK_TOKEN, DAI_TOKEN } from './constant'
import dotenv from 'dotenv'
dotenv.config()

// STILL WORKING ON THIS


const quoterContract = new ethers.Contract(
  QUOTER_CONTRACT_ADDRESS,
  QUOTER_ABI,
  new JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`) 
) as any

type Erc20Like = { address: string; decimals: number; symbol?: string }

async function quoteExactInSingleForPair(tokenIn: Erc20Like, tokenOut: Erc20Like, humanAmountIn = '1') {
  const zeroAddress = '0x0000000000000000000000000000000000000000'

  const inAddr = tokenIn.address
  const outAddr = tokenOut.address

  const currency0 = inAddr.toLowerCase() < outAddr.toLowerCase() ? inAddr : outAddr
  const currency1 = inAddr.toLowerCase() < outAddr.toLowerCase() ? outAddr : inAddr
  const zeroForOne = inAddr.toLowerCase() === currency0.toLowerCase()

  const amountIn = parseUnits(humanAmountIn, tokenIn.decimals).toString()

  const feeOptions = [
    { fee: 100, tickSpacing: 1 },
    { fee: 500, tickSpacing: 10 },
    { fee: 3000, tickSpacing: 60 },
    { fee: 10000, tickSpacing: 200 },
  ]

  let bestAmountOut = null as null | bigint
  let bestFee = null as null | number

  for (const { fee, tickSpacing } of feeOptions) {
    const poolKey = { currency0, currency1, fee, tickSpacing, hooks: zeroAddress }
    try {
      const { amountOut } = await quoterContract.quoteExactInputSingle.staticCall({
        poolKey,
        zeroForOne,
        exactAmount: amountIn,
        hookData: '0x00',
      })

      if (bestAmountOut === null || amountOut > bestAmountOut) {
        bestAmountOut = amountOut as bigint
        bestFee = fee
      }
    } catch (error) {
      // Try next fee tier
    }
  }

  if (bestAmountOut !== null) {
    const formatted = formatUnits(bestAmountOut, tokenOut.decimals)
    const inSym = tokenIn.symbol ?? 'TOKEN_IN'
    const outSym = tokenOut.symbol ?? 'TOKEN_OUT'
    console.log(`${inSym} -> ${outSym} (best fee ${bestFee}): ${formatted}`)
    return
  }

  const inSym = tokenIn.symbol ?? 'TOKEN_IN'
  const outSym = tokenOut.symbol ?? 'TOKEN_OUT'
  console.error(`No pool quote for ${inSym} -> ${outSym} at common fee tiers`)
}

async function getQuote() {
  await quoteExactInSingleForPair(WETH_TOKEN, USDC_TOKEN)
  await quoteExactInSingleForPair(WBTC_TOKEN, USDC_TOKEN)
  await quoteExactInSingleForPair(LINK_TOKEN, USDC_TOKEN)
  await quoteExactInSingleForPair(DAI_TOKEN, USDC_TOKEN)
}


getQuote().catch(error => {
    console.error('Error getting quote:', error);
});