import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  View,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import * as Yup from "yup";

import defaultStyles from "../../config/styles";
import { AppForm, AppFormField, SubmitButton } from "../forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  comment: Yup.string().required().max(250).label("Comment"),
});

function CommentSubmission(closeModal) {
  const [visible, setVisible] = useState(visible);

  function close() {
    closeModal.closeModal(true);
    setVisible(false);
  }

  return (
    <Modal visible={visible} transparent={true} style={{ flex: 1 }}>
      {Platform.OS === "android" ? (
        <StatusBar
          translucent
          backgroundColor={defaultStyles.colors.transparent}
        />
      ) : null}
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <AppForm
            initialValues={{ name: "", comment: "" }}
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCapitalize="true"
              multiline={false}
              autoCorrect={true}
              icon="account"
              name="name"
              placeholder="Name"
              textContentType="name"
            />
            <AppFormField
              autoCapitalize="true"
              autoCorrect={true}
              icon="chat"
              name="comment"
              placeholder="Comment"
              style={styles.comment}
            />
            <SubmitButton
              style={styles.submit}
              title="Submit"
              color="secondary"
              additionalFunc={close}
            />
          </AppForm>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: defaultStyles.colors.white,
    borderColor: defaultStyles.colors.transparent,
    borderWidth: 1,
    width: "100%",
    borderRadius: 25,
    flexWrap: "wrap",
    padding: 10,
  },
  comment: {
    paddingRight: 35,
  },
  submit: {
    width: "40%",
    alignSelf: "center",
  },
});

export default CommentSubmission;
