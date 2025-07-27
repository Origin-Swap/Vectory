import { defineChain } from 'viem';

// Custom chain configuration
export const supra = defineChain({
  id: 2488,
  name: 'NOW',
  network: 'Now Chain Mainnet',
  iconUrl: '/images/chain/now.png',
  iconBackground: 'black',
  nativeCurrency: {
    decimals: 18,
    name: 'NOW Chain',
    symbol: 'NOW',
  },
  rpcUrls: {
    default: { http: ['https://rpc.nowscan.io/'] },
    public: { http: ['https://rpc.nowscan.io/'] },
  },
  blockExplorers: {
    default: {
      name: 'NowScan',
      url: 'https://nowscan.io/',
    },
  },
});
