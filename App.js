import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './src/navigation/StackNavigator';
import API_BASE_URL from './src/config/api';
import { Platform } from 'react-native';

// Log API configuration on app start
console.log('🚀 App Starting...');
console.log('📱 Platform:', Platform.OS);
console.log('🌐 API Base URL:', API_BASE_URL);
console.log('💡 Make sure server is running on port 8000');

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
