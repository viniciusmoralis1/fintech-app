import * as React from "react";
import { View, ScrollView, StyleSheet, Text, Button, FlatList } from "react-native";
import { RoundButton } from "@/ds/components";

const HomePage = () => {
  const balance = 2581;

  const onAddMoney = () => {

  }

  const optionsList = [{
    icon: "add",
    text: "Add money",
    onPressAction: onAddMoney()
  },
  {
    icon: "refresh",
    text: "Exchange",
    onPressAction: onAddMoney()
  },
  {
    icon: "list",
    text: "Details",
    onPressAction: onAddMoney()
  },
  {
    icon: "stats-chart-outline",
    text: "Statement",
    onPressAction: onAddMoney()
  },
  {
    icon: "cash-outline",
    text: "Converter",
    onPressAction: onAddMoney()
  },
  {
    icon: "image",
    text: "Background",
    onPressAction: onAddMoney()
  },
  ]

  return (
    <ScrollView>
      <View style={styles.accountContainer}>
        <Text style={styles.currency}>$</Text>
        <Text style={styles.balance}>{balance}</Text>
      </View>

      <FlatList
        style={styles.actionRow}
        data={optionsList}
        renderItem={(data) => <RoundButton list={true} icon={data.item.icon} text={data.item.text} onPressAction={() => {data.item.onPressAction}} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  accountContainer: {
    margin: 80,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  balance: {
    fontSize: 44,
    fontWeight: "bold"
  },
  currency: {
    fontSize: 24,
    fontWeight: "500",
    marginRight: 8
  },
  actionRow: {
    margin: 16
  },
})

export default HomePage;
