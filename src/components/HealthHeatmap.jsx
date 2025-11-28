import React from 'react'
import { motion } from 'framer-motion'
import './HealthHeatmap.css'

function HealthHeatmap({ loans, onLoanClick }) {
  const getHealthColor = (status) => {
    switch (status) {
      case 'safe': return '#48bb78'
      case 'warning': return '#ecc94b'
      case 'danger': return '#f56565'
      default: return '#cbd5e0'
    }
  }

  const getHealthLabel = (status) => {
    switch (status) {
      case 'safe': return '🟢 Safe'
      case 'warning': return '🟡 Warning'
      case 'danger': return '🔴 Danger'
      default: return 'Unknown'
    }
  }

  const stats = {
    safe: loans.filter(l => l.status === 'safe').length,
    warning: loans.filter(l => l.status === 'warning').length,
    danger: loans.filter(l => l.status === 'danger').length
  }

  return (
    <div className="health-heatmap-container">
      <div className="chart-header">
        <h3>Health Factor Heatmap</h3>
        <div className="health-stats">
          <span className="stat safe">{stats.safe} Safe</span>
          <span className="stat warning">{stats.warning} Warning</span>
          <span className="stat danger">{stats.danger} Danger</span>
        </div>
      </div>
      
      <div className="heatmap-grid">
        {loans.slice(0, 40).map((loan, index) => (
          <motion.div
            key={loan.id}
            className="heatmap-cell"
            style={{
              backgroundColor: getHealthColor(loan.status)
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.01 }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
            onClick={() => onLoanClick(loan)}
            title={`${loan.id} - LTV: ${loan.ltv.toFixed(1)}% - ${getHealthLabel(loan.status)}`}
          >
            <div className="cell-tooltip">
              <div className="tooltip-id">{loan.id}</div>
              <div className="tooltip-ltv">LTV: {loan.ltv.toFixed(1)}%</div>
              <div className="tooltip-status">{getHealthLabel(loan.status)}</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="heatmap-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#48bb78' }}></div>
          <span>Safe (&lt;50% LTV)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#ecc94b' }}></div>
          <span>Warning (50-70%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#f56565' }}></div>
          <span>Danger (&gt;70%)</span>
        </div>
      </div>
      
      <div className="chart-hint">
        💡 Click on any cell to see loan details
      </div>
    </div>
  )
}

export default HealthHeatmap
