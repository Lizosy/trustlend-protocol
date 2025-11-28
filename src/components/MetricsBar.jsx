import React from 'react'
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'
import './MetricsBar.css'

function MetricsBar({ data }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(value)
  }

  const metrics = [
    {
      icon: <DollarSign size={24} />,
      label: 'Total Value Locked',
      value: formatCurrency(data.tvl),
      change: '+5.2%',
      positive: true
    },
    {
      icon: <Users size={24} />,
      label: 'Active Loans',
      value: data.activeLoans,
      change: '+3',
      positive: true
    },
    {
      icon: <Activity size={24} />,
      label: 'Utilization Rate',
      value: `${data.utilizationRate.toFixed(1)}%`,
      change: '+2.1%',
      positive: true
    },
    {
      icon: <TrendingUp size={24} />,
      label: 'Current APY',
      value: `${data.currentAPY.toFixed(2)}%`,
      change: '+0.3%',
      positive: true
    }
  ]

  return (
    <div className="metrics-bar">
      {metrics.map((metric, index) => (
        <div key={index} className="metric-card slide-in">
          <div className="metric-icon" style={{
            background: metric.positive ? '#48bb7820' : '#f5656520'
          }}>
            {metric.icon}
          </div>
          <div className="metric-content">
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-change ${metric.positive ? 'positive' : 'negative'}`}>
              {metric.change} <span>24h</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MetricsBar
