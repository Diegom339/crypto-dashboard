import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

// Get top 50 coins with sparkline data
export const getTopCoins = async () => {
  const response = await axios.get(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 50,
      page: 1,
      sparkline: true, // ENABLE SPARKLINE!
    },
  });
  return response.data;
};

// Get details for a specific coin
export const getCoinDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/coins/${id}`);
  return response.data;
};

// Get market chart for a specific coin
export const getCoinMarketChart = async (id, days) => {
  const response = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: days,
    },
  });
  return response.data;
};

// Get trending coins for the trending section
export const getTrendingCoins = async () => {
  const response = await axios.get(`${BASE_URL}/search/trending`);
  return response.data.coins;
};
