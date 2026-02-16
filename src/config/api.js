import { Platform } from 'react-native';

// API Configuration
// For local development:
// - iOS Simulator: use localhost
// - Android Emulator: use 10.0.2.2
// - Physical Device: use your computer's IP address (e.g., 192.168.1.100)
//   Update the IP_ADDRESS below with your computer's local IP

const IP_ADDRESS = '192.168.1.3'; // Change this to your computer's IP for physical devices
const PORT = '8000';

const getBaseURL = () => {
  if (__DEV__) {
    // Android emulator uses 10.0.2.2 to access localhost
    if (Platform.OS === 'android') {
      return `http://192.168.1.3:${PORT}/api`;
    }
    // iOS simulator uses localhost, physical devices use IP
    // For iOS simulator, use localhost. For physical device, use IP_ADDRESS
    if (Platform.OS === 'ios') {
      // Check if running on simulator (you can detect this better if needed)
      // For now, we'll use IP for physical devices
      return `http://${IP_ADDRESS}:${PORT}/api`;
    }
    // Web uses localhost
    return `http://localhost:${PORT}/api`;
  }
  // Production API
  return 'https://your-production-api.com/api';
};

const API_BASE_URL = getBaseURL();

export default API_BASE_URL;
