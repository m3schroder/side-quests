import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";

import defaultStyles from "../../config/styles";
import AppButton from "../AppButton";
import AppText from "../AppText";
import CommentBox from "./CommentBox";

function Card({
  response1,
  response2,
  graph,
  description,
  comments,
  commented,
}) {
  const [voted, setVoted] = useState(false);
  return (
    <View style={styles.card}>
      <AppText style={styles.text}>{description}</AppText>
      <Image style={styles.graph} source={graph} />
      {!voted && (
        <View style={styles.detailsContainer}>
          <AppButton
            style={styles.button}
            text={response1}
            color="secondary"
            onPress={() => setVoted(true)}
          />
          <AppButton
            style={styles.button}
            text={response2}
            color="primary"
            onPress={() => setVoted(true)}
          />
        </View>
      )}
      {voted && <CommentBox />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: defaultStyles.colors.white,
    borderWidth: 1,
    borderColor: defaultStyles.colors.transparent,
    marginBottom: 25,
    overflow: "hidden",
    elevation: 4,
  },
  detailsContainer: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  graph: {
    width: "100%",
    height: 250,
  },
  button: {
    width: "45%",
    height: 20,
    margin: 5,
  },
  text: {
    padding: 10,
    textAlign: "center",
  },
});

export default Card;
