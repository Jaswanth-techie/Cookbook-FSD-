# CookBook API Server

This is the backend API server for the CookBook application using JSON Server.

## Deploy to Render

1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Click "Create Web Service"

## Deploy to Railway

1. Go to [Railway.app](https://railway.app) and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Root Directory**: `server`
   - **Start Command**: `npm start`
5. Click "Deploy"

## Local Development

```bash
cd server
npm install
npm start
```

The server will run on `http://localhost:3000`
