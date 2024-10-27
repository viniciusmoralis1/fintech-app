import * as React from "react";
import { View, ScrollView, StyleSheet, Text, FlatList } from "react-native";
import { RoundButton } from "@/ds/components";
import { useBalanceStore } from "@/store/balanceStore";

const HomePage = () => {
  const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: 100,
      date: new Date(),
      title: "Adding money",
    });
  };

  const clearHistory = () => {
    clearTransactions()
  }

  const optionsList = [{
    icon: "add",
    text: "Add money",
    onPressAction: onAddMoney
  },
  {
    icon: "refresh",
    text: "Exchange",
    onPressAction: clearHistory
  },
  {
    icon: "list",
    text: "Details",
    onPressAction: () => {}
  },
  {
    icon: "stats-chart-outline",
    text: "Statement",
    onPressAction: () => {}
  },
  {
    icon: "cash-outline",
    text: "Converter",
    onPressAction: () => {}
  },
  {
    icon: "image",
    text: "Background",
    onPressAction: () => {}
  }]

  return (
    <ScrollView>
      <View style={styles.accountContainer}>
        <Text style={styles.currency}>$</Text>
        <Text style={styles.balance}>{balance()}</Text>
      </View>

      <FlatList
        data={optionsList}
        renderItem={(data) =>
          <RoundButton
            list={true}
            icon={data.item.icon}
            text={data.item.text}
            onPressAction={() => {data.item.onPressAction()}}
          />
        }
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionHeader}>Transactions</Text>
      <View>
        { transactions.length === 0 && (
          <Text>No transactions</Text>
        )}
      </View>
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 10,
  }
})

export default HomePage;
