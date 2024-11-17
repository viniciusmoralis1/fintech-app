import React from "react";
import { StyleSheet, View } from "react-native";
import { Shimmer } from "@/ds/components/Shimmer";

export const CryptoItemSkeleton = () => {
  return (
    <View style={styles.listItem}>

      <View style={{flexDirection: "row", gap: 56, alignItems: "center"}} >
        <Shimmer width={44} height={44} circle />

        <View style={{ gap: 2 }}>
          <Shimmer width={88} height={24} />
          <Shimmer width={44} height={20} />
        </View>
      </View>

      <View style={{ gap: 4, alignItems: "flex-end" }} >
        <Shimmer width={64} height={24} />
        <Shimmer width={32} height={20} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#DDD",
    justifyContent: "space-between",
    paddingVertical: 8
  }
});
