import React from "react";
import { View, TouchableHighlight, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function Icon({
  iconName,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons name={iconName} color="white" size={size * 0.5} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Icon;
