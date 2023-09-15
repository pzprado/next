import { mainnet, sepolia, baseGoerli, arbitrumGoerli } from "wagmi/chains";
import memoize from "lodash/memoize";
import { SupportedChainId as ChainId } from "config/chains";

export const CHAIN_QUERY_NAME = {
  [ChainId.MAINNET]: "eth",
  [ChainId.SEPOLIA]: "sepolia",
  [ChainId.ARBITRUM_GOERLI]: "arbGoerli",
  [ChainId.BASE_TESTNET]: "baseTestnet",
} as const satisfies Record<ChainId, string>;

const CHAIN_QUERY_NAME_TO_ID = Object.entries(CHAIN_QUERY_NAME).reduce(
  (acc, [chainId, chainName]) => {
    return {
      [chainName.toLowerCase()]: chainId as unknown as ChainId,
      ...acc,
    };
  },
  {} as Record<string, ChainId>
);

export const getChainId = memoize((chainName: string) => {
  if (!chainName) return undefined;
  return CHAIN_QUERY_NAME_TO_ID[chainName.toLowerCase()]
    ? +CHAIN_QUERY_NAME_TO_ID[chainName.toLowerCase()]
    : undefined;
});

export const L2_CHAIN_IDS: ChainId[] = [
  ChainId.ARBITRUM_GOERLI,
  ChainId.BASE_TESTNET,
];
export const CHAINS = [mainnet, sepolia, baseGoerli, arbitrumGoerli];
