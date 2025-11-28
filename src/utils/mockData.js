// Generate mock data for TrustLend Protocol
export function generateMockData(params = {}) {
  // Default parameters
  const {
    interestRate = 10,
    ltvRatio = 150,
    liquidationThreshold = 75,
    liquidationPenalty = 5,
    protocolFee = 0.1,
    minLoanAmount = 100,
    maxLoanAmount = 100000,
    loanDuration = 365,
    gracePeriod = 7,
    utilizationTarget = 80,
    ethVolatility = 2
  } = params

  const loans = generateLoans(50, { interestRate, ltvRatio, liquidationThreshold, minLoanAmount, maxLoanAmount })
  const priceHistory = generatePriceHistory(100, ethVolatility)
  const recentTransactions = generateTransactions(20, { protocolFee })
  const recentEvents = generateEvents(15, liquidationThreshold)

  const totalBorrowed = loans.reduce((sum, loan) => sum + loan.amount, 0)
  const tvl = totalBorrowed * (200 / utilizationTarget) // Calculate TVL based on target utilization
  const utilizationRate = (totalBorrowed / tvl) * 100

  return {
    tvl,
    activeLoans: loans.length,
    totalBorrowed,
    availableLiquidity: tvl - totalBorrowed,
    utilizationRate,
    currentAPY: calculateDynamicAPY(utilizationRate, utilizationTarget, interestRate),
    ethPrice: priceHistory[priceHistory.length - 1].price,
    loans,
    priceHistory,
    recentTransactions,
    recentEvents,
    protocolParams: params,
    timestamp: Date.now()
  }
}

// Calculate dynamic APY based on utilization
function calculateDynamicAPY(utilization, target, baseRate) {
  if (utilization < target) {
    return baseRate * (utilization / target)
  } else {
    const excessRatio = (utilization - target) / (100 - target)
    return baseRate + (baseRate * excessRatio * 2)
  }
}

// Generate individual loans
function generateLoans(count, params = {}) {
  const { interestRate = 10, ltvRatio = 150, liquidationThreshold = 75, minLoanAmount = 100, maxLoanAmount = 100000 } = params
  const loans = []
  
  for (let i = 0; i < count; i++) {
    const loanAmount = Math.random() * (maxLoanAmount - minLoanAmount) + minLoanAmount
    const requiredCollateral = (loanAmount * ltvRatio) / 100
    const currentLtv = (Math.random() * 0.5 + 0.3) * liquidationThreshold // 30-80% of liquidation threshold
    const healthFactor = liquidationThreshold / currentLtv
    
    loans.push({
      id: `LOAN-${1000 + i}`,
      borrower: `0x${Math.random().toString(16).substr(2, 8)}...`,
      amount: loanAmount,
      collateral: requiredCollateral,
      ltv: currentLtv,
      healthFactor,
      interestRate: interestRate + (Math.random() - 0.5) * 2, // Small variation
      daysActive: Math.floor(Math.random() * 365),
      liquidationThreshold,
      status: healthFactor < 1.2 ? 'danger' : healthFactor < 1.5 ? 'warning' : 'safe'
    })
  }
  return loans
}

// Generate ETH price history
function generatePriceHistory(points, volatility = 2) {
  const history = []
  let price = 2500
  const now = Date.now()
  
  for (let i = points; i >= 0; i--) {
    const timestamp = now - (i * 60000) // Every minute
    price += (Math.random() - 0.5) * (volatility * 25) // Volatility affects price movement
    price = Math.max(2000, Math.min(3000, price))
    
    history.push({
      timestamp,
      price: parseFloat(price.toFixed(2)),
      volume: Math.random() * 1000000
    })
  }
  
  return history
}

// Generate transactions
function generateTransactions(count, params = {}) {
  const { protocolFee = 0.1 } = params
  const types = ['loan', 'repayment', 'liquidation', 'deposit', 'withdrawal']
  const transactions = []
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const amount = Math.random() * 10000 + 100
    transactions.push({
      id: `TX-${Date.now()}-${i}`,
      type,
      loanId: `LOAN-${1000 + Math.floor(Math.random() * 50)}`,
      amount,
      fee: amount * (protocolFee / 100),
      timestamp: Date.now() - (i * 5000),
      hash: `0x${Math.random().toString(16).substr(2, 16)}...`
    })
  }
  
  return transactions
}

// Generate events
function generateEvents(count, liquidationThreshold = 75) {
  const eventTypes = ['liquidation', 'nearLiquidation', 'saved', 'newLoan']
  const events = []
  
  for (let i = 0; i < count; i++) {
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    events.push({
      id: `EVENT-${i}`,
      type,
      loanId: `LOAN-${1000 + Math.floor(Math.random() * 50)}`,
      timestamp: Date.now() - (i * 60000 * 5),
      price: 2500 + (Math.random() - 0.5) * 500,
      threshold: liquidationThreshold,
      message: getEventMessage(type, liquidationThreshold)
    })
  }
  
  return events
}

function getEventMessage(type, threshold) {
  const messages = {
    liquidation: `Loan liquidated - LTV exceeded ${threshold}%`,
    nearLiquidation: `Warning: Approaching ${threshold}% liquidation threshold`,
    saved: 'Borrower added collateral, loan saved',
    newLoan: 'New loan created'
  }
  return messages[type]
}

// Simulate real-time updates
export function simulateRealtimeUpdates(prevData, params = {}) {
  const {
    interestRate = 10,
    liquidationThreshold = 75,
    utilizationTarget = 80,
    ethVolatility = 2,
    protocolFee = 0.1
  } = params

  const priceChange = (Math.random() - 0.5) * (ethVolatility * 10)
  const newPrice = prevData.ethPrice + priceChange
  const clampedPrice = Math.max(2000, Math.min(3000, newPrice))
  
  // Add new price point
  const newPriceHistory = [
    ...prevData.priceHistory.slice(-100),
    {
      timestamp: Date.now(),
      price: parseFloat(clampedPrice.toFixed(2)),
      volume: Math.random() * 1000000
    }
  ]
  
  // Update loans based on price and new liquidation threshold
  const updatedLoans = prevData.loans.map(loan => {
    const collateralValue = (loan.collateral / prevData.ethPrice) * clampedPrice
    const newLtv = (loan.amount / collateralValue) * 100
    const newHealthFactor = liquidationThreshold / newLtv
    
    return {
      ...loan,
      ltv: newLtv,
      healthFactor: newHealthFactor,
      liquidationThreshold,
      status: newHealthFactor < 1.2 ? 'danger' : newHealthFactor < 1.5 ? 'warning' : 'safe'
    }
  })
  
  // Maybe add new transaction with protocol fee
  let newTransactions = [...prevData.recentTransactions]
  if (Math.random() > 0.7) {
    const types = ['loan', 'repayment', 'liquidation', 'deposit', 'withdrawal']
    const type = types[Math.floor(Math.random() * types.length)]
    const amount = Math.random() * 10000 + 100
    
    newTransactions = [
      {
        id: `TX-${Date.now()}`,
        type,
        loanId: `LOAN-${1000 + Math.floor(Math.random() * 50)}`,
        amount,
        fee: amount * (protocolFee / 100),
        timestamp: Date.now(),
        hash: `0x${Math.random().toString(16).substr(2, 16)}...`
      },
      ...newTransactions.slice(0, 19)
    ]
  }
  
  // Check for new events (liquidations, warnings)
  let newEvents = [...prevData.recentEvents]
  updatedLoans.forEach(loan => {
    const prevLoan = prevData.loans.find(l => l.id === loan.id)
    
    // Check for liquidation
    if (loan.healthFactor < 1 && prevLoan.healthFactor >= 1) {
      newEvents = [
        {
          id: `EVENT-${Date.now()}-${loan.id}`,
          type: 'liquidation',
          loanId: loan.id,
          timestamp: Date.now(),
          price: clampedPrice,
          threshold: liquidationThreshold,
          message: `Loan liquidated - LTV exceeded ${liquidationThreshold}%`
        },
        ...newEvents.slice(0, 14)
      ]
    }
    // Check for near liquidation
    else if (loan.healthFactor < 1.2 && prevLoan.healthFactor >= 1.2) {
      newEvents = [
        {
          id: `EVENT-${Date.now()}-${loan.id}`,
          type: 'nearLiquidation',
          loanId: loan.id,
          timestamp: Date.now(),
          price: clampedPrice,
          threshold: liquidationThreshold,
          message: `Warning: Approaching ${liquidationThreshold}% liquidation threshold`
        },
        ...newEvents.slice(0, 14)
      ]
    }
  })
  
  // Update metrics
  const totalBorrowed = updatedLoans.reduce((sum, loan) => sum + loan.amount, 0)
  const tvl = totalBorrowed * (200 / utilizationTarget)
  const utilizationRate = (totalBorrowed / tvl) * 100
  const currentAPY = calculateDynamicAPY(utilizationRate, utilizationTarget, interestRate)
  
  return {
    ...prevData,
    ethPrice: clampedPrice,
    priceHistory: newPriceHistory,
    loans: updatedLoans,
    recentTransactions: newTransactions,
    recentEvents: newEvents,
    tvl,
    totalBorrowed,
    availableLiquidity: tvl - totalBorrowed,
    utilizationRate,
    currentAPY,
    timestamp: Date.now()
  }
}
