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
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={keyboardOffset}>
      <View style={styles.container}>
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

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerText}>Register</Text>
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
  registerButton: {
    width: 160,
    height: 56,
    color: "#1A9F59",
    borderRadius: 16
  },
  registerText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500"
  }
})

export default RegisterPage;