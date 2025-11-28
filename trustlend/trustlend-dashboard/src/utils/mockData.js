// Generate mock data for TrustLend Protocol
export function generateMockData() {
  const loans = generateLoans(50)
  const priceHistory = generatePriceHistory(100)
  const recentTransactions = generateTransactions(20)
  const recentEvents = generateEvents(15)

  return {
    tvl: 10500000,
    activeLoans: loans.length,
    totalBorrowed: 5250000,
    availableLiquidity: 5250000,
    utilizationRate: 50,
    currentAPY: 8.5,
    ethPrice: priceHistory[priceHistory.length - 1].price,
    loans,
    priceHistory,
    recentTransactions,
    recentEvents,
    timestamp: Date.now()
  }
}

// Generate individual loans
function generateLoans(count) {
  const loans = []
  for (let i = 0; i < count; i++) {
    const loanAmount = Math.random() * 9000 + 1000
    const ltv = Math.random() * 0.6 + 0.2 // 20-80%
    const healthFactor = 1 / ltv
    
    loans.push({
      id: `LOAN-${1000 + i}`,
      borrower: `0x${Math.random().toString(16).substr(2, 8)}...`,
      amount: loanAmount,
      collateral: loanAmount * 1.5,
      ltv: ltv * 100,
      healthFactor,
      interestRate: 10,
      daysActive: Math.floor(Math.random() * 365),
      status: healthFactor < 1.2 ? 'danger' : healthFactor < 1.5 ? 'warning' : 'safe'
    })
  }
  return loans
}

// Generate ETH price history
function generatePriceHistory(points) {
  const history = []
  let price = 2500
  const now = Date.now()
  
  for (let i = points; i >= 0; i--) {
    const timestamp = now - (i * 60000) // Every minute
    price += (Math.random() - 0.5) * 50
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
function generateTransactions(count) {
  const types = ['loan', 'repayment', 'liquidation', 'deposit', 'withdrawal']
  const transactions = []
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    transactions.push({
      id: `TX-${Date.now()}-${i}`,
      type,
      loanId: `LOAN-${1000 + Math.floor(Math.random() * 50)}`,
      amount: Math.random() * 10000 + 100,
      timestamp: Date.now() - (i * 5000),
      hash: `0x${Math.random().toString(16).substr(2, 16)}...`
    })
  }
  
  return transactions
}

// Generate events
function generateEvents(count) {
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
      message: getEventMessage(type)
    })
  }
  
  return events
}

function getEventMessage(type) {
  const messages = {
    liquidation: 'Loan liquidated due to health factor',
    nearLiquidation: 'Warning: Approaching liquidation threshold',
    saved: 'Borrower added collateral, loan saved',
    newLoan: 'New loan created'
  }
  return messages[type]
}

// Simulate real-time updates
export function simulateRealtimeUpdates(prevData) {
  const newPrice = prevData.ethPrice + (Math.random() - 0.5) * 20
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
  
  // Update loans based on price
  const updatedLoans = prevData.loans.map(loan => {
    const collateralValue = (loan.collateral / prevData.ethPrice) * clampedPrice
    const newLtv = (loan.amount / collateralValue) * 100
    const newHealthFactor = 1 / (newLtv / 100)
    
    return {
      ...loan,
      ltv: newLtv,
      healthFactor: newHealthFactor,
      status: newHealthFactor < 1.2 ? 'danger' : newHealthFactor < 1.5 ? 'warning' : 'safe'
    }
  })
  
  // Maybe add new transaction
  let newTransactions = [...prevData.recentTransactions]
  if (Math.random() > 0.7) {
    const types = ['loan', 'repayment', 'liquidation', 'deposit', 'withdrawal']
    const type = types[Math.floor(Math.random() * types.length)]
    
    newTransactions = [
      {
        id: `TX-${Date.now()}`,
        type,
        loanId: `LOAN-${1000 + Math.floor(Math.random() * 50)}`,
        amount: Math.random() * 10000 + 100,
        timestamp: Date.now(),
        hash: `0x${Math.random().toString(16).substr(2, 16)}...`
      },
      ...newTransactions.slice(0, 19)
    ]
  }
  
  // Update metrics
  const totalBorrowed = updatedLoans.reduce((sum, loan) => sum + loan.amount, 0)
  const tvl = totalBorrowed * 2
  const utilizationRate = (totalBorrowed / tvl) * 100
  
  return {
    ...prevData,
    ethPrice: clampedPrice,
    priceHistory: newPriceHistory,
    loans: updatedLoans,
    recentTransactions: newTransactions,
    tvl,
    totalBorrowed,
    availableLiquidity: tvl - totalBorrowed,
    utilizationRate,
    timestamp: Date.now()
  }
}
