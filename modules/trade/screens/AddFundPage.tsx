import Colors from "@/ds/styles/Colors";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export const AddFundPage = () => {
  const [ valuee, setValue ] = useState<number[]>([0]);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", paddingTop: 32 }}>
        <Text style={styles.fundText}>{valuee}</Text>
      </View>

      <View style={{margin: 60, gap: 50}}>
        <View style={{flexDirection: "row", justifyContent: "space-between" }}>
          {[1, 2, 3].map((number) => (
            <Text key={number} style={{fontSize: 32}} onPress={() => { setValue([...valuee, number])}} >
              {number}
            </Text>
          ))}
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          {[4, 5, 6].map((number) => (
            <Text key={number} style={{fontSize: 32}} onPress={() => { setValue([...valuee, number])}} >
              {number}
            </Text>
          ))}
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          {[7, 8, 9].map((number) => (
            <Text key={number} style={{fontSize: 32}} onPress={() => { setValue([...valuee, number])}} >
              {number}
            </Text>
          ))}
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  fundText: {
    fontSize: 48,
  },
})

export default AddFundPage;