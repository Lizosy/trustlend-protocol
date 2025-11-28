import React from 'react'
import { motion } from 'framer-motion'
import { X, TrendingUp, AlertCircle, Calendar, DollarSign } from 'lucide-react'
import './LoanModal.css'

function LoanModal({ loan, onClose }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(value)
  }

  const getHealthStatus = () => {
    if (!loan.healthFactor) return { label: 'Unknown', color: '#cbd5e0' }
    if (loan.healthFactor < 1.2) return { label: 'Critical', color: '#f56565' }
    if (loan.healthFactor < 1.5) return { label: 'Warning', color: '#ecc94b' }
    return { label: 'Healthy', color: '#48bb78' }
  }

  const healthStatus = getHealthStatus()

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Loan Details</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="loan-id-section">
            <span className="loan-id">{loan.id}</span>
            <span 
              className="health-badge"
              style={{ background: `${healthStatus.color}20`, color: healthStatus.color }}
            >
              {healthStatus.label}
            </span>
          </div>

          {loan.borrower && (
            <div className="info-section">
              <div className="info-label">Borrower Address</div>
              <div className="info-value monospace">{loan.borrower}</div>
            </div>
          )}

          <div className="stats-grid">
            <div className="stat-box">
              <DollarSign size={20} color="#667eea" />
              <div>
                <div className="stat-label">Loan Amount</div>
                <div className="stat-value">{formatCurrency(loan.amount || 0)}</div>
              </div>
            </div>

            <div className="stat-box">
              <TrendingUp size={20} color="#48bb78" />
              <div>
                <div className="stat-label">Collateral</div>
                <div className="stat-value">{formatCurrency(loan.collateral || 0)}</div>
              </div>
            </div>

            <div className="stat-box">
              <AlertCircle size={20} color="#ecc94b" />
              <div>
                <div className="stat-label">LTV Ratio</div>
                <div className="stat-value">{(loan.ltv || 0).toFixed(2)}%</div>
              </div>
            </div>

            <div className="stat-box">
              <Calendar size={20} color="#4299e1" />
              <div>
                <div className="stat-label">Days Active</div>
                <div className="stat-value">{loan.daysActive || 0} days</div>
              </div>
            </div>
          </div>

          {loan.healthFactor && (
            <div className="health-section">
              <div className="health-header">
                <span>Health Factor</span>
                <span className="health-value">{loan.healthFactor.toFixed(3)}</span>
              </div>
              <div className="health-bar">
                <div 
                  className="health-fill"
                  style={{ 
                    width: `${Math.min((loan.healthFactor / 2) * 100, 100)}%`,
                    background: healthStatus.color
                  }}
                ></div>
              </div>
              <div className="health-info">
                <span>💡 Health factor below 1.0 triggers liquidation</span>
              </div>
            </div>
          )}

          {loan.interestRate && (
            <div className="interest-section">
              <div className="interest-row">
                <span>Interest Rate</span>
                <span className="interest-value">{loan.interestRate}% APR</span>
              </div>
              <div className="interest-row">
                <span>Interest Accrued</span>
                <span className="interest-value">
                  {formatCurrency((loan.amount || 0) * (loan.interestRate / 100) * ((loan.daysActive || 0) / 365))}
                </span>
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button className="action-btn primary">View on Explorer</button>
            <button className="action-btn secondary">Repay Loan</button>
            <button className="action-btn secondary">Add Collateral</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LoanModal
