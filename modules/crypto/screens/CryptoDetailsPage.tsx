import React, { useEffect, useState } from "react";
import { ScrollView, SectionList, Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { RouteProp } from "@react-navigation/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamScreensList } from "@/app/navigation/StackNavigator";
import { useQuery } from "@tanstack/react-query";
import Colors from "@/ds/styles/Colors";

type CryptoDetailRouteProps = RouteProp<StackParamScreensList, 'CryptoDetail'>;
type CryptoDetailPageProps = {
  route: CryptoDetailRouteProps;
}

const CryptoDetailsPage: React.FC<CryptoDetailPageProps> = ({route}) => {
  const headerHeight = useHeaderHeight();
  const [scrolled, setScrolled] = useState(false);
  const [ activeIndex, setActiveIndex ] = useState(0);
  const navigation = useNavigation<NavigationProp<StackParamScreensList>>();  
  const { currencyId } = route.params;
  const categories = ['Overview', 'News', 'Orders', 'Transactions'];

  const crypto = useQuery({
    queryKey: ['info'],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${currencyId}`).then(res => res.json());
      return info[+currencyId]
    }
  });

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 30 && !scrolled) {
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


  return (
    <ScrollView style={{ paddingVertical: 16, paddingHorizontal: 12 }} onScroll={handleScroll}>
      <SectionList
        keyExtractor={(data) => data.title}
        sections={[{ data: [{ title: "Chart" }] }]}
        renderSectionHeader={() => (
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: Colors.background,
              borderBottomColor: Colors.lightGray,
              borderBottomWidth: 0.5
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={ activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                onPress={() => setActiveIndex(index)}
              >
                <Text style={ activeIndex === index ? styles.categoryTextActive : styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
            <Image source={{ uri: crypto?.data?.logo ?? '' }} style={{width: 60, height: 60}} />
          </View>
        )}
        renderItem={() => (
          <>
            <View style={{height: 800, backgroundColor: Colors.primary}}></View>
            <View style={styles.descriptionBlock}>
              <Text style={styles.subtitle}>Overview</Text>
              <Text style={{color: Colors.gray}}>{crypto.data?.description}</Text>
            </View>
          </>
        )} 
      
      >
      </SectionList>
    </ScrollView>
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
    color: Colors.gray
  },
  descriptionBlock: {
    marginHorizontal: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 12,
    marginTop: 20
  },
  categoryText: {
    color: Colors.gray
  },
  categoryTextActive: {
    color: Colors.dark
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
  }
});

export default CryptoDetailsPage;