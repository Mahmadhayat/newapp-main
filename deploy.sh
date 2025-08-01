#!/bin/bash

echo "🚀 Starting deployment process..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git branch -M main
else
    echo "✅ Git repository already initialized"
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Initial commit: Full-stack app with React frontend and FastAPI backend"

echo "🎯 Next steps:"
echo "1. Create a new repository on GitHub.com"
echo "2. Copy the repository URL"
echo "3. Run: git remote add origin YOUR_GITHUB_REPO_URL"
echo "4. Run: git push -u origin main"
echo ""
echo "🌐 For deployment:"
echo "- Frontend: Deploy on Vercel (connect your GitHub repo)"
echo "- Backend: Deploy on Railway (connect your GitHub repo)"
echo "- Database: Set up MongoDB Atlas"
echo ""
echo "✨ All configuration files are ready!"