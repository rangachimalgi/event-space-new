# Deployment Guide

This guide covers deploying both the frontend (React Native/Expo web) and backend (Node.js/Express) applications.

## Frontend Deployment (Netlify)

### Prerequisites
- Netlify account
- Git repository (GitHub, GitLab, or Bitbucket)

### Steps

1. **Update API Configuration**
   - Update `src/config/api.js` with your production backend URL
   - Set `API_BASE_URL` to your deployed backend URL

2. **Build Command**
   ```bash
   npm run build:web
   ```
   This creates a `web-build` folder with the static files.

3. **Deploy to Netlify**

   **Option A: Via Netlify Dashboard**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Build settings:
     - Build command: `npm run build:web`
     - Publish directory: `web-build`
   - Add environment variables if needed
   - Click "Deploy site"

   **Option B: Via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

4. **Environment Variables (if needed)**
   - Go to Site settings → Environment variables
   - Add any required variables

## Backend Deployment

Netlify doesn't support Node.js backend servers. Use one of these alternatives:

### Option 1: Railway (Recommended)
1. Go to [Railway](https://railway.app)
2. Create new project → Deploy from GitHub
3. Select your repository
4. Add environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `PORT` - Railway will provide this automatically
5. Railway will auto-detect Node.js and deploy

### Option 2: Render
1. Go to [Render](https://render.com)
2. Create new Web Service
3. Connect your repository
4. Build settings:
   - Build Command: `npm install`
   - Start Command: `npm run server`
5. Add environment variables:
   - `MONGODB_URI`
   - `PORT` (optional, Render provides default)

### Option 3: Heroku
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set PORT=8000
   ```
5. Deploy: `git push heroku main`

### Option 4: Vercel (Serverless Functions)
Convert your Express routes to Vercel serverless functions.

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Add to environment variables

### Option 2: Local MongoDB
- Not recommended for production
- Use MongoDB Atlas for production deployments

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend API URL updated to production backend
- [ ] MongoDB connection string configured
- [ ] CORS configured for production domain
- [ ] Environment variables set
- [ ] Test all API endpoints
- [ ] Test frontend functionality

## Updating API URL for Production

Update `src/config/api.js`:

```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-backend-url.com/api'  // Production backend
  : 'http://localhost:8000/api';         // Development
```

Or use environment variables in Netlify:
- Add `REACT_APP_API_URL` in Netlify environment variables
- Update `src/config/api.js` to use `process.env.REACT_APP_API_URL`

## Troubleshooting

### Build Fails
- Check build logs in Netlify
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors if using TypeScript

### API Connection Issues
- Verify backend URL is correct
- Check CORS settings in backend
- Verify backend is running and accessible

### MongoDB Connection Issues
- Verify MongoDB Atlas network access allows your backend IP
- Check connection string format
- Verify database credentials
