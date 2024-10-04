import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you ready to change the way you see money?</Text>
      <Text style={styles.subtitle}>So dive into it</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity>
          <Text>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
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

export default HomePage;