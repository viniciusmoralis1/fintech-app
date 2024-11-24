import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomePage from "@/modules/home/screens/WelcomePage";
import RegisterPage from "@/modules/account/screens/RegisterPage";
import LoginPage from "@/modules/account/screens/LoginPage";
import CryptoDetailPage from "@/modules/crypto/screens/CryptoDetailPage";
import AccountPage from "@/modules/account/screens/AccountPage";
import MyTabs from "./TabNavigator";

const Stack = createNativeStackNavigator<StackParamScreensList>();

export type StackParamScreensList = {
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
  Account: undefined;
  CryptoDetail: { currencyId: number, currencyName: string, currencyPrice: number, currency24hChange: string };
  Tabs: undefined;
}

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ statusBarColor: "#1A1A1A"}}>
      <Stack.Screen name="Welcome" component={WelcomePage} options={{headerShown: false}} />
      <Stack.Screen name="Register" component={RegisterPage} options={{headerTitle: "", headerShadowVisible: false, headerTransparent: true}}/>
      <Stack.Screen name="Login" component={LoginPage} options={{headerTitle: "", headerShadowVisible: false, headerTransparent: true}}/>
      <Stack.Screen name="Account" component={AccountPage} options={{headerTitle: "", headerShadowVisible: false, headerTransparent: true}}/>
      <Stack.Screen name="CryptoDetail" component={CryptoDetailPage} options={{headerTitle: "", headerShadowVisible: false, headerLargeTitle: true}}/>
      <Stack.Screen name="Tabs" component={MyTabs} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};
