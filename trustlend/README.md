# 🚀 TrustLend Protocol

**A Decentralized P2P Lending Platform on Blockchain**

TrustLend is a DeFi protocol that revolutionizes peer-to-peer lending using blockchain technology for transparency and security. Similar to protocols like [Aave](https://aave.com/) and [Compound](https://compound.finance/), TrustLend provides a trustless, permissionless lending ecosystem.

---

## 📦 Project Structure

```
trustlend/
├── trustlend-dashboard/          # 🎨 Interactive Real-time Dashboard
│   ├── src/                      # React components & utilities
│   ├── package.json              # Dependencies
│   └── vite.config.js            # Build configuration
│
├── TrustLend_Financial_Model.ipynb   # 📊 Financial Analysis & Simulations
│
├── trustlend_*.csv               # 📈 Exported simulation results
│
├── .github/workflows/            # 🔄 CI/CD for auto-deployment
│
├── QUICK_START.md                # ⚡ Quick start guide
└── README.md                     # 📖 This file
```

---

## ✨ Features

### 🎨 Interactive Dashboard
- **Real-time ETH Price Chart** with event markers
- **Health Factor Heatmap** - Click to view loan details
- **Utilization Gauge** - Dynamic visualization
- **Interest Rate Curve** - Shows rates vs utilization
- **Transaction Stream** - Live feed with animations
- **Event Timeline** - Track liquidations and events
- **Loan Details Modal** - Comprehensive loan information

### 📊 Financial Model
- Monte Carlo simulations (1,000+ scenarios)
- Risk analysis and metrics
- Profit/Loss calculations
- Break-even analysis for borrowers
- LTV sensitivity testing
- Protocol-level projections

---

## 🚀 Quick Start

### Run Dashboard Locally

```bash
cd trustlend-dashboard
npm install
npm run dev
```

Open http://localhost:3000

### Run Financial Analysis

```bash
# Open Jupyter Notebook
jupyter notebook TrustLend_Financial_Model.ipynb
```

Or open in VS Code with Jupyter extension installed.

---

## 🌐 Deployment Options

### Option 1: GitHub Codespaces (Recommended)

1. **Open in Codespaces**:
   - Click **"Code"** → **"Codespaces"** → **"Create codespace"**

2. **Auto-starts**: Dashboard runs automatically on port 3000

3. **Access**: Click "Open in Browser" popup

4. **Share**: Make port 3000 public in Ports tab

### Option 2: Deploy to Vercel

```bash
cd trustlend-dashboard
npm install -g vercel
vercel
```

### Option 3: GitHub Pages

Automatically deploys via GitHub Actions when you push to `main` branch.

---

## 📊 Key Metrics & Features

### Protocol Parameters
- **Interest Rate**: 10% APR (Fixed)
- **LTV Ratio**: 150% (Over-collateralized)
- **Liquidation Threshold**: 75%
- **Collateral**: ETH
- **Loan Currency**: TDAI (Stablecoin)

### Dashboard Metrics
- Total Value Locked (TVL)
- Active Loans Count
- Utilization Rate
- Current APY/APR
- Real-time ETH Price
- Health Factors
- Transaction History

---

## 🎯 Interactive Features

- **Click Price Chart** → See events at that price point
- **Click Heatmap Cells** → View loan details
- **Click Transactions** → Open loan modal
- **Click Timeline Events** → See full context
- **Toggle LIVE/PAUSED** → Control real-time updates

---

## 🛠️ Technology Stack

### Dashboard
- React 18 + Vite
- Chart.js for data visualization
- Framer Motion for animations
- Lucide React for icons

### Analysis
- Python + Jupyter
- NumPy & Pandas
- Matplotlib & Seaborn
- Monte Carlo simulations

---

## 📖 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes
- **[trustlend-dashboard/README.md](trustlend-dashboard/README.md)** - Dashboard documentation
- **[trustlend-dashboard/DEPLOYMENT.md](trustlend-dashboard/DEPLOYMENT.md)** - Detailed deployment guide

---

## 🧪 Example Use Cases

### For Borrowers
- Borrow TDAI using ETH as collateral
- Keep exposure to ETH price appreciation
- Flexible repayment schedule
- Avoid selling during market downturns

### For Lenders
- Earn 10% APR fixed interest
- Over-collateralized loans (150% LTV)
- Automatic liquidation protection
- Transparent on-chain records

---

## 📈 Financial Simulations

The Jupyter notebook includes:
- Single loan lifecycle simulation
- Monte Carlo analysis (1,000 scenarios)
- LTV sensitivity testing
- Volatility impact analysis
- Break-even calculations
- Protocol revenue projections

### Sample Results
- At 2% volatility: ~15% liquidation risk
- Average lender profit: $500 per $5,000 loan
- Expected ROI: 8-10% APR
- Borrower breaks even at ~-8% ETH price change

---

## 🔐 Security Features

- Over-collateralization (150% LTV)
- Real-time health factor monitoring
- Automatic liquidation triggers
- Transparent on-chain execution
- No custodial control

---

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## 📄 License

MIT License - Free to use for learning and production

---

## 🔗 Related Projects

- [Aave Protocol](https://aave.com/) - DeFi lending platform
- [Compound Finance](https://compound.finance/) - Algorithmic money market
- [MakerDAO](https://makerdao.com/) - Decentralized stablecoin

---

## 📞 Support

- Open an issue on GitHub
- Check documentation files
- Review Jupyter notebook for analysis details

---

**Built with ❤️ for the DeFi community**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new)
