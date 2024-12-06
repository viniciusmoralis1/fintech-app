import React, { useRef, useState } from "react";
import { Modal, KeyboardAvoidingView, TouchableOpacity, View, Text, TextInput, StyleSheet, Animated, Platform, Pressable } from "react-native";
import Colors from "@/ds/styles/Colors";
import FormatMoney from "@/utils/MoneyFormatter";
import { Ionicons } from "@expo/vector-icons";

interface BottomSheetProps {
  show: boolean;
  onClose?: () => void;
}

export const BottomSheet = ({ show, onClose }: BottomSheetProps) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const [ value, setValue] = useState("");

  function handleOnClose() {
    setValue("");

    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start(() => onClose?.());
  }

  return (
    <Modal
      visible={show}
      transparent
      onShow={() => {
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }).start();
      }}
    >
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex: 1}}>
        <Animated.View style={[ styles.overlay, { opacity: fadeAnimation }]}>
          <Pressable onPress={onClose} style={{ flex: 1 }} />
        </Animated.View>

        <View style={styles.modalWrapper}>
          <Text style={{fontSize: 18, fontWeight: "500", color: Colors.dark}}>How much you want to add?</Text>
          
          <View style={styles.actionContainer}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Text style={{ color: Colors.dark }} >USD</Text>
              <TextInput autoFocus keyboardType="numeric" style={styles.moneyInput} value={value} placeholder="0" onChangeText={setValue} />
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => setValue("")}>
              <Ionicons name="close-circle" size={22} backgroundColor="transparent" />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleOnClose} style={[styles.button, { backgroundColor: Colors.dark }]}>
              <Text style={{fontSize: 16, color: Colors.white, fontWeight: "500"}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOnClose} style={[styles.button, { backgroundColor: Colors.primary }]}>
              <Text style={{fontSize: 16, color: Colors.white, fontWeight: "500"}}>Continue</Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalWrapper: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: "auto",
    paddingHorizontal: 24,
    paddingVertical: 16
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
  },
  buttonContainer: { 
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 24
  },
  button: {
    padding: 12,
    borderRadius: 16,
    height: 48,
    width: 160,
    justifyContent: "center",
    alignItems: "center"
  },
  moneyInput: {
    fontSize: 18,
    flex: .9,
  },
  deleteButton: {
    alignItems: "center",
  },
});