import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../styles/Colors";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export interface ShimmerProps {
  width: number;
  height: number;
  centered?: boolean;
  borderRadius?: number;
}

export const Shimmer: React.FC<ShimmerProps> = (props) => {
  const trX = useSharedValue(0);

  useEffect(() => {
    trX.value = withRepeat(withTiming(1, { duration: 2000 }), -1); //-1 to indicate infinite
  }, []);

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(trX.value, [0, 1], [ -props.width, props.width ])}
    ]
  }));

  return (
    <View
    style={[styles.container, {
      alignItems: props.centered ? "center" : "flex-start"
    }]}>
      <View
        style={[styles.box, {
          width: props.width,
          height: props.height,
          borderRadius: props.borderRadius ? props.borderRadius : 8 }]
        }
      >
        <AnimatedLinearGradient 
          colors={["transparent", Colors.lightGray, "transparent"]}
          style={[ {...StyleSheet.absoluteFillObject}, rStyle ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  box: {
    backgroundColor: "#00000005",
    overflow: "hidden"
  },
});

