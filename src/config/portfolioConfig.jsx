export const portfolioConfig = {
  defaultUserName: 'Crypto Investor',
  apiEndpoints: {
    profile: '/api/profile/',
    tokenPrices: '/api/token-prices/',
    recommendations: '/api/ai-recommendations/'
  },
    defiRecommendations: {
      yieldPools: [
        {
          id: 'yp-1',
          type: 'Yield Pool',
          platform: 'Aave',
          asset: 'USDC',
          apy: '5.8%',
          tvl: '$1.2B',
          risk: 'Low',
          action: 'Deposit',
          reason: 'Highest stablecoin yield with AA+ rated protocol',
          link: 'https://aave.com'
        },
        {
          id: 'yp-2',
          type: 'Yield Pool',
          platform: 'Yearn Finance',
          asset: 'DAI',
          apy: '6.2%',
          tvl: '$850M',
          risk: 'Medium',
          action: 'Deposit',
          reason: 'Auto-compounding vault with yield optimization',
          link: 'https://yearn.finance'
        },
        {
          id: 'yp-3',
          type: 'Yield Pool',
          platform: 'Balancer',
          asset: 'ETH-USDC',
          apy: '8.5%',
          tvl: '$320M',
          risk: 'Medium',
          action: 'Provide Liquidity',
          reason: 'High yield pool with 50-50 balanced exposure',
          link: 'https://balancer.fi'
        }
      ],
      staking: [
        {
          id: 'st-1',
          type: 'Staking',
          platform: 'Lido',
          asset: 'ETH',
          apy: '4.2%',
          tvl: '$14B',
          risk: 'Medium',
          action: 'Stake',
          reason: 'Liquid staking with stETH tokens',
          link: 'https://lido.fi'
        },
        {
          id: 'st-2',
          type: 'Staking',
          platform: 'Rocket Pool',
          asset: 'ETH',
          apy: '4.8%',
          tvl: '$2.1B',
          risk: 'Medium',
          action: 'Stake',
          reason: 'Decentralized ETH staking with rETH',
          link: 'https://rocketpool.net'
        },
        {
          id: 'st-3',
          type: 'Staking',
          platform: 'Binance',
          asset: 'BNB',
          apy: '7.5%',
          tvl: '$5B',
          risk: 'High',
          action: 'Lock & Stake',
          reason: 'High yield but requires trust in CEX',
          link: 'https://binance.com'
        }
      ],
      lending: [
        {
          id: 'ln-1',
          type: 'Lending',
          platform: 'Compound',
          asset: 'WBTC',
          apy: '3.5%',
          tvl: '$980M',
          risk: 'Medium',
          action: 'Supply',
          reason: 'Earn interest on Bitcoin holdings',
          link: 'https://compound.finance'
        },
        {
          id: 'ln-2',
          type: 'Lending',
          platform: 'Aave',
          asset: 'ETH',
          apy: '2.8%',
          tvl: '$3.2B',
          risk: 'Low',
          action: 'Supply',
          reason: 'Borrow against your ETH with safety margin',
          link: 'https://aave.com'
        },
        {
          id: 'ln-3',
          type: 'Lending',
          platform: 'MakerDAO',
          asset: 'ETH',
          apy: '1.5%',
          tvl: '$6.5B',
          risk: 'Low',
          action: 'Generate DAI',
          reason: 'Most secure protocol for stablecoin minting',
          link: 'https://makerdao.com'
        }
      ],
    },
  defaultTokenPrices: {
    ethPrice: 3500,
    tokens: [
      { symbol: 'USDC', balance: 1000, price: 1 },
      { symbol: 'WBTC', balance: 0.5, price: 60000 },
      { symbol: 'LINK', balance: 50, price: 18 }
    ]
  }
};
