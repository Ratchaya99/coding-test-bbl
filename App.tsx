import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/home/screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductDetailScreen from './src/product/screens/ProductDetailScreen';
import { FavoriteProvider } from './src/shared/provider/FavoriteContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoriteProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Products' }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{ title: 'Product Detail' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoriteProvider>
    </SafeAreaProvider>
  );
}
