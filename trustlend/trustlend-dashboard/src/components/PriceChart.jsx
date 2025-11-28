import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import './PriceChart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function PriceChart({ data, onEventClick }) {
  const chartData = {
    labels: data.priceHistory.map(p => {
      const date = new Date(p.timestamp)
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }),
    datasets: [
      {
        label: 'ETH Price (USD)',
        data: data.priceHistory.map(p => p.price),
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#667eea',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#667eea',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y.toFixed(2)}`
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        },
        ticks: {
          maxTicksLimit: 8,
          color: '#718096'
        }
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(0)
          },
          color: '#718096'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index
        const pricePoint = data.priceHistory[index]
        // Simulate finding a loan event at this price
        if (Math.random() > 0.5) {
          onEventClick({
            id: 'LOAN-' + Math.floor(Math.random() * 1000),
            price: pricePoint.price,
            timestamp: pricePoint.timestamp,
            type: 'priceEvent'
          })
        }
      }
    }
  }

  const currentPrice = data.ethPrice
  const priceChange = data.priceHistory.length > 1
    ? ((currentPrice - data.priceHistory[0].price) / data.priceHistory[0].price) * 100
    : 0

  return (
    <div className="price-chart-container">
      <div className="chart-header">
        <div>
          <h3>ETH Price</h3>
          <div className="live-indicator">
            <span className="live-dot"></span>
            LIVE
          </div>
        </div>
        <div className="price-info">
          <div className="current-price">${currentPrice.toFixed(2)}</div>
          <div className={`price-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
          </div>
        </div>
      </div>
      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
      <div className="chart-hint">
        💡 Click on the chart to see events at that price point
      </div>
    </div>
  )
}

export default PriceChart
