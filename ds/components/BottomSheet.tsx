import React, { useRef } from "react";
import { Modal, KeyboardAvoidingView, TouchableOpacity, View, Text, TextInput, StyleSheet, Animated, Platform, Pressable } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface BottomSheetProps {
  show: boolean;
  onClose?: () => void;
}

export const BottomSheet = ({ show, onClose }: BottomSheetProps) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  function handleOnClose() {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 200,
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

        <View style={styles.modalWrapper} >
          <Text>How much you want to add?</Text>
          <TextInput></TextInput>

          <View>
            <TouchableOpacity onPress={handleOnClose}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOnClose}>
              <Text>Continue</Text>
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
    marginTop: "auto"
  }
});