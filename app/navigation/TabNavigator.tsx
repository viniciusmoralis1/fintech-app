import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomePage from "@/modules/home/screens/HomePage";
import CryptoListPage from "@/modules/crypto/screens/CryptoListPage";
import { CustomHeader } from "@/ds/components";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{ 
          header: () => <CustomHeader />,
          headerTransparent: true
        }}
      />
      <Tab.Screen name="CryptoList" component={CryptoListPage} />
    </Tab.Navigator>
  )
}