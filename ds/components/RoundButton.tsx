import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/ds/styles/Colors";

export type RoundButtonProps = {
  text: string;
  icon: typeof Ionicons.defaultProps;
  onPressAction: () => void;
  list?: boolean;
}

export const RoundButton = ({text, icon, onPressAction, list}: RoundButtonProps) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, list ? { marginLeft: 6, marginRight: 4 } : {}]} onPress={onPressAction}>
      <View style={styles.iconCircleContainer}>
        <Ionicons name={icon} size={32} />
      </View>
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    gap: 10,
    padding: 2
  },
  iconCircleContainer: {
    width: 64,
    height: 64,
    borderRadius: 50,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    fontSize: 14,
    fontWeight: "500"
  },
})