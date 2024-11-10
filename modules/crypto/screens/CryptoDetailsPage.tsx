import React, { useEffect, useState } from "react";
import { ScrollView, SectionList, Text } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { RouteProp } from "@react-navigation/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamScreensList } from "@/app/navigation/StackNavigator";
import { useQuery } from "@tanstack/react-query";

type CryptoDetailRouteProps = RouteProp<StackParamScreensList, 'CryptoDetail'>;
type CryptoDetailPageProps = {
  route: CryptoDetailRouteProps;
}

const CryptoDetailsPage: React.FC<CryptoDetailPageProps> = ({route}) => {
  const headerHeight = useHeaderHeight();
  const [scrolled, setScrolled] = useState(false);
  const navigation = useNavigation<NavigationProp<StackParamScreensList>>();  
  const { currencyId } = route.params;

  const { data } = useQuery({
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
      headerTitle: scrolled ? data?.name : '',
    });
  }, [scrolled, navigation]);


  return (
    <ScrollView style={{ paddingTop: headerHeight, paddingHorizontal: 12 }} onScroll={handleScroll}>
      <Text>{ data?.name }</Text>
      <SectionList renderItem={() => (<Text></Text>)} keyExtractor={(item) => item.title} sections={[]} >

      </SectionList>
    </ScrollView>
  )
}

export default CryptoDetailsPage;