import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from "@/modules/home/screens/WelcomePage";
import RegisterPage from '@/modules/account/screens/RegisterPage';
import LoginPage from "@/modules/account/screens/LoginPage";
import HomePage from '@/modules/home/screens/HomePage';
import { CustomHeader } from "@/ds/components"
import CryptoListPage from '@/modules/crypto/screens/CryptoListPage';
import CryptoDetailsPage from '@/modules/crypto/screens/CryptoDetailsPage';

const Stack = createNativeStackNavigator<StackParamScreensList>();

export type StackParamScreensList = {
  Home: undefined;
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
  CryptoList: undefined;
  CryptoDetail: { currencyId: number };
}

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ statusBarColor: "#1A1A1A"}}>
      <Stack.Screen name="Welcome" component={WelcomePage} options={{headerShown: false}} />
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ 
          header: () => <CustomHeader />,
          headerTransparent: true
        }}
      />
      <Stack.Screen name="Register" component={RegisterPage} options={{headerTitle: '', headerShadowVisible: false, headerTransparent: true}}/>
      <Stack.Screen name="Login" component={LoginPage} options={{headerTitle: '', headerShadowVisible: false, headerTransparent: true}}/>
      <Stack.Screen name="CryptoList" component={CryptoListPage} options={{headerTitle: '', headerShadowVisible: false, headerLargeTitle: true}}/>
      <Stack.Screen name="CryptoDetail" component={CryptoDetailsPage} options={{headerTitle: '', headerShadowVisible: false, headerLargeTitle: true}}/>
    </Stack.Navigator>
  );
}

export default StackNavigator;