import * as React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";

const HomePage = () => {
  const balance = 2581;

  return (
    <ScrollView>
      <View style={styles.accountContainer}>

      </View>
      <Text>{balance}</Text>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
  },
  accountContainer: {
    margin: 80,
    alignItems: "center"
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  balance: {
    fontSize: 56,
    fontWeight: "bold"
  },
  currency: {
    fontSize: 40,
    marginRight: 8
  }
})

export default HomePage;
