import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../components/Icon";
import defaultStyles from "../config/styles";

function IconButton({
  onPress,
  iconColor,
  backgroundColor,
  iconSize,
  style,
  iconName,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style, { backgroundColor: { backgroundColor } }]}
    >
      <Icon iconName={iconName} iconColor={iconColor} size={iconSize} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: defaultStyles.colors.white,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
export default IconButton;
