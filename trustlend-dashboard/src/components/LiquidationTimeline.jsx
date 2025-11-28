import React from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react'
import './LiquidationTimeline.css'

function LiquidationTimeline({ events, onEventClick }) {
  const getEventIcon = (type) => {
    switch (type) {
      case 'liquidation':
        return <AlertTriangle size={16} color="#f56565" />
      case 'nearLiquidation':
        return <AlertTriangle size={16} color="#ecc94b" />
      case 'saved':
        return <CheckCircle size={16} color="#48bb78" />
      case 'newLoan':
        return <DollarSign size={16} color="#4299e1" />
      default:
        return <Clock size={16} />
    }
  }

  const getEventColor = (type) => {
    switch (type) {
      case 'liquidation': return '#f56565'
      case 'nearLiquidation': return '#ecc94b'
      case 'saved': return '#48bb78'
      case 'newLoan': return '#4299e1'
      default: return '#cbd5e0'
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    })
  }

  return (
    <div className="liquidation-timeline-container">
      <h3>
        <Clock size={20} />
        Event Timeline
      </h3>

      <div className="timeline">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className="timeline-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onEventClick({ id: event.loanId, ...event })}
          >
            <div 
              className="timeline-marker"
              style={{ background: getEventColor(event.type) }}
            >
              {getEventIcon(event.type)}
            </div>
            
            <div className="timeline-content">
              <div className="timeline-header">
                <span className="timeline-type">{event.type}</span>
                <span className="timeline-time">{formatTime(event.timestamp)}</span>
              </div>
              
              <div className="timeline-message">{event.message}</div>
              
              <div className="timeline-details">
                <span className="timeline-loan">{event.loanId}</span>
                <span className="timeline-price">ETH: ${event.price.toFixed(2)}</span>
              </div>
            </div>
            
            {index < events.length - 1 && (
              <div className="timeline-line"></div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="timeline-legend">
        <div className="legend-item">
          <AlertTriangle size={14} color="#f56565" />
          <span>Liquidation</span>
        </div>
        <div className="legend-item">
          <AlertTriangle size={14} color="#ecc94b" />
          <span>Near Liquidation</span>
        </div>
        <div className="legend-item">
          <CheckCircle size={14} color="#48bb78" />
          <span>Saved</span>
        </div>
        <div className="legend-item">
          <DollarSign size={14} color="#4299e1" />
          <span>New Loan</span>
        </div>
      </div>
    </div>
  )
}

export default LiquidationTimeline
