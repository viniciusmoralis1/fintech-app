import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamScreensList } from "@/app/navigation/StackNavigator";

const RegisterPage = () => {
  const [countryCode, setCountryCode] = useState('+55');
  const [phoneNumber, setphoneNumber] = useState('');

  const navigation = useNavigation<NavigationProp<StackParamScreensList>>();

  const keyboardOffset = Platform.OS === "ios" ? 100 : 0;

  const onLogin = async () => {

  }

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={keyboardOffset}>
      <View style={styles.container}>
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

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.registerText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
          <View style={{ flex: 1, height: .5, backgroundColor: "#F1F1F1" }} />
          <Text style={{ color: "#A6A6A6", fontSize: 12 }} >or</Text>
          <View style={{ flex: 1, height: .5, backgroundColor: "#F1F1F1" }} />
        </View>

        <TouchableOpacity style={styles.emailButton}>
          <Text>Continue with e-mail</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
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
    color: "#5218AF",
    fontWeight: "500"
  },
  numberInput: {
    backgroundColor: "#BBB",
    padding: 16,
    borderRadius: 16,
    fontSize: 18,
    fontWeight: "500",
  },
  loginButton: {
    width: 160,
    height: 56,
    color: "#1A9F59",
    borderRadius: 16
  },
  registerText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500"
  },
  emailButton: {
    backgroundColor: "#FFF",
    width: 160,
    height: 56,
    flexDirection: "row",
    marginTop: 16, 
  },
  googleButton: {
    backgroundColor: "#FFF",
    width: 160,
    height: 56,
    flexDirection: "row",
    marginTop: 16, 
  }
})

export default RegisterPage;