import { SupportedChainId as ChainId } from 'config/chains'
import { arbitrumGoerli, baseGoerli } from 'wagmi/chains'

export const SERVER_NODES = {
  [ChainId.MAINNET]: ['https://eth.llamarpc.com', 'https://cloudflare-eth.com'],
  [ChainId.SEPOLIA]: ['https://eth-sepolia.public.blastapi.io'],

  [ChainId.ARBITRUM_GOERLI]: arbitrumGoerli.rpcUrls.public.http,

  [ChainId.BASE_TESTNET]: baseGoerli.rpcUrls.public.http
} satisfies Record<ChainId, readonly string[]>

export const PUBLIC_NODES = {
  [ChainId.MAINNET]: ['https://eth.llamarpc.com', 'https://cloudflare-eth.com'],
  [ChainId.SEPOLIA]: ['https://eth-goerli.public.blastapi.io'],

  [ChainId.ARBITRUM_GOERLI]: arbitrumGoerli.rpcUrls.public.http,

  [ChainId.BASE_TESTNET]: baseGoerli.rpcUrls.public.http
} satisfies Record<ChainId, readonly string[]>
