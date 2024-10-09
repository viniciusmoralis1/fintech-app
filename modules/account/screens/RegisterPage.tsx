import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

const RegisterPage = () => {
  const [countryCode, setCountryCode] = useState('+55');
  const [phoneNumber, setphoneNumber] = useState('');

  const onSignUp = async () => {

  }

  return (
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
      <TouchableOpacity>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
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
  }
})

export default RegisterPage;