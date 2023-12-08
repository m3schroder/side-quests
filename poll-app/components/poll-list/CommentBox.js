import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../AppText";
import AppButton from "../AppButton";
import CommentSubmission from "./CommentSubmission";
import CommentThread from "./CommentThread";

function CommentModal(props) {
  const [comment, setCommented] = useState(null);
  const [form, setForm] = useState(false);
  const [viewable, setViewable] = useState(false);
  const [visible, setVisible] = useState(false);

  function startComment() {
    setCommented(false);
    setForm(true);
  }

  function closeForm(answer) {
    setForm(!answer);
    setViewable(answer);
  }

  function noComment() {
    setCommented(false);
    setViewable(true);
  }

  return (
    <View style={styles.container}>
      {comment === null && (
        <View>
          <AppText style={styles.text}>Would you like to comment?</AppText>
          <View style={styles.detailsContainer}>
            <AppButton
              style={styles.button}
              text="Yes"
              color="secondary"
              onPress={startComment}
            />
            <AppButton
              style={styles.button}
              text="No"
              color="primary"
              onPress={noComment}
            />
          </View>
        </View>
      )}
      {form && <CommentSubmission closeModal={closeForm} />}
      {viewable && (
        <AppButton
          style={styles.commentsButton}
          text="View Comments"
          onPress={() => setVisible(true)}
          color="secondary"
        />
      )}
      {visible && <CommentThread visible={visible} setVisible={setVisible} />}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "45%",
    height: 30,
    margin: 5,
  },
  commentsButton: {
    margin: 5,
    height: 30,
    width: "80%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
export default CommentModal;
