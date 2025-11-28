# 🚀 Quick Start Guide

## Run Dashboard Locally

```bash
cd trustlend-dashboard
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to GitHub Codespaces

1. **Push to GitHub**:
```bash
cd e:\01\dowload\35
git init
git add .
git commit -m "TrustLend Dashboard and Financial Model"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/trustlend-protocol.git
git push -u origin main
```

2. **Open Codespace**:
   - Go to your repo on GitHub
   - Click **"Code"** → **"Codespaces"** → **"Create codespace"**

3. **Auto-starts!** Dashboard runs on port 3000 automatically

4. **Access**:
   - Click **"Open in Browser"** popup
   - Or go to **"Ports"** tab → Click URL next to port 3000

## Share Your Live Demo

In Codespaces:
- **Ports** tab → Right-click port 3000
- **"Port Visibility"** → **"Public"**
- Copy URL and share!

## Deploy to Vercel (1-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/trustlend-protocol/tree/main/trustlend-dashboard)

1. Click button above
2. Import from GitHub
3. Deploy! ✅

---

## What You Get

✅ **Interactive Dashboard** with:
- 📊 Real-time ETH price chart
- 🔥 Health factor heatmap (clickable)
- ⚡ Utilization gauge
- 📈 Interest rate curve
- 🔔 Live transaction stream
- 📅 Event timeline
- 🎯 Loan detail modals

✅ **Financial Model Notebook**:
- Monte Carlo simulations
- Risk analysis
- Profit/loss calculations
- Break-even analysis
- CSV exports

---

## File Structure

```
35/
├── trustlend-dashboard/          # React Dashboard
│   ├── src/
│   │   ├── components/           # All UI components
│   │   ├── utils/mockData.js     # Data simulation
│   │   └── App.jsx               # Main app
│   ├── package.json
│   └── vite.config.js
│
├── TrustLend_Financial_Model.ipynb  # Jupyter analysis
├── .github/workflows/deploy.yml     # Auto-deploy
└── QUICK_START.md                   # This file
```

---

## Troubleshooting

**Port already in use?**
```bash
# Change port in vite.config.js
server: { port: 3001 }
```

**Build fails?**
```bash
cd trustlend-dashboard
rm -rf node_modules
npm install
npm run build
```

**Codespace not loading?**
- Refresh browser
- Check Ports tab
- Restart codespace

---

## Next Steps

1. ✅ Run dashboard locally
2. ✅ Push to GitHub
3. ✅ Open in Codespaces
4. ✅ Share live preview
5. ⭐ Star the repo!

---

**Need help?** Check:
- `trustlend-dashboard/README.md` - Full docs
- `trustlend-dashboard/DEPLOYMENT.md` - Deploy guide
- `TrustLend_Financial_Model.ipynb` - Analysis notebook
