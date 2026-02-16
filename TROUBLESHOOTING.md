# Troubleshooting Guide

## Port Configuration

The app and server must use the **same port** (8000).

### Server Configuration
- Default port: **8000** (in `server/server.js`)
- Can be overridden with `.env` file: `PORT=8000`

### App Configuration
- Port is set in `src/config/api.js`: `const PORT = '8000';`
- IP address for physical devices: `const IP_ADDRESS = '192.168.1.3';`

## Common Issues

### 1. "Keeps Loading" / Infinite Loading

**Causes:**
- Server not running
- Wrong port number
- Wrong IP address
- Network connectivity issues

**Solutions:**
1. **Check server is running:**
   ```bash
   npm run server
   ```
   You should see: `Server is running on port 8000`

2. **Verify port matches:**
   - Server: Check `.env` file has `PORT=8000`
   - App: Check `src/config/api.js` has `PORT = '8000'`

3. **Test server directly:**
   Open browser: `http://localhost:8000/health`
   Should show: `{"status":"OK","message":"Server is healthy",...}`

4. **Check API URL in console:**
   When app starts, check console logs:
   ```
   🚀 App Starting...
   📱 Platform: ios/android
   🌐 API Base URL: http://192.168.1.3:8000/api
   ```

5. **For physical devices:**
   - Make sure IP address in `src/config/api.js` matches your computer's IP
   - Run `npm run get-ip` to find your IP
   - Both devices must be on same WiFi network

### 2. Connection Timeout

**Error:** "Connection Timeout" after 10 seconds

**Solutions:**
- Server not running → Start with `npm run server`
- Wrong IP address → Update `src/config/api.js`
- Firewall blocking → Check firewall settings
- Different networks → Ensure same WiFi

### 3. CORS Errors

Already handled! CORS is enabled in the server.

### 4. MongoDB Connection Issues

**Error:** "Error connecting to MongoDB"

**Solutions:**
- Check `.env` file has correct `MONGODB_URI`
- Make sure MongoDB is running locally
- Or use MongoDB Atlas (cloud)

## Debugging Steps

1. **Check server logs:**
   ```bash
   npm run server
   ```
   Look for: "MongoDB Connected" and "Server is running on port 8000"

2. **Check app console:**
   Look for API URL and any error messages

3. **Test API manually:**
   ```bash
   curl http://localhost:8000/health
   ```

4. **Check network:**
   - Physical device: Ping your computer's IP
   - Emulator: Should work automatically

## Quick Fixes

### Reset Everything:
```bash
# 1. Stop all processes (Ctrl+C)

# 2. Check .env file
cat .env
# Should have: PORT=8000

# 3. Start server
npm run server

# 4. In another terminal, start app
npm start
```

### Update IP Address:
```bash
# Find your IP
npm run get-ip

# Update src/config/api.js
# Change: const IP_ADDRESS = 'YOUR_IP_HERE';
```

## Current Configuration

- **Server Port:** 8000 (default)
- **App Port:** 8000
- **IP Address:** 192.168.1.3 (update if needed)
- **MongoDB:** localhost:27017/event-space (or Atlas)

## Still Having Issues?

1. Check console logs in both server and app
2. Verify `.env` file exists and has correct values
3. Test server health endpoint in browser
4. Make sure MongoDB is running
5. Check firewall/network settings
