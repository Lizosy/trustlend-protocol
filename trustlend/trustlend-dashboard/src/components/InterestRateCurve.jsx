import React from 'react'
import { Line } from 'react-chartjs-2'
import './InterestRateCurve.css'

function InterestRateCurve({ currentUtilization }) {
  // Interest rate model: increases with utilization
  const generateCurve = () => {
    const points = []
    for (let util = 0; util <= 100; util += 5) {
      let rate
      if (util < 80) {
        rate = 5 + (util / 80) * 5 // 5% to 10% for 0-80%
      } else {
        rate = 10 + ((util - 80) / 20) * 40 // 10% to 50% for 80-100%
      }
      points.push({ utilization: util, rate })
    }
    return points
  }

  const curveData = generateCurve()
  
  const chartData = {
    labels: curveData.map(p => `${p.utilization}%`),
    datasets: [
      {
        label: 'Interest Rate',
        data: curveData.map(p => p.rate),
        borderColor: '#764ba2',
        backgroundColor: 'rgba(118, 75, 162, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6
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
        callbacks: {
          label: function(context) {
            return `Rate: ${context.parsed.y.toFixed(2)}%`
          }
        }
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: currentUtilization / 5,
            xMax: currentUtilization / 5,
            borderColor: '#f56565',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              content: 'Current',
              enabled: true,
              position: 'top'
            }
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Utilization Rate',
          color: '#718096',
          font: {
            weight: '600'
          }
        },
        grid: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6,
          color: '#718096'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Interest Rate (%)',
          color: '#718096',
          font: {
            weight: '600'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return value.toFixed(0) + '%'
          },
          color: '#718096'
        }
      }
    }
  }

  // Calculate current rate
  const currentRate = curveData.find(p => p.utilization >= currentUtilization)?.rate || 10

  return (
    <div className="interest-curve-container">
      <div className="chart-header">
        <h3>Interest Rate Curve</h3>
        <div className="current-rate">
          <span className="rate-label">Current Rate</span>
          <span className="rate-value">{currentRate.toFixed(2)}%</span>
        </div>
      </div>
      
      <div className="curve-info">
        <div className="info-badge optimal">
          <span>Optimal Zone: 80-90%</span>
        </div>
        <div className="info-badge">
          <span>Current: {currentUtilization.toFixed(1)}%</span>
        </div>
      </div>
      
      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
      
      <div className="rate-breakdown">
        <div className="breakdown-item">
          <span>Base Rate (0-80%)</span>
          <span>5-10%</span>
        </div>
        <div className="breakdown-item">
          <span>High Utilization (80-100%)</span>
          <span>10-50%</span>
        </div>
      </div>
    </div>
  )
}

export default InterestRateCurve
