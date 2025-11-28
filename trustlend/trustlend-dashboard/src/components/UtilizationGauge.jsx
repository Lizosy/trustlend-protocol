import React from 'react'
import { motion } from 'framer-motion'
import './UtilizationGauge.css'

function UtilizationGauge({ utilization, onZoneClick }) {
  const getGaugeColor = (value) => {
    if (value < 80) return '#48bb78'
    if (value < 90) return '#ecc94b'
    return '#f56565'
  }

  const getZoneLabel = (value) => {
    if (value < 80) return 'Normal'
    if (value < 90) return 'Optimal'
    return 'Critical'
  }

  const rotation = (utilization / 100) * 180 - 90

  return (
    <div className="utilization-gauge-container">
      <h3>Utilization Rate</h3>
      
      <div className="gauge-wrapper">
        <svg viewBox="0 0 200 120" className="gauge-svg">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="20"
            strokeLinecap="round"
          />
          
          {/* Colored zones */}
          <path
            d="M 20 100 A 80 80 0 0 1 117 28"
            fill="none"
            stroke="#48bb78"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.3"
          />
          <path
            d="M 117 28 A 80 80 0 0 1 154 20"
            fill="none"
            stroke="#ecc94b"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.3"
          />
          <path
            d="M 154 20 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#f56565"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.3"
          />
          
          {/* Active arc */}
          <motion.path
            d={`M 20 100 A 80 80 0 ${utilization > 50 ? '1' : '0'} 1 ${100 + 80 * Math.cos((utilization / 100 * 180 - 90) * Math.PI / 180)} ${100 - 80 * Math.sin((utilization / 100 * 180 - 90) * Math.PI / 180)}`}
            fill="none"
            stroke={getGaugeColor(utilization)}
            strokeWidth="20"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Center circle */}
          <circle cx="100" cy="100" r="50" fill="white" />
          
          {/* Needle */}
          <motion.line
            x1="100"
            y1="100"
            x2="100"
            y2="55"
            stroke="#2d3748"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ rotate: -90 }}
            animate={{ rotate: rotation }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformOrigin: "100px 100px" }}
          />
          
          {/* Center dot */}
          <circle cx="100" cy="100" r="6" fill="#2d3748" />
        </svg>
        
        <div className="gauge-value">
          <div className="value-number">{utilization.toFixed(1)}%</div>
          <div className="value-label">{getZoneLabel(utilization)}</div>
        </div>
      </div>
      
      <div className="gauge-zones">
        <div 
          className="zone-item"
          onClick={() => onZoneClick('normal')}
          style={{ cursor: 'pointer' }}
        >
          <div className="zone-indicator" style={{ background: '#48bb78' }}></div>
          <span>0-80% Normal</span>
        </div>
        <div 
          className="zone-item"
          onClick={() => onZoneClick('optimal')}
          style={{ cursor: 'pointer' }}
        >
          <div className="zone-indicator" style={{ background: '#ecc94b' }}></div>
          <span>80-90% Optimal</span>
        </div>
        <div 
          className="zone-item"
          onClick={() => onZoneClick('critical')}
          style={{ cursor: 'pointer' }}
        >
          <div className="zone-indicator" style={{ background: '#f56565' }}></div>
          <span>90-100% Critical</span>
        </div>
      </div>
      
      <div className="gauge-info">
        <div className="info-item">
          <span className="info-label">Interest Impact</span>
          <span className="info-value">
            {utilization < 80 ? 'Low' : utilization < 90 ? 'Medium' : 'High'}
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Liquidity Risk</span>
          <span className="info-value">
            {utilization < 80 ? 'Low' : utilization < 90 ? 'Medium' : 'High'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default UtilizationGauge
