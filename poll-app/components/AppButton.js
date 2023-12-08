import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import defaultStyles from "../config/styles";

function AppButton({ text, onPress, color, style }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style[0],
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, style[1]]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: defaultStyles.colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: defaultStyles.colors.white,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
