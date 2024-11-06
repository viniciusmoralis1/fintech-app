import React from "react";
import { View, Text, Image } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useHeaderHeight } from "@react-navigation/elements"

interface Currency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: string[];
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  infinite_supply: boolean;
  platform?: any;
  cmc_rank: number;
  self_reported_circulating_supply?: any;
  self_reported_market_cap?: any;
  tvl_ratio?: any;
  last_updated: string;
}

const CryptoPage = () => {
  const headerHeight = useHeaderHeight();

  const currencies = useQuery({
    queryKey: ['listings'],
    queryFn: () => fetch('/api/listings').then(res => res.json())
  })

  const ids = currencies.data?.map((currency: Currency) => currency.id).join(',')

  console.log(ids)

  const { data } = useQuery({
    queryKey: ['info'],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then(res => res.json()),
    enabled: !!ids
  })

  return (
    <View style={{ paddingTop: headerHeight, paddingHorizontal: 12 }}>
        {currencies.data?.map((currency: Currency) => (
          <View style={{ flexDirection: "row", gap: 12, padding: 6 }} key={ currency.id } >
            <Image source={{ uri: data?.[currency.id]?.logo }} style={{ width: 24, height: 24 }} />
            <Text>{currency.name} - {currency.id}</Text>
          </View>
        ))}
    </View>
  )
}

export default CryptoPage;