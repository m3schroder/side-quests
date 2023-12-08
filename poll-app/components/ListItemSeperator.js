import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";

function ListItemSeperator({ height }) {
  return <View style={[styles.seperator, { borderWidth: height }]} />;
}

const styles = StyleSheet.create({
  seperator: {
    width: "100%",
    height: 2,
    borderWidth: 1,
    borderColor: colors.light,
    backgroundColor: colors.light,
  },
});
export default ListItemSeperator;
