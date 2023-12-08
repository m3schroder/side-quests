import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  StatusBar,
} from "react-native";

import defaultStyles from "../config/styles";

function Screen({ children, style, showNavBar, navBar }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {Platform.OS === "android" ? (
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="rgba(254,254,254,0.2)"
        />
      ) : null}
      <View style={style}>{children}</View>
      {showNavBar && navBar}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Screen;
