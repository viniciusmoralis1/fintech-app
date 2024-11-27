import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomePage from "@/modules/home/screens/HomePage";
import CryptoListPage from "@/modules/crypto/screens/CryptoListPage";
import { CustomHeader } from "@/ds/components";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/ds/styles/Colors";
import { BlurView } from "expo-blur";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          header: () => <CustomHeader />,
          headerTransparent: true,
          tabBarIcon: ({color, focused}) => <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
          tabBarActiveBackgroundColor: Colors.tertiary,
          tabBarActiveTintColor: Colors.primary,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Invest"
        component={CryptoListPage}
        options={{
          header: () => <CustomHeader />,
          headerTransparent: true,
          tabBarIcon: ({color, focused}) => <Ionicons name={focused ? "analytics-sharp" : "analytics-outline"} size={28} color={color} />,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
          tabBarActiveBackgroundColor: Colors.tertiary,
          tabBarActiveTintColor: Colors.primary,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={CryptoListPage}
        options={{
          header: () => <CustomHeader />,
          headerTransparent: true,
          tabBarIcon: ({color, focused}) => <Ionicons name={focused ? "grid" : "grid-outline"} size={24} color={color} />,
          tabBarStyle: styles.tabBar,
          tabBarBackground: () =>  <BlurView intensity={100} tint="extraLight" />,
          tabBarItemStyle: styles.tabBarItem,
          tabBarActiveBackgroundColor: Colors.tertiary,
          tabBarActiveTintColor: Colors.primary,
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    height: 54,
    backgroundColor: "#ffffff90",
    position: "absolute",
    marginBottom: 10,
    marginHorizontal: "25%",
    borderRadius: 30,
    elevation: 1,
    shadowColor: "#AAA",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  tabBarItem: {
    marginVertical: 2,
    marginHorizontal: 2,
    borderRadius: 30,
  },
});