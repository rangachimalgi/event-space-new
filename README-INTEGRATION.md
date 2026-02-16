# Full Stack Integration Guide

This guide explains how to run both the React Native app and the Node.js backend server together.

## Quick Start

### Option 1: Run Both Together (Recommended)
```bash
npm run dev
```
This will start both the backend server and the Expo app simultaneously.

### Option 2: Run Separately

**Terminal 1 - Backend Server:**
```bash
npm run dev:server
```

**Terminal 2 - React Native App:**
```bash
npm start
# Then press 'a' for Android, 'i' for iOS, or 'w' for web
```

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB

Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/event-space
PORT=5000
```

For MongoDB Atlas (cloud):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
PORT=5000
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
- **macOS**: `brew services start mongodb-community`
- **Windows**: Start MongoDB service
- **Linux**: `sudo systemctl start mongod`

Or use MongoDB Atlas (cloud) - no local installation needed.

### 4. Run the Application

**Development Mode (Both Server + App):**
```bash
npm run dev
```

This will:
- Start the backend server on `http://localhost:5000`
- Start the Expo development server
- Auto-reload on code changes

## API Configuration

The app automatically detects the platform and uses the correct API URL:

- **iOS Simulator**: `http://localhost:5000/api`
- **Android Emulator**: `http://10.0.2.2:5000/api`
- **Physical Device**: Update `IP_ADDRESS` in `src/config/api.js` with your computer's IP

### Finding Your IP Address

**macOS/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
```

Look for your local network IP (usually starts with 192.168.x.x or 10.x.x.x)

Then update `src/config/api.js`:
```javascript
const IP_ADDRESS = '192.168.1.100'; // Your computer's IP
```

## Testing the Integration

### 1. Test Backend Connection
Visit `http://localhost:5000/health` in your browser. You should see:
```json
{
  "status": "OK",
  "message": "Server is healthy",
  "database": "Connected"
}
```

### 2. Test from App
The app includes connection testing. Check the console logs when the app starts.

### 3. Test Full Flow
1. Open the app
2. Click on a hall tile (e.g., "Vrindavana Main Hall")
3. Fill out the event form
4. Click "Create"
5. Navigate to Events screen
6. You should see your created event
7. Try deleting an event

## Troubleshooting

### Backend Not Connecting
- ✅ Check if server is running: `npm run server`
- ✅ Check MongoDB connection in `.env`
- ✅ Check server logs for errors

### App Can't Reach Backend
- ✅ For physical devices: Update IP address in `src/config/api.js`
- ✅ Check firewall settings
- ✅ Ensure both devices are on the same network
- ✅ Try `http://localhost:5000/health` in browser first

### CORS Errors
- ✅ CORS is already enabled in the server
- ✅ Make sure you're using the correct API URL for your platform

### MongoDB Connection Issues
- ✅ Check if MongoDB is running locally
- ✅ Verify MongoDB URI in `.env`
- ✅ For Atlas: Check network access settings

## Available Scripts

- `npm start` - Start Expo app only
- `npm run server` - Start backend server only
- `npm run dev:server` - Start backend with auto-reload
- `npm run dev` - Start both server and app together
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web browser

## Project Structure

```
event-space/
├── server/                 # Backend server
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   └── Event.js       # Event model
│   ├── routes/
│   │   └── eventRoutes.js # API routes
│   └── server.js          # Server entry point
├── src/
│   ├── config/
│   │   └── api.js         # API configuration
│   ├── screens/           # App screens
│   ├── components/        # Reusable components
│   └── utils/
│       └── apiTest.js     # API utilities
├── .env                   # Environment variables (create this)
└── package.json
```

## Next Steps

- ✅ Backend server with MongoDB
- ✅ API routes for CRUD operations
- ✅ Frontend integration
- ✅ Create, Read, Delete events
- 🔄 Edit events (coming soon)
- 🔄 Event details view (coming soon)
