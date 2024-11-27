import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CustomHeader } from "@/ds/components";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/ds/styles/Colors";

import HomePage from "@/modules/home/screens/HomePage";
import CryptoListPage from "@/modules/crypto/screens/CryptoListPage";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <CustomHeader />,
        headerTransparent: true,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: Colors.tertiary,
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({color, focused}) => <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="Invest"
        component={CryptoListPage}
        options={{
          tabBarIcon: ({color, focused}) => <Ionicons name={focused ? "analytics-sharp" : "analytics-outline"} size={28} color={color} />
        }}
      />
      <Tab.Screen
        name="Menu"
        component={CryptoListPage}
        options={{
          tabBarIcon: ({color, focused}) => <Ionicons name={focused ? "grid" : "grid-outline"} size={24} color={color} />
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