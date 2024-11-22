import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, SectionList, Text, View, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
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

type CryptoDetailRouteProps = RouteProp<StackParamScreensList, 'CryptoDetail'>;
type CryptoDetailPageProps = {
  route: CryptoDetailRouteProps;
}

Animated.addWhitelistedNativeProps({ text: true, defaultValue: true })
const AnimatedText = Animated.createAnimatedComponent(TextInput);

function Tooltip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return (
    <>
      <Circle cx={x} cy={y} r={12} color={"#1AAF5955"} />
      <Circle cx={x} cy={y} r={6} color={Colors.primary} />
    </>
  ) 
}

const CryptoDetailPage: React.FC<CryptoDetailPageProps> = ({route}) => {
  const [ scrolled, setScrolled ] = useState(false);
  const [ activeIndex, setActiveIndex ] = useState(2);
  const [ selectedDate, setSelectedDate ] = useState(new Date());
  const [ interval, setInterval ] = useState('1h');
  const { currencyId } = route.params;
  const navigation = useNavigation<NavigationProp<StackParamScreensList>>();  
  const timeToShow = ['Today', '5 days', '1 month', '6 months', '1 year'];
  const font = useFont(require('@/ds/assets/fonts/SpaceMono-Regular.ttf'), 12);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0}});

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
    queryKey: ['info', currencyId],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${currencyId}`).then(res => res.json());
      return info[+currencyId];
    }
  });

  let tickers = useQuery({
    queryKey: ['tickers', crypto.data?.id, selectedDate],
    queryFn: async (): Promise<any[]> => await 
      fetch(`/api/tickers?symbol=${crypto.data?.symbol}&name=${crypto.data?.name}&date=${selectedDate}&interval=${interval}`).then(res => res.json()),
    enabled: !!selectedDate
  });

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 27 && !scrolled) {
      setScrolled(true);
    } else if (offsetY <= 30 && scrolled) {
      setScrolled(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: scrolled ? crypto.data?.name : '',
    });
  }, [scrolled, navigation]);

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
    { (crypto.isLoading || tickers.isLoading) ? (
      <View></View>
    ) : (
      <SectionList
        keyExtractor={(data) => data.title}
        style={{ paddingHorizontal: 8, backgroundColor: Colors.background }}
        onScroll={handleScroll}
        sections={[{ data: [{ title: "Chart" }] }]}
        renderSectionHeader={() => (
        <>
          { !isActive && (
            <ScrollView
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "space-between",
                padding: 8,
                backgroundColor: Colors.background
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
          )}
          
          { isActive && (
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
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 16
            }}
          >
            <View style={{flexDirection: "column", marginBottom: 12}}>
              <Text style={styles.title}>{crypto.data?.name}</Text>
              <Text style={styles.subtitle} >{crypto.data?.symbol}</Text>
            </View>
            <Image source={{ uri: crypto?.data?.logo }} style={{width: 60, height: 60}} />
          </View>
        )}
        renderItem={() => (
          <>
            <View style={styles.cartesianContainer} >
              {tickers?.data && (
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
                )}
            </View>
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
    fontSize: 24,
    fontWeight: '500',
    color: Colors.dark
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkGray
  },
  descriptionBlock: {
    marginHorizontal: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    gap: 12,
    marginTop: 20
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  categoriesBtnActive: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center',
    justifyContent: 'space-between',
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