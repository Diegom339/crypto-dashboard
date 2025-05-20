import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function CoinChart({ prices }) {
  const data = {
    labels: prices.map(price => {
      const date = new Date(price[0]);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label: 'Price (USD)',
        data: prices.map(price => price[1]),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <div>
      <h4 className="mt-4 mb-3">7-Day Price Chart</h4>
      <Line data={data} options={options} />
    </div>
  );
}

export default CoinChart;
