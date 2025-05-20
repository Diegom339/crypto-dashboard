import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCoinDetails, getCoinMarketChart } from '../utils/api';
import CoinChart from '../components/CoinChart';

function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState('7');

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const details = await getCoinDetails(id);
        const chart = await getCoinMarketChart(id, selectedRange);
        setCoin(details);
        setChartData(chart.prices);
      } catch (error) {
        console.error('Error loading coin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id, selectedRange]);

  if (loading) return <p>Loading coin data...</p>;
  if (!coin) return <p>Coin not found.</p>;

  return (
    <div>
      <h2 className="mb-4">
        {coin.name} ({coin.symbol.toUpperCase()})
      </h2>
      <p dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ')[0] + '.' }}></p>
      <div className="mb-4">
        <strong>Market Cap:</strong> ${coin.market_data.market_cap.usd.toLocaleString()}<br />
        <strong>Current Price:</strong> ${coin.market_data.current_price.usd.toLocaleString()}<br />
        <strong>24h High:</strong> ${coin.market_data.high_24h.usd.toLocaleString()}<br />
        <strong>24h Low:</strong> ${coin.market_data.low_24h.usd.toLocaleString()}
      </div>

      <div className="mb-3">
        <strong>Select Time Range:</strong>{' '}
        {['1', '7', '30', '90', '365'].map(range => (
          <button
            key={range}
            className={`btn btn-sm me-2 ${selectedRange === range ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedRange(range)}
          >
            {range === '1' ? '1D' : range === '7' ? '7D' : range === '30' ? '30D' : range === '90' ? '90D' : '1Y'}
          </button>
        ))}
      </div>

      <CoinChart prices={chartData} />
    </div>
  );
}

export default CoinDetail;
