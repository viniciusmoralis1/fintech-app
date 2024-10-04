import { View, Text, StyleSheet } from "react-native";

const RegisterPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }, 
  buttonsContainer: {
    gap: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold"
  }

})

export default RegisterPage;