import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useHeaderHeight } from "@react-navigation/elements"
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamScreensList } from "@/app/navigation/StackNavigator";
import Colors from "@/ds/styles/Colors";
import { Currency } from "../interface/cryptoInterface";
import Ionicons from "@expo/vector-icons/Ionicons";

const CryptoListPage = () => {
  const headerHeight = useHeaderHeight();

  const navigation = useNavigation<NavigationProp<StackParamScreensList>>();

  const currencies = useQuery({
    queryKey: ['listings'],
    queryFn: () => fetch('/api/listings').then(res => res.json())
  });

  const ids = currencies.data?.map((currency: Currency) => currency.id).join(',');

  const { data } = useQuery({
    queryKey: ['info'],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then(res => res.json()),
    enabled: !!ids
  });


  return (
    <ScrollView style={{ marginTop: headerHeight, paddingHorizontal: 12, flex: 1 }}>
      <Text style={styles.cryptoSectionHeader}>Trending Cryptos</Text>
      <View style={styles.cryptoSection}>
      {currencies.data?.map((currency: Currency) => (
        <TouchableOpacity 
          style={{ flexDirection: "row", gap: 12, paddingVertical: 6, borderBottomWidth: .5, borderColor: "#BBB", alignItems: "center", justifyContent: "space-between" }}
          key={ currency.id }
          onPress={() => { navigation.navigate("CryptoDetail", { currency: currency }) }}
        >
          <View style={{flexDirection: "row", gap: 12, alignItems: "center"}} >
            <Image source={{ uri: data?.[currency.id]?.logo }} style={{ width: 34, height: 34 }} />
            <View style={{ gap: 2 }}>
              <Text style={{ fontSize: 16, fontWeight: "500", color: Colors.dark }}>{currency.name}</Text>
              <Text style={{ color: Colors.gray }} >{currency.symbol}</Text>
            </View>
          </View>
          <View style={{ gap: 4, alignItems: "flex-end" }} >
            <Text style={{ fontWeight: "500" }} >$ {currency.quote.USD.price.toFixed(2)}</Text>
            <View style={{ flexDirection: "row", gap: 2 }} >
              <Ionicons
                name={currency.quote.USD.percent_change_1h > 0 ? "caret-up" : "caret-down"}
                size={16}
                color={currency.quote.USD.percent_change_1h > 0 ? Colors.primary : "red"}
              />
              <Text
                style={{ color: currency.quote.USD.percent_change_1h > 0 ? Colors.primary : "red" }}
              >{currency.quote.USD.percent_change_1h.toFixed(2)} %</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  cryptoSectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 12,
    marginBottom: 10,
  },
  cryptoSection: {
    gap: 8,
    marginHorizontal: 8,
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
  }
})

export default CryptoListPage;