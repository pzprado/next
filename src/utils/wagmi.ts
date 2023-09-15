import { CHAINS } from "providers/config";
import { PUBLIC_NODES } from "providers/nodes";
import memoize from "lodash/memoize";
import { configureChains, createConfig, createStorage } from "wagmi";
import { mainnet } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { LedgerConnector } from "wagmi/connectors/ledger";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// get most configs chain nodes length
const mostNodesConfig = Object.values(PUBLIC_NODES).reduce((prev, cur) => {
  return cur.length > prev ? cur.length : prev;
}, 0);

export const { publicClient, chains } = configureChains(
  CHAINS,
  Array.from({ length: mostNodesConfig })
    .map((_, i) => i)
    .map((i) => {
      return jsonRpcProvider({
        rpc: (chain) => {
          if (
            process.env.NODE_ENV === "test" &&
            chain.id === mainnet.id &&
            i === 0
          ) {
            return { http: "https://eth.llamarpc.com" };
          }
          return PUBLIC_NODES[chain.id]?.[i]
            ? {
                http: PUBLIC_NODES[chain.id][i],
              }
            : null;
        },
      });
    }),
  {
    batch: {
      multicall: {
        batchSize: 1024 * 200,
        wait: 16,
      },
    },
    pollingInterval: 6_000,
  }
);

export const injectedConnector = new InjectedConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
});

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: "Lekker Finance",
    appLogoUrl: "https://pancakeswap.com/logo.png",
  },
});

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    showQrModal: true,
    projectId: "e542ff314e26ff34de2d4fba98db70bb",
  },
});

export const walletConnectNoQrCodeConnector = new WalletConnectConnector({
  chains,
  options: {
    showQrModal: false,
    projectId: "e542ff314e26ff34de2d4fba98db70bb",
  },
});

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
});

const ledgerConnector = new LedgerConnector({
  chains,
  options: {
    projectId: "e542ff314e26ff34de2d4fba98db70bb",
  },
});

export const noopStorage = {
  getItem: (_key: any) => "",
  setItem: (_key: any, _value: any) => null,
  removeItem: (_key: any) => null,
};

export const wagmiConfig = createConfig({
  storage: createStorage({
    storage: typeof window !== "undefined" ? window.localStorage : noopStorage,
    key: "wagmi_v1.1",
  }),
  autoConnect: false,
  publicClient,
  connectors: [
    metaMaskConnector,
    injectedConnector,
    coinbaseConnector,
    walletConnectConnector,

    // @ts-ignore FIXME: wagmi

    ledgerConnector,
  ],
});

export const CHAIN_IDS = chains.map((c) => c.id);

export const isChainSupported = memoize((chainId: number) =>
  (CHAIN_IDS as number[]).includes(chainId)
);
export const isChainTestnet = memoize((chainId: number) => {
  const found = chains.find((c) => c.id === chainId);
  return found ? "testnet" in found : false;
});
