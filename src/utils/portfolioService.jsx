import axios from 'axios';
import { API_URL } from '../config/ApiUrl';
import { portfolioConfig } from '../config/portfolioConfig';

export const fetchUserProfile = async (address) => {
  try {
    // Ganti dengan API endpoint Anda yang sebenarnya
    const response = await axios.get(`${API_URL}/api/user/profile/${address}`);
    return response.data.username || portfolioConfig.defaultUserName;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // Kembalikan username default atau bisa juga 'Guest'
    return portfolioConfig.defaultUserName;
  }
};

export const fetchTokenPrices = async (address) => {
  try {
    // In a real app, you would call your backend API
    // const { data } = await axios.get(`${API_URL}${portfolioConfig.apiEndpoints.tokenPrices}${address}`);
    // return data;
    return portfolioConfig.defaultTokenPrices;
  } catch (error) {
    console.error('Error fetching token prices:', error);
    return portfolioConfig.defaultTokenPrices;
  }
};

export const fetchRecommendations = async (address) => {
  try {
    // In a real app, you would call your AI recommendation API
    // const { data } = await axios.get(`${API_URL}${portfolioConfig.apiEndpoints.recommendations}${address}`);
    // return data;
    return [
      {
        action: 'Buy',
        token: 'ETH',
        confidence: 78,
        reason: 'Market sentiment positive, technical indicators show upward trend'
      },
      {
        action: 'Sell',
        token: 'WBTC',
        confidence: 65,
        reason: 'Overweight in portfolio, rebalance needed'
      },
      {
        action: 'Hold',
        token: 'USDC',
        confidence: 90,
        reason: 'Good for portfolio stability during market volatility'
      }
    ];
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};
