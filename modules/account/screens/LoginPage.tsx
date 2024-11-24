import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamScreensList } from "@/app/navigation/StackNavigator";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/ds/styles/Colors";

const RegisterPage = () => {
  const [countryCode, setCountryCode] = useState('+55');
  const [phoneNumber, setphoneNumber] = useState('');

  const navigation = useNavigation<NavigationProp<StackParamScreensList>>();

  const keyboardOffset = Platform.OS === "ios" ? 100 : 0;

  const onLogin = async () => {

  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={keyboardOffset}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.description}>
        Enter the phone number associated with your account.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.numberInput, {width: 72}]}
          placeholder="CC"
          placeholderTextColor={"#AAA"}
          keyboardType="numeric"
          value={countryCode}
          onChangeText={setCountryCode}
        />

        <TextInput
          style={[styles.numberInput, {flex: 1}]}
          placeholder="Mobile number"
          placeholderTextColor={"#979797"}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setphoneNumber}
        />
      </View>

      <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
        <Text style={styles.linkText}>Don't have an account already? Register now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => { navigation.navigate("Tabs") }}>
        <Text style={styles.registerText}>Continue</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
        <View style={{ flex: 1, height: .8, backgroundColor: "#CCC" }} />
        <Text style={{ color: "#A6A6A6", fontSize: 14 }} >or</Text>
        <View style={{ flex: 1, height: .8, backgroundColor: "#CCC" }} />
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={styles.emailButton}>
          <Ionicons name="mail" size={22} backgroundColor="transparent" />
          <Text>Continue with e-mail</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
          <Ionicons name="logo-google" size={22} backgroundColor="transparent" />
          <Text>Continue with Google account</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 56
  },
  inputContainer: {
    marginVertical: 28,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    marginTop: 12
  },
  linkText: {
    color: Colors.secondary,
    fontWeight: "500"
  },
  numberInput: {
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 16,
    fontSize: 18,
    fontWeight: "500",
  },
  loginButton: {
    width: 260,
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 56,
    marginVertical:40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  registerText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "500"
  },
  emailButton: {
    backgroundColor: Colors.white,
    width: 300,
    height: 52,
    flexDirection: "row",
    marginTop: 16,
    borderRadius: 32,
    alignItems: "center",
    paddingLeft: 24,
    gap: 32
  },
  googleButton: {
    backgroundColor: Colors.white,
    width: 300,
    height: 52,
    flexDirection: "row",
    marginTop: 16,
    borderRadius: 32,
    alignItems: "center",
    paddingLeft: 24,
    gap: 32
  }
})

export default RegisterPage;