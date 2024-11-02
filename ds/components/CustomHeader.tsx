import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { BlurView } from "expo-blur";
import Colors from "../styles/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

export const CustomHeader: React.FC = () => {
  const { top } = useSafeAreaInsets();

  return (
    <BlurView intensity={100} tint="extraLight" style={{paddingTop: top}} >
      <View style={styles.container}>
        <TouchableOpacity style={styles.roundButton}>
          <Text style={{ color: Colors.white, fontWeight: "500", fontSize: 16 }}>VM</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Ionicons style={styles.searchIcon} name="search" size={18} color={Colors.dark} />
          <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor={Colors.dark} />
        </View>

        <View style={styles.iconCircleContainer}>
          <Ionicons name="stats-chart" size={18} color={Colors.dark} />
        </View>

        <View style={styles.iconCircleContainer}>
          <Ionicons name="card" size={18} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 60,
    gap: 8,
    paddingHorizontal: 16
  },
  roundButton: {
    width: 36,
    height: 36,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 30
  },
  searchInput: {
    flex: 1,
    color: Colors.dark
  },
  searchIcon: {
    padding: 10
  },
  iconCircleContainer: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center"
  },
})