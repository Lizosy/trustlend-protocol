import React from 'react'
import { Activity, Wifi } from 'lucide-react'
import './Header.css'

function Header({ isLive, onToggleLive }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <Activity size={32} color="#fff" />
            <h1>TrustLend</h1>
            <span className="subtitle">Real-time DeFi Dashboard</span>
          </div>
          
          <div className="header-actions">
            <button 
              className={`live-toggle ${isLive ? 'active' : ''}`}
              onClick={onToggleLive}
            >
              <Wifi size={16} />
              {isLive ? 'LIVE' : 'PAUSED'}
              {isLive && <span className="pulse-dot"></span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
