# Render Deployment Guide

This guide will help you deploy the backend server to Render.

## Prerequisites

- Render account (sign up at [render.com](https://render.com))
- MongoDB Atlas account (or MongoDB connection string)
- Git repository (GitHub, GitLab, or Bitbucket)

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub/GitLab/Bitbucket.

### 2. Create New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your repository (GitHub/GitLab/Bitbucket)
4. Select your `event-space` repository

### 3. Configure Build Settings

Render will auto-detect Node.js, but verify these settings:

- **Name:** `event-space-api` (or your preferred name)
- **Environment:** `Node`
- **Region:** Choose closest to your users
- **Branch:** `main` (or your main branch)
- **Root Directory:** Leave empty (root of repo)
- **Build Command:** `npm install`
- **Start Command:** `npm run server`

### 4. Set Environment Variables

Click **"Environment"** tab and add:

- **`MONGODB_URI`**
  - Value: Your MongoDB Atlas connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/event-space`
  
- **`NODE_ENV`**
  - Value: `production`

- **`PORT`**
  - Render automatically sets this, but you can leave it or set to `8000`

### 5. Deploy

1. Click **"Create Web Service"**
2. Render will start building and deploying
3. Wait for deployment to complete (usually 2-5 minutes)

### 6. Get Your Backend URL

Once deployed, Render will provide a URL like:
```
https://event-space-api.onrender.com
```

**Important:** Render free tier services spin down after 15 minutes of inactivity. The first request after spin-down may take 30-60 seconds.

### 7. Update Frontend API URL

Update your frontend API configuration:

**Option A: Update `src/config/api.js`**
```javascript
const PRODUCTION_API_URL = 'https://event-space-api.onrender.com/api';
```

**Option B: Set Environment Variable in Netlify**
- Go to Netlify dashboard → Site settings → Environment variables
- Add: `EXPO_PUBLIC_API_URL` = `https://event-space-api.onrender.com/api`
- Redeploy frontend

### 8. Test Your Deployment

1. **Test Backend Health:**
   ```
   https://your-app.onrender.com/health
   ```
   Should return: `{"status":"OK","message":"Server is healthy",...}`

2. **Test API Endpoint:**
   ```
   https://your-app.onrender.com/api/events
   ```
   Should return your events array

3. **Test from Frontend:**
   - Open your Netlify-deployed frontend
   - Try creating/viewing events
   - Check browser console for any errors

## MongoDB Atlas Setup (if not done)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP addresses:
   - Add `0.0.0.0/0` to allow all IPs (for Render)
   - Or add Render's IP ranges
5. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `event-space`

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Server Won't Start
- Check start command: `npm run server`
- Verify `server/server.js` exists
- Check environment variables are set

### MongoDB Connection Fails
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas network access (whitelist IPs)
- Verify database user credentials

### CORS Errors
- CORS is already enabled in `server/server.js`
- If issues persist, check frontend URL matches backend CORS settings

### Slow First Request (Free Tier)
- Render free tier spins down after inactivity
- First request after spin-down takes 30-60 seconds
- Consider upgrading to paid plan for always-on service

## Render Configuration File

The `render.yaml` file in the root directory can be used for infrastructure-as-code deployment. Render will automatically detect and use it.

## Updating Your Deployment

1. Push changes to your repository
2. Render will automatically detect and redeploy
3. Or manually trigger redeploy from Render dashboard

## Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- 750 hours/month free (enough for one always-on service)
- Slower cold starts
- Consider upgrading for production use

## Next Steps

1. ✅ Backend deployed to Render
2. ✅ Frontend deployed to Netlify
3. ✅ API URL updated in frontend
4. ✅ Test full application flow
5. 🎉 Your app is live!
