# 🚀 Quick Start Guide

## Run Everything Together

```bash
npm run dev
```

This single command starts:
- ✅ Backend server (port 5000)
- ✅ Expo development server
- ✅ Auto-reload on code changes

## First Time Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create `.env` File
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/event-space
PORT=5000
```

### 3. Start MongoDB
Make sure MongoDB is running, or use MongoDB Atlas (cloud).

### 4. Run the App
```bash
npm run dev
```

## For Physical Devices

### Find Your IP Address
```bash
npm run get-ip
```

Then update `src/config/api.js`:
```javascript
const IP_ADDRESS = '192.168.1.3'; // Your IP from get-ip command
```

## Test the Integration

1. **Backend**: Visit http://localhost:5000/health
2. **App**: Open the app and create an event
3. **Verify**: Check Events screen to see your event

## Troubleshooting

- **Can't connect?** Make sure MongoDB is running
- **Physical device?** Update IP address in `src/config/api.js`
- **Port issues?** Check `.env` file has correct PORT

## Available Commands

- `npm run dev` - Start both server and app
- `npm run server` - Backend only
- `npm start` - App only
- `npm run get-ip` - Find your IP address

That's it! 🎉
