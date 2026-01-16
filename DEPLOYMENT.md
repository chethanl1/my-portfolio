# Firebase Deployment Guide

## Deploy to Firebase Hosting (Free Tier)

Firebase Hosting offers generous free tier:
- **10 GB storage**
- **360 MB/day bandwidth** 
- Free SSL certificate
- Global CDN
- Custom domain support

### Prerequisites
1. Google account
2. Node.js installed
3. Firebase CLI

### Step 1: Install Firebase CLI
```powershell
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```powershell
firebase login
```

### Step 3: Initialize Firebase Project
```powershell
firebase init hosting
```

**When prompted:**
- Create a new project or select existing
- Use existing `firebase.json` (type 'N' when asked to overwrite)
- Public directory: `dist/my-portfolio/browser`
- Configure as single-page app: **Yes**
- Don't overwrite index.html: **No**

### Step 4: Build Your App
```powershell
npm run build
```

### Step 5: Deploy
```powershell
firebase deploy --only hosting
```

Your site will be live at: `https://YOUR-PROJECT-ID.web.app`

---

## Alternative: GitHub Actions Auto-Deployment

I've created `.github/workflows/firebase-hosting.yml` for automatic deployment on every push to main branch.

**Setup:**
1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate new private key (downloads JSON file)
3. Go to GitHub repo → Settings → Secrets → New repository secret
4. Name: `FIREBASE_SERVICE_ACCOUNT`
5. Paste entire JSON content
6. Push to main branch - auto-deploys!

---

## Other Free Hosting Options

### Netlify (Recommended Alternative)
```powershell
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist/my-portfolio/browser
```

### Vercel
```powershell
npm install -g vercel
vercel --prod
```

### GitHub Pages
Add to `package.json`:
```json
"scripts": {
  "deploy": "ng build --base-href /my-portfolio/ && npx angular-cli-ghpages --dir=dist/my-portfolio/browser"
}
```

---

## Quick Deploy Now (Firebase)
```powershell
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```
