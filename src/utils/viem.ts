import { SupportedChainId as ChainId } from "config/chains";
import { CHAINS } from "providers/config";
import { PUBLIC_NODES } from "providers/nodes";
import { createPublicClient, http, fallback, PublicClient } from "viem";

export const viemClients = CHAINS.reduce((prev, cur) => {
  return {
    ...prev,
    [cur.id]: createPublicClient({
      chain: cur,
      transport: fallback(
        (PUBLIC_NODES[cur.id] as string[]).map((url) =>
          http(url, {
            timeout: 15_000,
          })
        ),
        {
          rank: false,
        }
      ),
      batch: {
        multicall: {
          //@ts-ignore
          batchSize: cur.id === ChainId.POLYGON_ZKEVM ? 128 : 1024 * 200,
        },
      },
    }),
  };
}, {} as Record<ChainId, PublicClient>);

export const getViemClients = ({ chainId }: { chainId: ChainId }) => {
  return viemClients[chainId];
};
