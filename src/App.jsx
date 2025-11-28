import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import MetricsBar from './components/MetricsBar'
import PriceChart from './components/PriceChart'
import HealthHeatmap from './components/HealthHeatmap'
import UtilizationGauge from './components/UtilizationGauge'
import InterestRateCurve from './components/InterestRateCurve'
import TransactionStream from './components/TransactionStream'
import LiquidationTimeline from './components/LiquidationTimeline'
import LoanModal from './components/LoanModal'
import { generateMockData, simulateRealtimeUpdates } from './utils/mockData'
import './App.css'

function App() {
  const [data, setData] = useState(generateMockData())
  const [selectedLoan, setSelectedLoan] = useState(null)
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setData(prevData => simulateRealtimeUpdates(prevData))
    }, 2000) // Update every 2 seconds

    return () => clearInterval(interval)
  }, [isLive])

  const handleLoanClick = (loan) => {
    setSelectedLoan(loan)
  }

  const handleCloseLoanModal = () => {
    setSelectedLoan(null)
  }

  return (
    <div className="app">
      <Header isLive={isLive} onToggleLive={() => setIsLive(!isLive)} />
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MetricsBar data={data} />
        </motion.div>

        <div className="dashboard-grid">
          {/* Row 1 */}
          <motion.div
            className="chart-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PriceChart 
              data={data} 
              onEventClick={handleLoanClick}
            />
          </motion.div>

          <motion.div
            className="chart-card"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <HealthHeatmap 
              loans={data.loans}
              onLoanClick={handleLoanClick}
            />
          </motion.div>

          {/* Row 2 */}
          <motion.div
            className="chart-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <UtilizationGauge 
              utilization={data.utilizationRate}
              onZoneClick={(zone) => console.log('Zone clicked:', zone)}
            />
          </motion.div>

          <motion.div
            className="chart-card"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InterestRateCurve 
              currentUtilization={data.utilizationRate}
            />
          </motion.div>

          {/* Row 3 - Full Width */}
          <motion.div
            className="chart-card full-width"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <LiquidationTimeline 
              events={data.recentEvents}
              onEventClick={handleLoanClick}
            />
          </motion.div>

          {/* Row 4 - Full Width */}
          <motion.div
            className="chart-card full-width"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TransactionStream 
              transactions={data.recentTransactions}
              onTransactionClick={handleLoanClick}
            />
          </motion.div>
        </div>
      </div>

      {selectedLoan && (
        <LoanModal 
          loan={selectedLoan} 
          onClose={handleCloseLoanModal}
        />
      )}
    </div>
  )
}

export default App
