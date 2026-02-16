import { Platform } from 'react-native';

// API Configuration
// For local development:
// - iOS Simulator: use localhost
// - Android Emulator: use 10.0.2.2
// - Physical Device: use your computer's IP address (e.g., 192.168.1.100)
//   Update the IP_ADDRESS below with your computer's local IP

const IP_ADDRESS = '192.168.1.3'; // Change this to your computer's IP for physical devices
const PORT = '8000';

// Production API URL - Update this with your deployed backend URL
const PRODUCTION_API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://your-backend-url.com/api';

const getBaseURL = () => {
  // Check if we're in production (web build)
  if (process.env.NODE_ENV === 'production' || !__DEV__) {
    return PRODUCTION_API_URL;
  }

  // Development mode
  if (__DEV__) {
    // Android emulator uses 10.0.2.2 to access localhost
    if (Platform.OS === 'android') {
      return `http://192.168.1.3:${PORT}/api`;
    }
    // iOS simulator uses localhost, physical devices use IP
    if (Platform.OS === 'ios') {
      return `http://${IP_ADDRESS}:${PORT}/api`;
    }
    // Web uses localhost
    return `http://localhost:${PORT}/api`;
  }
  
  // Fallback to production
  return PRODUCTION_API_URL;
};

const API_BASE_URL = getBaseURL();

export default API_BASE_URL;
