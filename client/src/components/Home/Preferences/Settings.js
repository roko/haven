import React from "react";
import { StyleSheet, View, Text, TextInput, FlatList } from "react-native";
// import dummyData from "./dummyData/journalData.js";
// import { List, ListItem } from "react-native-elements";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Settings go here
          </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});