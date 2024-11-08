import * as React from "react";
import { View, ScrollView, StyleSheet, Text, FlatList } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements"
import { RoundButton } from "@/ds/components";
import { useBalanceStore } from "@/store/balanceStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamScreensList } from "@/app/navigation/StackNavigator";
import Colors from "@/ds/styles/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomePage = () => {
  const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();
  const navigation = useNavigation<NavigationProp<StackParamScreensList>>();

  const headerHeight = useHeaderHeight();

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

  const navigateToCrypto = () => {
    navigation.navigate("CryptoList");
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
    onPressAction: navigateToCrypto
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
    <ScrollView contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: 40 }}>
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

      <Text style={styles.transactionSectionHeader}>Transactions</Text>
      <View style={styles.transactionSection}>
        { transactions.length === 0 && (
          <Text style={styles.noTransactionsText}>Nothing to show yet</Text>
        )}
        { transactions.reverse().map((transaction) => (
          <View key={transaction.id} style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <View style={styles.circle}>
              <Ionicons name={transaction.amount > 0 ? "add" : "remove"} size={24} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "500" }}>{transaction.title}</Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>{transaction.date.toLocaleString()}</Text>
            </View>
            <Text style={{ fontSize: 16 }}>${transaction.amount}</Text>
          </View>
        ))}
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
    fontWeight: "600",
    marginRight: 8
  },
  transactionSectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    margin: 20,
    marginBottom: 10,
  },
  transactionSection: {
    gap: 20,
    marginHorizontal: 20,
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    justifyContent: "space-evenly",
  },
  noTransactionsText: {
    fontWeight: "500",
    color: "#555",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default HomePage;
