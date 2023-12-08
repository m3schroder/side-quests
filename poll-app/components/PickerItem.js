import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";

function PickerItem({ label, onPress, icon, iconColor }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
        <MaterialCommunityIcons name={icon} color="white" size={40} />
      </View>
      <AppText style={styles.text}>{label}</AppText>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  text: {
    flexWrap: "wrap",
  },
  container: {
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 30,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default PickerItem;
