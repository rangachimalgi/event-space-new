import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
