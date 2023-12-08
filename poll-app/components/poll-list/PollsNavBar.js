import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import defaultStyles from "../../config/styles";
import IconButton from "../IconButton";

function PollsNavBar(props) {
  return (
    <View style={styles.container}>
      <IconButton iconName={"account"} onPress={() => console.log("icon1")} />
      <IconButton
        iconName={"application"}
        onPress={() => console.log("icon2")}
      />
      <IconButton
        iconName={"chart-bubble"}
        onPress={() => console.log("icon3")}
      />
      <IconButton iconName={"chat"} onPress={() => console.log("icon4")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "7%",
    width: "98%",
    position: "absolute",
    bottom: 0,
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: defaultStyles.colors.medium,
    elevation: 5,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
export default PollsNavBar;
