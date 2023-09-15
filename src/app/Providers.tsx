"use client";

import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "utils/wagmi";

import { ConnectKitProvider } from "connectkit";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider
        options={{
          overlayBlur: 2,
          enforceSupportedChains: true,
          initialChainId: 0,
        }}
      >
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
