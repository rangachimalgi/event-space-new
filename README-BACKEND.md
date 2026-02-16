# Backend Setup

This project includes a Node.js backend server with MongoDB connection.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create Environment File**
   Create a `.env` file in the root directory with your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/event-space
   PORT=5000
   ```

   For MongoDB Atlas (cloud), use:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
   PORT=5000
   ```

3. **Start the Server**
   ```bash
   npm run server
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev:server
   ```

## Server Endpoints

- `GET /` - Basic API status
- `GET /health` - Health check with database connection status

## MongoDB Connection

The MongoDB connection is configured in `server/config/db.js` and automatically connects when the server starts.

Make sure MongoDB is running locally or you have a valid MongoDB Atlas connection string.
