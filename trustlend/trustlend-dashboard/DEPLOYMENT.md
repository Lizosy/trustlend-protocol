# Deployment Guide for TrustLend Dashboard

## Method 1: GitHub Codespaces (Recommended)

### Step 1: Push to GitHub
```bash
cd trustlend-dashboard
git init
git add .
git commit -m "Initial commit: TrustLend Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/trustlend-dashboard.git
git push -u origin main
```

### Step 2: Open in Codespaces
1. Go to your GitHub repository
2. Click the green **"Code"** button
3. Select **"Codespaces"** tab
4. Click **"Create codespace on main"**

### Step 3: Run in Codespace
The app will start automatically! If not:
```bash
npm install
npm run dev
```

Access your app:
- Codespaces will show a popup: **"Your application is running on port 3000"**
- Click **"Open in Browser"**
- Or go to **"Ports"** tab and click the URL

### Step 4: Share Your Preview
- In Codespaces, go to **"Ports"** tab
- Right-click port 3000
- Select **"Port Visibility" → "Public"**
- Copy the forwarded URL to share!

---

## Method 2: GitHub Pages (Static Deployment)

### Step 1: Update vite.config.js
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/trustlend-dashboard/', // Change to your repo name
})
```

### Step 2: Deploy
```bash
npm run build
npm run deploy
```

### Step 3: Enable GitHub Pages
1. Go to repository **Settings**
2. Navigate to **Pages**
3. Source: **gh-pages branch**
4. Save and wait 2-3 minutes

Your site: `https://YOUR_USERNAME.github.io/trustlend-dashboard/`

---

## Method 3: Vercel (Easiest)

### Step 1: Push to GitHub
```bash
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Import Project"**
3. Select your GitHub repository
4. Click **"Deploy"**

Done! Vercel auto-detects Vite and deploys.

---

## Method 4: Netlify

### Step 1: Build Settings
- Build command: `npm run build`
- Publish directory: `dist`

### Step 2: Deploy
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
npm run build
netlify deploy --prod --dir=dist
```

Or drag-and-drop `dist` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

---

## Method 5: Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Environment Variables

Create `.env` file:
```env
VITE_API_URL=https://api.example.com
VITE_CHAIN_ID=1
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
# Windows (cmd)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in vite.config.js
server: { port: 3001 }
```

### Build fails
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Codespace connection issues
- Try refreshing the browser
- Stop and restart the codespace
- Check if port 3000 is forwarded in Ports tab

---

## Production Checklist

- [ ] Update `base` in vite.config.js
- [ ] Test build locally: `npm run build && npm run preview`
- [ ] Check all interactive features work
- [ ] Verify responsive design on mobile
- [ ] Test on different browsers
- [ ] Add analytics (optional)
- [ ] Setup custom domain (optional)

---

## Performance Tips

1. **Lazy load components**:
```javascript
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

2. **Optimize images**: Use WebP format
3. **Enable compression**: Vite does this automatically
4. **Use CDN**: For production deployments

---

## Support

Need help? Check:
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [GitHub Codespaces Docs](https://docs.github.com/en/codespaces)
