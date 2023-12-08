import React, { useState } from "react";
import {
  View,
  Modal,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";

import ListItemSeperator from "../ListItemSeperator";
import ListItem from "../ListItem";
import AppButton from "../AppButton";
import defaultStyles from "../../config/styles";

const initialComments = [
  {
    id: 1,
    commenter: "Matt",
    comment:
      "This app seems to be coming together alright, I just am not sure what to do from here you know?",
  },
  {
    id: 2,
    commenter: "Adam",
    comment:
      "Using and setting up an API seems pretty nerve wracking. I hope Mosh's tutorial will help me get through that portion. Also hope it doesnt cost too much.",
  },
];

function CommentThread({ visible, setVisible }) {
  const [comments, setComments] = useState(initialComments);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <Modal visible={visible} transparent={true} style={{ flex: 1 }}>
      {Platform.OS === "android" ? (
        <StatusBar
          translucent
          backgroundColor={defaultStyles.colors.transparent}
        />
      ) : null}
      <View style={styles.container}>
        <View style={styles.elementView}>
          <AppButton
            style={styles.close}
            text="Close"
            onPress={() => setVisible(false)}
            color="primary"
          />
          <FlatList
            data={comments}
            keyExtractor={(comments) => comments.id.toString()}
            renderItem={({ item }) => (
              <ListItem
                showChevron={false}
                title={item.commenter}
                subTitle={item.comment}
                onPress={() => console.log("Comment Selected", item)}
              />
            )}
            ItemSeparatorComponent={ListItemSeperator}
            refreshing={refreshing}
            onRefresh={() => {
              setComments([
                {
                  id: 1,
                  comment: "Refreshed",
                },
              ]);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  elementView: {
    borderColor: defaultStyles.colors.medium,
    borderWidth: 2,
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 25,
    width: "95%",
    height: "90%",
  },
  close: {
    alignSelf: "center",
    width: "20%",
  },
});
export default CommentThread;
