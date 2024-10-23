import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamScreensList } from "@/app/navigation/StackNavigator";

const RegisterPage = () => {
  const [countryCode, setCountryCode] = useState('+55');
  const [phoneNumber, setphoneNumber] = useState('');

  const navigation = useNavigation<NavigationProp<StackParamScreensList>>();

  const keyboardOffset = Platform.OS === "ios" ? 100 : 0;

  const onSignUp = async () => {

  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={keyboardOffset}>
      <Text style={styles.title}>Let's get started!</Text>
      <Text style={styles.description}>
        Enter your phone number. We will send you a confirmation code there
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

      <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={() => { navigation.navigate("Home") }}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
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
    color: "#22A8AF",
    fontWeight: "500"
  },
  numberInput: {
    backgroundColor: "#BBB",
    padding: 16,
    borderRadius: 16,
    fontSize: 18,
    fontWeight: "500",
  },
  registerButton: {
    width: 260,
    height: 52,
    backgroundColor: "#1A9F59",
    borderRadius: 56,
    marginVertical:40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  registerText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500"
  }
})

export default RegisterPage;