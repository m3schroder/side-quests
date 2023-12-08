import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Modal,
  Button,
  FlatList,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import Screen from "./Screen";
import PickerItem from "./PickerItem";

function AppPicker({
  icon,
  placeholder,
  items,
  onSelectItem,
  selectedItem,
  barWidth,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, barWidth]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen style={styles.modalContainer}>
          <Button
            style={styles.modalClose}
            title="close"
            onPress={() => setModalVisible(false)}
          />
          <FlatList
            style={styles.flatlist}
            data={items}
            numColumns={3}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItem
                label={item.label}
                icon={item.icon}
                iconColor={item.color}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  flatlist: {
    flexDirection: "row",
  },
  modalClose: {
    fontSize: 50,
    fontWeight: "bold",
  },
  modalContainer: {
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
    marginTop: 4,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});
export default AppPicker;
