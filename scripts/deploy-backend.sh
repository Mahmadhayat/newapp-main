#!/bin/bash

echo "🚀 Deploying Backend to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway (you'll need to do this once)
echo "Please login to Railway:"
railway login

# Deploy the backend
echo "Deploying backend..."
cd backend
railway up

echo "✅ Backend deployment initiated!"
echo "Check your Railway dashboard for the deployment URL"