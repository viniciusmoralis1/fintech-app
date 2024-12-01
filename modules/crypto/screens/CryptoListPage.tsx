import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useQuery } from "@tanstack/react-query";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamScreensList } from "@/app/navigation/StackNavigator";
import { CryptoItemSkeleton } from "../components/CryptoItemSkeleton";
import { Currency } from "../interface/cryptoInterface";
import Colors from "@/ds/styles/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import FormatCryptoValue from "@/utils/CryptoValueFormatter";

const CryptoListPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigation = useNavigation<NavigationProp<StackParamScreensList>>();

  const headerHeight = useHeaderHeight();

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 40 && !scrolled) {
      setScrolled(true);
    } else if (offsetY <= 40 && scrolled) {
      setScrolled(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: scrolled ? "Trending Cryptos" : "",
    });
  }, [scrolled]);

  const currencies = useQuery({
    queryKey: ["listings"],
    queryFn: () => fetch("/api/listings").then(res => res.json())
  });

  const ids = currencies.data?.map((currency: Currency) => currency.id).join(",");

  const info = useQuery({
    queryKey: ["info", ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then(res => res.json()),
    enabled: !!ids
  });

  return (
    <ScrollView style={[styles.container, { marginTop: headerHeight }]} onScroll={handleScroll}>
      <Text style={styles.cryptoSectionHeader}>Trending Cryptos</Text>
      <View style={styles.cryptoList}>

      { (currencies.isLoading || info.isLoading) ? (
        <>
          <CryptoItemSkeleton />
          <CryptoItemSkeleton />
          <CryptoItemSkeleton />
          <CryptoItemSkeleton />
          <CryptoItemSkeleton />
          <CryptoItemSkeleton />
          <CryptoItemSkeleton />
          <CryptoItemSkeleton />
        </>
       ) : (
        currencies.data?.map((currency: Currency) => (
          <TouchableOpacity 
            style={styles.cryptoItem}
            key={ currency.id }
            onPress={() => { navigation.navigate("CryptoDetail", {
                currencyId: currency.id,
                currencyName: currency.name,
                currencyPrice: currency.quote.USD.price,
                currency24hChange: currency.quote.USD.percent_change_24h.toFixed(2)
              })
            }}
          >
            <View style={{flexDirection: "row", gap: 12, alignItems: "center"}} >
              <Image source={{ uri: info?.data?.[currency.id]?.logo }} style={{ width: 36, height: 36 }} />
              <View style={{ gap: 2 }}>
                <Text style={styles.cryptoName}>{currency.name}</Text>
                <Text style={styles.cryptoSymbol} >{currency.symbol}</Text>
              </View>
            </View>
            <View style={{ gap: 4, alignItems: "flex-end" }} >
              <Text style={{ fontWeight: "500" }} >$ {FormatCryptoValue(currency.quote.USD.price)}</Text>
              <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }} >
                <Ionicons
                  name={currency.quote.USD.percent_change_24h > 0 ? "arrow-up" : "arrow-down"}
                  size={16}
                  color={currency.quote.USD.percent_change_24h > 0 ? Colors.primary : "red"}
                />
                <Text
                  style={{ color: currency.quote.USD.percent_change_24h > 0 ? Colors.primary : "red" }}
                >{currency.quote.USD.percent_change_24h.toFixed(2)}%</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
       )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { 
    paddingHorizontal: 8,
    flex: 1,
    backgroundColor: Colors.background
  },
  cryptoSectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 12,
    marginBottom: 10,
  },
  cryptoList: {
    gap: 12,
    marginHorizontal: 8,
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 24,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },
  cryptoItem: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: .2,
    borderColor: "#DDD",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.dark
  },
  cryptoSymbol: {
    color: Colors.gray
  }
})

export default CryptoListPage;