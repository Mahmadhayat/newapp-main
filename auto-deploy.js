#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Automated Deployment Process...\n');

// Function to run commands
function runCommand(command, description) {
    console.log(`📦 ${description}...`);
    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`✅ ${description} completed\n`);
    } catch (error) {
        console.error(`❌ ${description} failed:`, error.message);
        process.exit(1);
    }
}

// Check if required tools are installed
function checkTools() {
    console.log('🔍 Checking required tools...');
    
    const tools = [
        { name: 'Node.js', command: 'node --version' },
        { name: 'npm', command: 'npm --version' },
        { name: 'git', command: 'git --version' }
    ];
    
    tools.forEach(tool => {
        try {
            execSync(tool.command, { stdio: 'pipe' });
            console.log(`✅ ${tool.name} is installed`);
        } catch (error) {
            console.error(`❌ ${tool.name} is not installed`);
            process.exit(1);
        }
    });
    console.log('');
}

// Install deployment tools
function installDeploymentTools() {
    console.log('🛠️ Installing deployment tools...');
    
    try {
        // Check if Vercel CLI is installed
        execSync('vercel --version', { stdio: 'pipe' });
        console.log('✅ Vercel CLI already installed');
    } catch (error) {
        runCommand('npm install -g vercel', 'Installing Vercel CLI');
    }
    
    try {
        // Check if Railway CLI is installed
        execSync('railway --version', { stdio: 'pipe' });
        console.log('✅ Railway CLI already installed');
    } catch (error) {
        runCommand('npm install -g @railway/cli', 'Installing Railway CLI');
    }
}

// Deploy backend to Railway
function deployBackend() {
    console.log('🚂 Deploying Backend to Railway...');
    console.log('Please follow the Railway login prompts...\n');
    
    try {
        // Login to Railway
        runCommand('railway login', 'Railway login');
        
        // Create new project or link existing
        process.chdir('backend');
        runCommand('railway up', 'Deploying backend to Railway');
        process.chdir('..');
        
        console.log('🎉 Backend deployed successfully!');
        console.log('Check your Railway dashboard for the deployment URL\n');
    } catch (error) {
        console.error('❌ Backend deployment failed:', error.message);
    }
}

// Deploy frontend to Vercel
function deployFrontend() {
    console.log('⚡ Deploying Frontend to Vercel...');
    console.log('Please follow the Vercel login prompts...\n');
    
    try {
        // Login to Vercel
        runCommand('vercel login', 'Vercel login');
        
        // Deploy frontend
        process.chdir('frontend');
        runCommand('vercel --prod', 'Deploying frontend to Vercel');
        process.chdir('..');
        
        console.log('🎉 Frontend deployed successfully!');
        console.log('Check your Vercel dashboard for the deployment URL\n');
    } catch (error) {
        console.error('❌ Frontend deployment failed:', error.message);
    }
}

// Main deployment process
async function main() {
    try {
        checkTools();
        installDeploymentTools();
        
        console.log('🎯 Choose deployment option:');
        console.log('1. Deploy Backend only (Railway)');
        console.log('2. Deploy Frontend only (Vercel)');
        console.log('3. Deploy Both (Full deployment)');
        console.log('4. Exit\n');
        
        // For automation, deploy both
        console.log('🚀 Starting full deployment...\n');
        
        deployBackend();
        deployFrontend();
        
        console.log('🎉 Deployment process completed!');
        console.log('📋 Next steps:');
        console.log('1. Set up MongoDB Atlas database');
        console.log('2. Update environment variables in Railway and Vercel');
        console.log('3. Test your deployed applications');
        
    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        process.exit(1);
    }
}

// Run the deployment
main();