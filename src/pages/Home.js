import React, { useState, useEffect } from 'react';
import { getTopCoins } from '../utils/api';
import CryptoTable from '../components/CryptoTable';

const WATCHLIST_KEY = 'watchlist';

function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
  });

  // Fetch coin data on component mount
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getTopCoins();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coins:', error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const handleToggleWatch = (coinId) => {
    setWatchlist(prev =>
      prev.includes(coinId)
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId]
    );
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4">Top 50 Cryptocurrencies</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name or symbol..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <CryptoTable
          coins={filteredCoins}
          watchlist={watchlist}
          onToggleWatch={handleToggleWatch}
        />
      )}
    </div>
  );
}

export default Home;
