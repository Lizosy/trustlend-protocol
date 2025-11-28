import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock } from 'lucide-react'
import './TransactionStream.css'

function TransactionStream({ transactions, onTransactionClick }) {
  const streamRef = useRef(null)

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = 0
    }
  }, [transactions])

  const getIcon = (type) => {
    switch (type) {
      case 'loan': return '🟢'
      case 'repayment': return '🟡'
      case 'liquidation': return '🔴'
      case 'deposit': return '🔵'
      case 'withdrawal': return '🟣'
      default: return '⚪'
    }
  }

  const getLabel = (type) => {
    switch (type) {
      case 'loan': return 'New Loan'
      case 'repayment': return 'Repayment'
      case 'liquidation': return 'Liquidation'
      case 'deposit': return 'Deposit'
      case 'withdrawal': return 'Withdrawal'
      default: return 'Transaction'
    }
  }

  const formatTime = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="transaction-stream-container">
      <div className="stream-header">
        <h3>
          <Clock size={20} />
          Recent Transactions
        </h3>
        <div className="live-indicator">
          <span className="live-dot"></span>
          LIVE STREAM
        </div>
      </div>

      <div className="stream-list" ref={streamRef}>
        <AnimatePresence>
          {transactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              className={`stream-item ${tx.type}`}
              initial={{ opacity: 0, x: -50, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 50, height: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => onTransactionClick({ id: tx.loanId, type: tx.type })}
            >
              <div className="stream-icon">{getIcon(tx.type)}</div>
              <div className="stream-content">
                <div className="stream-top">
                  <span className="stream-label">{getLabel(tx.type)}</span>
                  <span className="stream-time">{formatTime(tx.timestamp)}</span>
                </div>
                <div className="stream-bottom">
                  <span className="stream-amount">{formatAmount(tx.amount)} TDAI</span>
                  <span className="stream-loan">{tx.loanId}</span>
                </div>
                <div className="stream-hash">{tx.hash}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default TransactionStream
