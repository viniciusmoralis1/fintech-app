import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamScreensList } from "@/app/navigation/StackNavigator";

const WelcomePage = () => {
  const navigation = useNavigation<NavigationProp<StackParamScreensList>>();

  return (
    <ImageBackground style={styles.imageContainer} source={require('@/ds/assets/images/fintech-app-background-2.jpeg')}>
      <View style={styles.container}>
        <Text style={styles.title}>Are you ready to change the way you see money?</Text>
        <Text style={styles.subtitle}>Just dive into</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={() => { navigation.navigate("Register") }}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={() => { navigation.navigate("Login") }}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.58)",
    padding: 48
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
  buttonsContainer: {
    gap: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 32
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    color: "#FFF"
  },
  subtitle: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#FFF"
  },
  registerButton: {
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 104,
    backgroundColor: "#1A9F59"
  },
  registerText:{
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500"
  },
  loginButton: {
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 104,
    borderColor: "#1ADF59",
    borderWidth: 2.5
  },
  loginText:{
    color: "#1ADF59",
    fontSize: 16,
    fontWeight: "500"
  }  
})

export default WelcomePage;