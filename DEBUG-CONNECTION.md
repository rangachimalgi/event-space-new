# Debugging Backend Connection Issues

## Quick Checks

### 1. Check What URL is Being Used

Open your app and check the console logs. You should see:
```
📍 Final API Base URL: https://event-space-new.onrender.com/api
```

If you see a different URL, that's the issue.

### 2. Test Backend Directly

Open in browser:
```
https://event-space-new.onrender.com/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is healthy",
  "database": "Connected"
}
```

### 3. Test API Endpoint

```
https://event-space-new.onrender.com/api/events
```

Should return your events array (or empty array `[]`).

## Common Issues & Fixes

### Issue 1: Using Development URL Instead of Production

**Symptom:** App tries to connect to `http://192.168.1.3:8000/api` or `http://localhost:8000/api`

**Fix:** The app is detecting development mode. For release builds:
1. Make sure you're building release APK: `./gradlew assembleRelease`
2. Or set `FORCE_PRODUCTION = true` in `src/config/api.js`

### Issue 2: Backend Not Accessible

**Symptom:** Connection timeout or network error

**Check:**
- Is Render service running? (Free tier spins down after 15 min)
- First request after spin-down takes 30-60 seconds
- Check Render dashboard for service status

**Fix:**
- Wait 30-60 seconds for first request
- Or upgrade Render plan for always-on service

### Issue 3: CORS Errors

**Symptom:** CORS error in console

**Fix:** CORS is already enabled in backend, but verify:
- Backend allows requests from your app's origin
- Check `server/server.js` has `app.use(cors())`

### Issue 4: Wrong API URL Format

**Symptom:** 404 errors or wrong endpoint

**Check:** URL should be:
- ✅ `https://event-space-new.onrender.com/api` (with `/api`)
- ❌ `https://event-space-new.onrender.com` (missing `/api`)

## Force Production Mode

If the app keeps using development URL, edit `src/config/api.js`:

```javascript
const FORCE_PRODUCTION = true; // Change to true
```

This will always use production API URL regardless of build mode.

## Testing Steps

1. **Check Console Logs:**
   ```
   📍 Final API Base URL: [should show production URL]
   ```

2. **Test Backend Health:**
   - Open browser: `https://event-space-new.onrender.com/health`
   - Should return JSON with status OK

3. **Test from App:**
   - Open app
   - Check console for API calls
   - Try creating/viewing events
   - Check for error messages

4. **Check Network Tab:**
   - Open React Native debugger
   - Check Network tab
   - See actual API calls being made
   - Check request URLs and responses

## Debug Mode

Add this to any screen to debug:

```javascript
import API_BASE_URL from '../config/api';

console.log('Current API URL:', API_BASE_URL);
console.log('__DEV__:', __DEV__);
console.log('NODE_ENV:', process.env.NODE_ENV);
```

## Still Not Working?

1. **Verify Backend URL:**
   - Double-check Render URL is correct
   - Test in browser first
   - Make sure it ends with `/api`

2. **Check Build Type:**
   - Release build: `./gradlew assembleRelease`
   - Debug build: `npm start` (uses dev URL)

3. **Network Issues:**
   - Check device has internet
   - Try on different network
   - Check firewall/VPN settings

4. **Backend Status:**
   - Check Render dashboard
   - Verify service is running
   - Check logs for errors
