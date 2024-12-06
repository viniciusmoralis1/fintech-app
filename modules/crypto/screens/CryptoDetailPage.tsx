import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, SectionList, Text, View, Image, StyleSheet, TouchableOpacity, TextInput, useWindowDimensions } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamScreensList } from "@/app/navigation/StackNavigator";
import { useQuery } from "@tanstack/react-query";
import Colors from "@/ds/styles/Colors";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { DateFormatter , GenerateDate, GenerateInterval } from "@/utils/DateFormatter";
import * as Haptics from "expo-haptics";
import Animated, { SharedValue, useAnimatedProps } from "react-native-reanimated";
import FormatCryptoValue from "@/utils/CryptoValueFormatter";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Shimmer } from "@/ds/components/Shimmer";

type CryptoDetailRouteProps = RouteProp<StackParamScreensList, "CryptoDetail">;
type CryptoDetailPageProps = {
  route: CryptoDetailRouteProps;
}

Animated.addWhitelistedNativeProps({ text: true, defaultValue: true })
const AnimatedText = Animated.createAnimatedComponent(TextInput);

function Tooltip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return (
    <>
      <Circle cx={x} cy={y} r={12} color={Colors.primaryTransparency} />
      <Circle cx={x} cy={y} r={6} color={Colors.primary} />
    </>
  )
}

const CryptoDetailPage: React.FC<CryptoDetailPageProps> = ({route}) => {
  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ selectedDate, setSelectedDate ] = useState(new Date());
  const [ interval, setInterval ] = useState("1h");
  const { currencyId, currencyName, currencyPrice, currency24hChange } = route.params;
  const navigation = useNavigation<NavigationProp<StackParamScreensList>>();
  const timeToShow = ["Today", "5 days", "1 month", "6 months", "1 year"];
  const font = useFont(require("@/ds/assets/fonts/SpaceMono-Regular.ttf"), 12);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0}});

  navigation.setOptions({
    headerTitle: currencyName,
  })

  const dimension = useWindowDimensions()

  useEffect(() => {
   if(isActive) Haptics.selectionAsync();
  }, [isActive]);

  const updateSelectedDate = useCallback(() => {
    const date = GenerateDate(activeIndex);
    const intervalTime = GenerateInterval(activeIndex);
    setInterval(intervalTime);
    setSelectedDate(date);
  }, [activeIndex]);

  useEffect(() => {
    updateSelectedDate();
  }, [activeIndex, updateSelectedDate]);

  const crypto = useQuery({
    queryKey: ["info", currencyId],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${currencyId}`).then(res => res.json());
      return info[+currencyId];
    }
  });

  let tickers = useQuery({
    queryKey: ["tickers", crypto.data?.id, selectedDate],
    queryFn: async (): Promise<any[]> => await
      fetch(`/api/tickers?symbol=${crypto.data?.symbol}&name=${crypto.data?.name}&date=${selectedDate}&interval=${interval}`)
      .then(res => res.json()),
    enabled: !!selectedDate
  });

  const animatedValueText = useAnimatedProps(() => {
    return {
      text: `$ ${state.y.price.value.value.toFixed(2)}`,
      defaultValue: `$ ${state.y.price.value.value}`,
    }
  })

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value).toLocaleString();

    return {
      text: `${date}`,
      defaultValue: `${date}`
    }
  })

  return (
    <>
    { crypto.isLoading ? (
      <View></View>
    ) : (
      <SectionList
        keyExtractor={(data) => data.title}
        style={{ backgroundColor: Colors.background }}
        sections={[{ data: [{ title: "Chart" }] }]}
        renderSectionHeader={() => (
        <>
          { !isActive ? (
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
                padding: 12,
                backgroundColor: Colors.white
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {timeToShow.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={ activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn }
                  onPress={() => setActiveIndex(index)}
                >
                  <Text style={ activeIndex === index ? styles.categoryTextActive : styles.categoryText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.valueContainer}>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.valueText} >Value on </Text>
                <AnimatedText
                  style={styles.valueText}
                  editable={false}
                  animatedProps={animatedDateText}
                />
              </View>
              <AnimatedText
                style={styles.categoryTextActive}
                editable={false}
                animatedProps={animatedValueText}
              />
            </View>
          )}
        </>
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 10,
              marginVertical: 14
            }}
          >
            <View style={{ flexDirection: "row", gap: 14 }}>
              <Image source={{ uri: crypto?.data?.logo }} style={{width: 48, height: 48}} />
              <View style={{flexDirection: "column"}}>
                <Text style={styles.title}>Price of {crypto.data?.symbol}</Text>
                <Text style={styles.subtitle}>USD {FormatCryptoValue(currencyPrice)}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }} >
                <Ionicons
                  name={Number(currency24hChange) > 0 ? "arrow-up" : "arrow-down"}
                  size={14}
                  color={Number(currency24hChange) > 0 ? Colors.primary : "red"}
                />
                <Text
                  style={{ color: Number(currency24hChange) > 0 ? Colors.primary : "red" }}
                >{currency24hChange}% (24h)</Text>
              </View>
          </View>
        )}
        renderItem={() => (
          <>
            {tickers?.data ? (
              <View style={styles.cartesianContainer} >
                <CartesianChart
                  data={tickers.data}
                  xKey="timestamp"
                  yKeys={["price"]}
                  axisOptions={{
                    labelColor: Colors.gray,
                    font,
                    tickCount: 5,
                    formatXLabel: (timestamp: string) => DateFormatter(timestamp, activeIndex),
                    formatYLabel: (price) => `$${price}`,
                  }}
                  chartPressState={state}
                >
                  {({ points }) => (
                    <>
                      <Line points={points.price} color={Colors.primary} strokeWidth={2} animate={{ type: "timing", duration: 300 }}/>
                      { isActive && <Tooltip x={state.x.position} y={state.y.price.position} /> } 
                    </>
                  )}
                </CartesianChart>
              </View>
            ) : (
              <Shimmer height={400} width={dimension.width}/>
            )}
            <View style={styles.descriptionBlock}>
              <Text style={styles.subtitle}>Overview</Text>
              <Text style={{color: Colors.darkGray}}>{crypto.data?.description}</Text>
            </View>
          </>
        )}
      />
    )}
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.darkGray
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black"
  },
  descriptionBlock: {
    marginHorizontal: 8,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    gap: 12,
    marginVertical: 20
  },
  categoryText: {
    color: Colors.darkGray,
    fontWeight: "500"
  },
  categoryTextActive: {
    color: Colors.white,
    fontWeight: "bold"
  },
  categoriesBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  categoriesBtnActive: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 24,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6
  },
  cartesianContainer: {
    height: 400,
    margin: 8,
    padding: 8,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  valueContainer: { 
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.primaryMuted,
    borderRadius: 24,
    flexDirection: "row",
    marginVertical: 8,
    padding: 4,
    paddingHorizontal: 12,
  },
  valueText: {
    color: Colors.white,
    fontWeight: "500"
  },
});

export default CryptoDetailPage;