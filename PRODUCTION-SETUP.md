# Production Setup Guide

## Quick Setup Steps

### 1. Get Your URLs
- **Backend URL (Render):** `https://your-app.onrender.com`
- **Frontend URL (Netlify):** `https://your-app.netlify.app`

### 2. Configure Netlify Environment Variable

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **"Add variable"**
5. Add:
   - **Key:** `EXPO_PUBLIC_API_URL`
   - **Value:** `https://your-app.onrender.com/api` (replace with your Render URL)
6. Click **"Save"**
7. **Redeploy** your site (go to Deploys → Trigger deploy → Deploy site)

### 3. Verify Backend is Working

Test your Render backend:
```
https://your-app.onrender.com/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is healthy",
  "database": "Connected"
}
```

### 4. Test Frontend Connection

1. Open your Netlify URL: `https://your-app.netlify.app`
2. Open browser console (F12)
3. Check for API calls - should show your Render backend URL
4. Try creating/viewing events

## Alternative: Update Code Directly

If you prefer to hardcode the URL, update `src/config/api.js`:

```javascript
const PRODUCTION_API_URL = 'https://your-app.onrender.com/api';
```

Then commit and push - Netlify will auto-deploy.

## Your URLs Summary

- **Frontend:** https://your-app.netlify.app
- **Backend:** https://your-app.onrender.com
- **API Endpoint:** https://your-app.onrender.com/api

## Testing Checklist

- [ ] Backend health check works
- [ ] Frontend loads on Netlify
- [ ] Frontend can fetch events from backend
- [ ] Can create new events
- [ ] Can view events list
- [ ] Can delete events
- [ ] Calendar shows events
