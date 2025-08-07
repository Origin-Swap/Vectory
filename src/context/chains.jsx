import { defineChain } from 'viem';

// Custom chain configuration
export const supra = defineChain({
  id: 519698972793,
  name: 'SUPRA',
  network: 'Supra Testnet',
  iconUrl: '/images/tokens/supra.webp',
  iconBackground: 'black',
  nativeCurrency: {
    decimals: 18,
    name: 'SUPRA EVM',
    symbol: 'SUPRA',
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
