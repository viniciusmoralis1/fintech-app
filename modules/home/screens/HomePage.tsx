import * as React from "react";
import { View, ScrollView, StyleSheet, Text, FlatList } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { RoundButton } from "@/ds/components";
import { useBalanceStore } from "@/store/balanceStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamScreensList } from "@/app/navigation/StackNavigator";
import FormatMoney from "@/utils/MoneyFormatter";
import Colors from "@/ds/styles/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Mastercard from "@/ds/assets/svg/MastercardIcon";

const HomePage = () => {
  const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();
  const navigation = useNavigation<NavigationProp<StackParamScreensList>>();

  const headerHeight = useHeaderHeight();

  const navigateToAddFund = () => {
    navigation.navigate("AddFund");
  }

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor((Math.random() * 100000))/100,
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
    onPressAction: navigateToAddFund
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
  }];

  return (
    <ScrollView contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: 40 }}>
      <View style={{ flexDirection: "row", flex: 1, margin: 32, gap: 12 }}>
        <View style={styles.accountContainer}>
          <Text style={{ color: Colors.white, marginBottom: 16 }}>MAIN BALANCE</Text>
          <View style={styles.balanceContainer}>
            <Text style={styles.currency}>$</Text>
            <Text style={styles.balance}>{balance().valueOf() === 0  ? balance() : FormatMoney(balance())}</Text>
          </View>
          <Text style={{ color: Colors.white, marginTop: 8, backgroundColor: Colors.primaryMuted, borderRadius: 30, padding: 6, fontWeight: "500"}} >+ 2,3%</Text>
        </View>
      <View>
        <View style={styles.mainCardContainer}>
          <Text style={{ color: Colors.primary, marginBottom: 18 }}>MAIN CARD</Text>
          <View style={styles.balanceContainer}>
            <Text style={{ color: Colors.primary, fontSize: 24, fontWeight: "bold" }}>** 5910</Text>
          </View>
          <Mastercard />
        </View>
      </View>

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
            <Text style={{ fontSize: 16 }}>$ {FormatMoney(transaction.amount)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  accountContainer: {
    width: 160,
    height: 200,
    padding: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: Colors.primary,
    borderRadius: 16,
  },
  mainCardContainer: {
    width: 160,
    height: 200,
    padding: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: Colors.tertiary,
    borderRadius: 16,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  balance: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white
  },
  currency: {
    fontSize: 22,
    fontWeight: "600",
    marginRight: 8,
    color: Colors.white
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
