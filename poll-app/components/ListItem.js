import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import defaultStyles from "../config/styles";

function ListItem({
  title,
  subTitle,
  image,
  onPress,
  renderRightActions,
  IconComponent,
  showChevron,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight
        onPress={onPress}
        underlayColor={defaultStyles.colors.light}
      >
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title} numberOfLines={100}>
              {title}
            </AppText>
            {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
          </View>
          {showChevron && (
            <MaterialCommunityIcons
              style={{ alignSelf: "center" }}
              name="chevron-right"
              size={20}
              color={defaultStyles.colors.medium}
            />
          )}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    padding: 15,
    flex: 1,
    backgroundColor: defaultStyles.colors.white,
  },
  detailsContainer: {
    justifyContent: "center",
    marginLeft: 10,
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  subTitle: {
    color: defaultStyles.colors.medium,
    fontSize: 15,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
