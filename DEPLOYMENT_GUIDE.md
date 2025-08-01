# 🚀 Complete Deployment Guide

## Step 1: GitHub Repository Setup

### Create Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Repository name: `fullstack-app` (or your preferred name)
4. Description: "Full-stack web application with React and FastAPI"
5. Choose Public or Private
6. **Don't check** "Add a README file" (we already have one)
7. Click "Create repository"

### Upload Code
After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Or run our deployment script:
```bash
bash deploy.sh
```

## Step 2: Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for free account
3. Create a new cluster (free tier)
4. Create database user:
   - Username: `appuser`
   - Password: Generate strong password
5. Add IP address: `0.0.0.0/0` (allow from anywhere)
6. Get connection string: `mongodb+srv://appuser:PASSWORD@cluster.mongodb.net/`

## Step 3: Backend Deployment (Railway)

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway detects Python automatically
6. Add environment variables:
   ```
   MONGO_URL=mongodb+srv://appuser:PASSWORD@cluster.mongodb.net/
   DB_NAME=production_db
   ```
7. Deploy! Railway gives you a URL like: `https://your-app.railway.app`

## Step 4: Frontend Deployment (Vercel)

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Framework: React
6. Root Directory: `frontend`
7. Build Command: `npm run build`
8. Output Directory: `build`
9. Add environment variable:
   ```
   REACT_APP_BACKEND_URL=https://your-app.railway.app
   ```
10. Deploy! Vercel gives you a URL like: `https://your-app.vercel.app`

## Step 5: Update Frontend Environment

After getting your Railway backend URL, update the frontend environment:

1. In Vercel dashboard, go to your project
2. Settings → Environment Variables
3. Update `REACT_APP_BACKEND_URL` with your Railway URL
4. Redeploy

## 🎉 You're Done!

Your app will be live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-app.railway.app/api`

## Troubleshooting

### Common Issues:
1. **CORS errors**: Backend already configured for CORS
2. **Database connection**: Check MongoDB Atlas IP whitelist
3. **Build failures**: Check environment variables are set correctly

### Testing Your Deployment:
- Visit your frontend URL
- Check API health: `https://your-app.railway.app/api/`
- Test status endpoint: `https://your-app.railway.app/api/status`

## Alternative Deployment Options

### Netlify (Frontend Alternative)
- Similar to Vercel
- Connect GitHub repo
- Set build directory to `frontend`

### Render (Backend Alternative)
- Similar to Railway
- Free tier available
- Connect GitHub repo

### Heroku (Full-Stack)
- Can deploy both frontend and backend
- Requires Procfile (already created)
- Free tier limited