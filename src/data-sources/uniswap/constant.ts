import { Token, ChainId } from '@uniswap/sdk-core'

export const WETH_TOKEN = new Token(
  ChainId.MAINNET,
  '0x0000000000000000000000000000000000000000',
  18,
  'ETH',
  'Ether'
)

export const USDC_TOKEN = new Token(
  ChainId.MAINNET,
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  6,
  'USDC',
  'USDC'
)

export const WBTC_TOKEN = new Token(
  ChainId.MAINNET,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped Bitcoin'
)

export const LINK_TOKEN = new Token(
  ChainId.MAINNET,
  '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  18,
  'LINK',
  'Chainlink'
)

export const DAI_TOKEN = new Token(
  ChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai'
)

export const WBNB_TOKEN = new Token(
  ChainId.MAINNET,
  '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  18,
  'BNB',
  'Binance Coin'
)

export const QUOTER_CONTRACT_ADDRESS = '0x52F0E24D1c21C8A0cB1e5a5dD6198556BD9E1203'

export const QUOTER_ABI = [
        {
          "inputs": [
            {
              "internalType": "contract IPoolManager",
              "name": "_poolManager",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "revertData",
              "type": "bytes"
            }
          ],
          "name": "UnexpectedRevertBytes",
          "type": "error"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "Currency",
                  "name": "exactCurrency",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "Currency",
                      "name": "intermediateCurrency",
                      "type": "address"
                    },
                    {
                      "internalType": "uint24",
                      "name": "fee",
                      "type": "uint24"
                    },
                    {
                      "internalType": "int24",
                      "name": "tickSpacing",
                      "type": "int24"
                    },
                    {
                      "internalType": "contract IHooks",
                      "name": "hooks",
                      "type": "address"
                    },
                    {
                      "internalType": "bytes",
                      "name": "hookData",
                      "type": "bytes"
                    }
                  ],
                  "internalType": "struct PathKey[]",
                  "name": "path",
                  "type": "tuple[]"
                },
                {
                  "internalType": "uint128",
                  "name": "exactAmount",
                  "type": "uint128"
                }
              ],
              "internalType": "struct IV4Quoter.QuoteExactParams",
              "name": "params",
              "type": "tuple"
            }
          ],
          "name": "quoteExactInput",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasEstimate",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "components": [
                    {
                      "internalType": "Currency",
                      "name": "currency0",
                      "type": "address"
                    },
                    {
                      "internalType": "Currency",
                      "name": "currency1",
                      "type": "address"
                    },
                    {
                      "internalType": "uint24",
                      "name": "fee",
                      "type": "uint24"
                    },
                    {
                      "internalType": "int24",
                      "name": "tickSpacing",
                      "type": "int24"
                    },
                    {
                      "internalType": "contract IHooks",
                      "name": "hooks",
                      "type": "address"
                    }
                  ],
                  "internalType": "struct PoolKey",
                  "name": "poolKey",
                  "type": "tuple"
                },
                {
                  "internalType": "bool",
                  "name": "zeroForOne",
                  "type": "bool"
                },
                {
                  "internalType": "uint128",
                  "name": "exactAmount",
                  "type": "uint128"
                },
                {
                  "internalType": "bytes",
                  "name": "hookData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IV4Quoter.QuoteExactSingleParams",
              "name": "params",
              "type": "tuple"
            }
          ],
          "name": "quoteExactInputSingle",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasEstimate",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "Currency",
                  "name": "exactCurrency",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "Currency",
                      "name": "intermediateCurrency",
                      "type": "address"
                    },
                    {
                      "internalType": "uint24",
                      "name": "fee",
                      "type": "uint24"
                    },
                    {
                      "internalType": "int24",
                      "name": "tickSpacing",
                      "type": "int24"
                    },
                    {
                      "internalType": "contract IHooks",
                      "name": "hooks",
                      "type": "address"
                    },
                    {
                      "internalType": "bytes",
                      "name": "hookData",
                      "type": "bytes"
                    }
                  ],
                  "internalType": "struct PathKey[]",
                  "name": "path",
                  "type": "tuple[]"
                },
                {
                  "internalType": "uint128",
                  "name": "exactAmount",
                  "type": "uint128"
                }
              ],
              "internalType": "struct IV4Quoter.QuoteExactParams",
              "name": "params",
              "type": "tuple"
            }
          ],
          "name": "quoteExactOutput",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasEstimate",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "components": [
                    {
                      "internalType": "Currency",
                      "name": "currency0",
                      "type": "address"
                    },
                    {
                      "internalType": "Currency",
                      "name": "currency1",
                      "type": "address"
                    },
                    {
                      "internalType": "uint24",
                      "name": "fee",
                      "type": "uint24"
                    },
                    {
                      "internalType": "int24",
                      "name": "tickSpacing",
                      "type": "int24"
                    },
                    {
                      "internalType": "contract IHooks",
                      "name": "hooks",
                      "type": "address"
                    }
                  ],
                  "internalType": "struct PoolKey",
                  "name": "poolKey",
                  "type": "tuple"
                },
                {
                  "internalType": "bool",
                  "name": "zeroForOne",
                  "type": "bool"
                },
                {
                  "internalType": "uint128",
                  "name": "exactAmount",
                  "type": "uint128"
                },
                {
                  "internalType": "bytes",
                  "name": "hookData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IV4Quoter.QuoteExactSingleParams",
              "name": "params",
              "type": "tuple"
            }
          ],
          "name": "quoteExactOutputSingle",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasEstimate",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "poolManager",
          "outputs": [
            {
              "internalType": "contract IPoolManager",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
]