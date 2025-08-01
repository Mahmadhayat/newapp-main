#!/bin/bash

echo "🚀 Deploying Frontend to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (you'll need to do this once)
echo "Please login to Vercel:"
vercel login

# Deploy the frontend
echo "Deploying frontend..."
cd frontend
vercel --prod

echo "✅ Frontend deployment initiated!"
echo "Check your Vercel dashboard for the deployment URL"