import React from "react";
import { StyleSheet, FlatList, View } from "react-native";

import {
  CardYesNo,
  PollsNavBar,
  CategoriesNavBar,
} from "../components/poll-list";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Constants from "expo-constants";

const polls = [
  {
    id: 1,
    response1: "Yes",
    response2: "No",
    description: "Poll 1",
    graph: require("../assets/images/chart1.png"),
  },
  {
    id: 2,
    response1: "Yes",
    response2: "No",
    description: "Poll 2",
    graph: require("../assets/images/chart2.png"),
  },
  {
    id: 3,
    response1: "Yes",
    response2: "No",
    description: "Poll 3",
    graph: require("../assets/images/chart1.png"),
  },
  {
    id: 4,
    response1: "Yes",
    response2: "No",
    description: "Poll 4",
    graph: require("../assets/images/chart2.png"),
  },
];

function ListingsScreen(props) {
  return (
    //Navbar can be changed dynamically based on need in screen
    <Screen showNavBar={true} navBar={<PollsNavBar />} style={styles.screen}>
      <CategoriesNavBar />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            paddingBottom: "20%",
            paddingTop: Constants.statusBarHeight + 10,
          }}
          showsVerticalScrollIndicator={false}
          data={polls}
          keyExtractor={(poll) => poll.id.toString()}
          renderItem={({ item }) => (
            <CardYesNo
              graph={item.graph}
              response1={item.response1}
              response2={item.response2}
              voted={false}
              description={item.description}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
export default ListingsScreen;
