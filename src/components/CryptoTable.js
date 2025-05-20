import React from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

function CryptoTable({ coins, watchlist = [], onToggleWatch }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
            <th className="d-none d-md-table-cell">7d</th>
            <th>⭐</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr key={coin.id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/coin/${coin.id}`} className="text-decoration-none">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    style={{ width: '25px', marginRight: '10px' }}
                  />
                  {coin.name} ({coin.symbol.toUpperCase()})
                </Link>
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td className={coin.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>
              <td>${coin.market_cap.toLocaleString()}</td>

              {/* Sparkline */}
              <td className="d-none d-md-table-cell" style={{ width: '100px', height: '40px' }}>
                <Line
                  data={{
                    labels: coin.sparkline_in_7d.price.map((_, i) => i),
                    datasets: [{
                      data: coin.sparkline_in_7d.price,
                      borderColor: 'rgba(100, 149, 237, 1)',
                      borderWidth: 1,
                      pointRadius: 0,
                      tension: 0.3,
                      fill: false
                    }]
                  }}
                  options={{
                    elements: { point: { radius: 0 } },
                    scales: { x: { display: false }, y: { display: false } },
                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                    responsive: true,
                    maintainAspectRatio: false
                  }}
                  height={40}
                />
              </td>

              {/* Watchlist Button */}
              <td>
                <button
                  className="btn btn-sm"
                  onClick={() => onToggleWatch(coin.id)}
                >
                  {watchlist.includes(coin.id) ? '★' : '☆'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoTable;
