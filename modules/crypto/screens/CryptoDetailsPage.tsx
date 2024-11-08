import React from "react";
import { View, Text } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { RouteProp } from "@react-navigation/native";
import { StackParamScreensList } from "@/app/navigation/StackNavigator";

type CryptoDetailRouteProps = RouteProp<StackParamScreensList, 'CryptoDetail'>;
type CryptoDetailPageProps = {
  route: CryptoDetailRouteProps;
}

const CryptoDetailsPage: React.FC<CryptoDetailPageProps> = ({route}) => {
  const headerHeight = useHeaderHeight();

  const {currency} = route.params;

  return (
    <View style={{ paddingTop: headerHeight, paddingHorizontal: 12 }}>
      <Text>{ currency.name }</Text>
    </View>
  )
}

export default CryptoDetailsPage;