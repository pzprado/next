export enum SupportedChainId {
  // ethereum
  MAINNET = 1,
  SEPOLIA = 11155111,

  // arbitrum
  //ARBITRUM_ONE = 42161,
  ARBITRUM_GOERLI = 421613,

  // base
  BASE_TESTNET = 84531,
}

export const chainIds = [
  SupportedChainId.MAINNET,
  SupportedChainId.SEPOLIA,
  //SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_GOERLI,
  SupportedChainId.BASE_TESTNET,
];

export const MAINNET = 1;
export const SEPOLIA = 11155111;

export const ARBITRUM_ONE = 42161;
export const ARBITRUM_GOERLI = 421613;
export const BASE_TESTNET = 84531;

export const SUPPORTED_CHAIN_IDS = [
  MAINNET,
  SEPOLIA,
  ARBITRUM_ONE,
  ARBITRUM_GOERLI,
  BASE_TESTNET,
];
export const DEFAULT_CHAIN_ID = ARBITRUM_GOERLI; // Change this for production

export const CHAIN_NAMES_MAP: any = {
  [MAINNET]: "Ethereum",
  [SEPOLIA]: "Sepolia",
  [ARBITRUM_ONE]: "Arbitrum One",
  [ARBITRUM_GOERLI]: "Arbitrum Goerli",
  [BASE_TESTNET]: "Base Testnet",
};

export function getExplorerUrl(chainId: number) {
  if (chainId === 11155111) {
    return "https://sepolia.etherscan.io/";
  } else if (chainId === 421611) {
    return "https://goerli.arbiscan.io/";
  } else if (chainId === 42161) {
    return "https://arbiscan.io/";
  }
  return "https://etherscan.io/";
}

export function isChainSupported(chainId: any) {
  return !!chainId && SUPPORTED_CHAIN_IDS.includes(chainId);
}

export function getChainName(chainId: any) {
  return CHAIN_NAMES_MAP[chainId];
}
