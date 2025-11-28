# TrustLend Real-time Dashboard 🚀

![TrustLend](https://img.shields.io/badge/DeFi-TrustLend-blueviolet)
![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.1-646cff)
![License](https://img.shields.io/badge/License-MIT-green)

A real-time, interactive dashboard for monitoring the TrustLend P2P Lending DeFi protocol. Built with React, Chart.js, and Framer Motion.

## ✨ Features

- **📊 Real-time Data Visualization** - Live ETH price tracking with event markers
- **🔥 Interactive Health Heatmap** - Visual representation of loan health factors
- **⚡ Utilization Gauge** - Dynamic gauge showing protocol utilization rate
- **📈 Interest Rate Curve** - Interactive curve showing rates vs utilization
- **🔔 Live Transaction Stream** - Real-time transaction feed with animations
- **📅 Event Timeline** - Historical timeline of liquidations and events
- **🎯 Click Events** - Interactive charts with detailed loan modals
- **🎨 Beautiful UI** - Modern gradient design with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Navigate to the project directory
cd trustlend-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The dashboard will be available at `http://localhost:3000`

## 🌐 Deployment

### Deploy to GitHub Pages

1. **Update `vite.config.js`** - Set your repository name:
```javascript
base: '/your-repo-name/'
```

2. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

3. **Deploy**:
```bash
npm run build
npm run deploy
```

### Deploy to GitHub Codespaces

1. **Open in Codespaces**:
   - Go to your GitHub repository
   - Click "Code" → "Codespaces" → "Create codespace on main"

2. **Run in Codespace**:
```bash
cd trustlend-dashboard
npm install
npm run dev
```

3. **Access the app**:
   - Codespaces will automatically forward port 3000
   - Click "Open in Browser" when prompted

### Deploy to Vercel

1. **Import project** to [Vercel](https://vercel.com)
2. **Framework preset**: Vite
3. **Build command**: `npm run build`
4. **Output directory**: `dist`
5. **Deploy!**

## 📁 Project Structure

```
trustlend-dashboard/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Top navigation bar
│   │   ├── MetricsBar.jsx          # Key metrics cards
│   │   ├── PriceChart.jsx          # ETH price chart
│   │   ├── HealthHeatmap.jsx       # Loan health heatmap
│   │   ├── UtilizationGauge.jsx    # Utilization gauge
│   │   ├── InterestRateCurve.jsx   # Interest rate curve
│   │   ├── TransactionStream.jsx   # Live transactions
│   │   ├── LiquidationTimeline.jsx # Event timeline
│   │   └── LoanModal.jsx           # Loan details modal
│   ├── utils/
│   │   └── mockData.js             # Mock data generator
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # App styles
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── package.json
├── vite.config.js
└── index.html
```

## 🎮 Interactive Features

### Click Events
- **Price Chart**: Click on price points to see related loan events
- **Health Heatmap**: Click cells to view loan details
- **Utilization Gauge**: Click zones to filter by utilization range
- **Transaction Stream**: Click transactions to view loan details
- **Event Timeline**: Click events to see full context

### Real-time Updates
- ETH price updates every 2 seconds
- Automatic LTV recalculation based on price
- Live transaction feed with animations
- Health factor monitoring

## 🛠️ Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Chart.js** - Charting library
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **CSS3** - Styling with gradients and animations

## 📊 Dashboard Metrics

The dashboard displays:
- Total Value Locked (TVL)
- Active Loans Count
- Utilization Rate
- Current APY/APR
- ETH Price (real-time)
- Liquidation Events
- Health Factors
- Transaction History

## 🔧 Configuration

### Mock Data Settings
Edit `src/utils/mockData.js` to adjust:
- Number of loans
- Price volatility
- Update frequency
- Transaction types

### Chart Settings
Each component has configurable options:
- Colors and themes
- Animation durations
- Tooltip formats
- Interaction modes

## 📝 Scripts

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build
npm run deploy   # Deploy to GitHub Pages
```

## 🐛 Troubleshooting

### Port already in use
Change port in `vite.config.js`:
```javascript
server: {
  port: 3001  // Change to any available port
}
```

### Charts not rendering
Ensure Chart.js is properly registered:
```javascript
import { Chart as ChartJS, ... } from 'chart.js'
ChartJS.register(...)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🔗 Links

- [TrustLend Documentation](../TrustLend_Financial_Model.ipynb)
- [Aave Protocol](https://aave.com/)
- [Compound Finance](https://compound.finance/)

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for the DeFi community**
