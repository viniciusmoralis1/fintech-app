import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamScreensList } from "@/app/navigation/StackNavigator";

const HomePage = () => {
  const navigation = useNavigation<NavigationProp<StackParamScreensList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you ready to change the way you see money?</Text>
      <Text style={styles.subtitle}>So dive into it</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={() => { navigation.navigate("Register") }}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  }, 
  buttonsContainer: {
    gap: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 32
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold"
  },
  registerButton: {
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 96,
    backgroundColor: "#1A9F59"
  },
  registerText:{
    color: "#FFF",
    fontSize: 16
  },
  loginButton: {
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 96,
    borderColor: "#1A9F59",
    borderWidth: 2,
  },
  loginText:{
    color: "#1A9F59",
    fontSize: 16
  }  
})

export default HomePage;