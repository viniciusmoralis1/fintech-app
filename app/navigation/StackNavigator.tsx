import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from "@/modules/home/screens/HomePage";
import RegisterPage from '@/modules/account/screens/RegisterPage';
import LoginPage from "@/modules/account/screens/LoginPage";

const Stack = createNativeStackNavigator<StackParamScreensList>();

export type StackParamScreensList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
}

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ statusBarColor: "#1A1A1A"}}>
      <Stack.Screen name="Home" component={HomePage} options={{headerShown: false}} />
      <Stack.Screen name="Register" component={RegisterPage} options={{headerTitle: '', headerShadowVisible: false, headerTransparent: true}}/>
      <Stack.Screen name="Login" component={LoginPage} options={{headerTitle: '', headerShadowVisible: false, headerTransparent: true}}/>
    </Stack.Navigator>
  );
}

export default StackNavigator;