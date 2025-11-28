import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings, 
  X, 
  AlertTriangle, 
  TrendingUp, 
  Percent, 
  Clock,
  Zap,
  Shield,
  DollarSign,
  RefreshCw
} from 'lucide-react'
import './ProtocolControls.css'

function ProtocolControls({ onParamsChange, currentParams }) {
  const [isOpen, setIsOpen] = useState(false)
  const [params, setParams] = useState({
    interestRate: currentParams?.interestRate || 10,
    ltvRatio: currentParams?.ltvRatio || 150,
    liquidationThreshold: currentParams?.liquidationThreshold || 75,
    liquidationPenalty: currentParams?.liquidationPenalty || 5,
    protocolFee: currentParams?.protocolFee || 0.1,
    minLoanAmount: currentParams?.minLoanAmount || 100,
    maxLoanAmount: currentParams?.maxLoanAmount || 100000,
    loanDuration: currentParams?.loanDuration || 365,
    gracePeriod: currentParams?.gracePeriod || 7,
    utilizationTarget: currentParams?.utilizationTarget || 80,
    ethVolatility: currentParams?.ethVolatility || 2
  })

  const handleChange = (key, value) => {
    const newParams = { ...params, [key]: parseFloat(value) }
    setParams(newParams)
    onParamsChange(newParams)
  }

  const resetToDefaults = () => {
    const defaults = {
      interestRate: 10,
      ltvRatio: 150,
      liquidationThreshold: 75,
      liquidationPenalty: 5,
      protocolFee: 0.1,
      minLoanAmount: 100,
      maxLoanAmount: 100000,
      loanDuration: 365,
      gracePeriod: 7,
      utilizationTarget: 80,
      ethVolatility: 2
    }
    setParams(defaults)
    onParamsChange(defaults)
  }

  const getImpactLevel = (key, value) => {
    // Calculate impact on system
    if (key === 'interestRate') {
      if (value > 15) return { level: 'high', text: 'High borrowing cost - may reduce demand' }
      if (value < 5) return { level: 'high', text: 'Low returns - may reduce lender interest' }
      return { level: 'medium', text: 'Balanced interest rate' }
    }
    if (key === 'ltvRatio') {
      if (value < 130) return { level: 'high', text: 'High liquidation risk - requires more collateral' }
      if (value > 200) return { level: 'high', text: 'Lower safety margin - higher risk' }
      return { level: 'low', text: 'Safe collateralization ratio' }
    }
    if (key === 'liquidationThreshold') {
      if (value > 85) return { level: 'high', text: 'Aggressive liquidations - higher borrower risk' }
      if (value < 60) return { level: 'high', text: 'Delayed liquidations - higher lender risk' }
      return { level: 'low', text: 'Balanced liquidation threshold' }
    }
    return { level: 'low', text: 'Normal impact' }
  }

  return (
    <>
      <motion.button
        className="protocol-controls-trigger"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings size={20} />
        <span>Protocol Controls</span>
        <span className="badge danger">Live</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="controls-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="controls-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="controls-header">
                <div>
                  <h2>Protocol Parameters</h2>
                  <p>Changes affect the entire system immediately</p>
                </div>
                <div className="header-actions">
                  <button className="reset-btn" onClick={resetToDefaults}>
                    <RefreshCw size={16} />
                    Reset Defaults
                  </button>
                  <button className="close-btn" onClick={() => setIsOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="controls-body">
                {/* Interest Rate */}
                <ControlGroup
                  icon={<Percent size={20} />}
                  label="Interest Rate (APR)"
                  value={params.interestRate}
                  min={0}
                  max={50}
                  step={0.5}
                  unit="%"
                  onChange={(v) => handleChange('interestRate', v)}
                  impact={getImpactLevel('interestRate', params.interestRate)}
                  description="Annual interest rate charged to borrowers"
                />

                {/* LTV Ratio */}
                <ControlGroup
                  icon={<Shield size={20} />}
                  label="LTV Ratio (Collateralization)"
                  value={params.ltvRatio}
                  min={100}
                  max={300}
                  step={5}
                  unit="%"
                  onChange={(v) => handleChange('ltvRatio', v)}
                  impact={getImpactLevel('ltvRatio', params.ltvRatio)}
                  description="Required collateral as percentage of loan"
                />

                {/* Liquidation Threshold */}
                <ControlGroup
                  icon={<AlertTriangle size={20} />}
                  label="Liquidation Threshold"
                  value={params.liquidationThreshold}
                  min={50}
                  max={95}
                  step={1}
                  unit="%"
                  onChange={(v) => handleChange('liquidationThreshold', v)}
                  impact={getImpactLevel('liquidationThreshold', params.liquidationThreshold)}
                  description="LTV percentage that triggers liquidation"
                />

                {/* Liquidation Penalty */}
                <ControlGroup
                  icon={<Zap size={20} />}
                  label="Liquidation Penalty"
                  value={params.liquidationPenalty}
                  min={0}
                  max={20}
                  step={0.5}
                  unit="%"
                  onChange={(v) => handleChange('liquidationPenalty', v)}
                  impact={{ level: 'medium', text: 'Fee charged when loan is liquidated' }}
                  description="Penalty fee on liquidated collateral"
                />

                {/* Protocol Fee */}
                <ControlGroup
                  icon={<DollarSign size={20} />}
                  label="Protocol Fee"
                  value={params.protocolFee}
                  min={0}
                  max={5}
                  step={0.05}
                  unit="%"
                  onChange={(v) => handleChange('protocolFee', v)}
                  impact={{ level: 'low', text: 'Platform revenue from transactions' }}
                  description="Fee taken by protocol on each transaction"
                />

                {/* Min Loan Amount */}
                <ControlGroup
                  icon={<DollarSign size={20} />}
                  label="Minimum Loan Amount"
                  value={params.minLoanAmount}
                  min={10}
                  max={10000}
                  step={10}
                  unit="TDAI"
                  onChange={(v) => handleChange('minLoanAmount', v)}
                  impact={{ level: 'low', text: 'Minimum borrowable amount' }}
                  description="Smallest loan users can request"
                />

                {/* Max Loan Amount */}
                <ControlGroup
                  icon={<DollarSign size={20} />}
                  label="Maximum Loan Amount"
                  value={params.maxLoanAmount}
                  min={1000}
                  max={1000000}
                  step={1000}
                  unit="TDAI"
                  onChange={(v) => handleChange('maxLoanAmount', v)}
                  impact={{ level: 'medium', text: 'Caps individual loan exposure' }}
                  description="Largest loan users can request"
                />

                {/* Loan Duration */}
                <ControlGroup
                  icon={<Clock size={20} />}
                  label="Default Loan Duration"
                  value={params.loanDuration}
                  min={7}
                  max={730}
                  step={7}
                  unit="days"
                  onChange={(v) => handleChange('loanDuration', v)}
                  impact={{ level: 'medium', text: 'Standard loan period' }}
                  description="Default time period for loans"
                />

                {/* Grace Period */}
                <ControlGroup
                  icon={<Clock size={20} />}
                  label="Grace Period"
                  value={params.gracePeriod}
                  min={0}
                  max={30}
                  step={1}
                  unit="days"
                  onChange={(v) => handleChange('gracePeriod', v)}
                  impact={{ level: 'low', text: 'Buffer before late penalties' }}
                  description="Days after due date before penalties apply"
                />

                {/* Utilization Target */}
                <ControlGroup
                  icon={<TrendingUp size={20} />}
                  label="Optimal Utilization Target"
                  value={params.utilizationTarget}
                  min={50}
                  max={95}
                  step={5}
                  unit="%"
                  onChange={(v) => handleChange('utilizationTarget', v)}
                  impact={{ level: 'medium', text: 'Target for dynamic interest rates' }}
                  description="Ideal pool utilization percentage"
                />

                {/* ETH Volatility (Simulation) */}
                <ControlGroup
                  icon={<TrendingUp size={20} />}
                  label="ETH Price Volatility (Simulation)"
                  value={params.ethVolatility}
                  min={0.5}
                  max={10}
                  step={0.5}
                  unit="%"
                  onChange={(v) => handleChange('ethVolatility', v)}
                  impact={{ level: 'high', text: 'Affects liquidation frequency in simulation' }}
                  description="Daily price movement for testing"
                />
              </div>

              <div className="controls-footer">
                <div className="warning-box">
                  <AlertTriangle size={18} />
                  <div>
                    <strong>Live Changes Warning</strong>
                    <p>Parameter changes take effect immediately and impact all users, loans, and protocol metrics.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ControlGroup({ icon, label, value, min, max, step, unit, onChange, impact, description }) {
  const [isFocused, setIsFocused] = useState(false)

  const getImpactColor = (level) => {
    switch (level) {
      case 'high': return '#f56565'
      case 'medium': return '#ecc94b'
      case 'low': return '#48bb78'
      default: return '#cbd5e0'
    }
  }

  return (
    <div className={`control-group ${isFocused ? 'focused' : ''}`}>
      <div className="control-header">
        <div className="control-label">
          <span className="control-icon">{icon}</span>
          <div>
            <span className="label-text">{label}</span>
            <span className="label-desc">{description}</span>
          </div>
        </div>
        <div className="control-value">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            min={min}
            max={max}
            step={step}
          />
          <span className="value-unit">{unit}</span>
        </div>
      </div>

      <div className="control-slider">
        <input
          type="range"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          style={{
            background: `linear-gradient(to right, ${getImpactColor(impact.level)} 0%, ${getImpactColor(impact.level)} ${((value - min) / (max - min)) * 100}%, #e2e8f0 ${((value - min) / (max - min)) * 100}%, #e2e8f0 100%)`
          }}
        />
        <div className="slider-labels">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>

      {impact && (
        <div className={`impact-indicator ${impact.level}`}>
          <span className="impact-dot" style={{ background: getImpactColor(impact.level) }}></span>
          <span>{impact.text}</span>
        </div>
      )}
    </div>
  )
}

export default ProtocolControls
