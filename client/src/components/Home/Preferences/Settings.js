import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import { StyleSheet, View, Text, Button, TextInput, FlatList } from "react-native";
// import dummyData from "./dummyData/journalData.js";
// import { List, ListItem } from "react-native-elements";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});


class SettingsMain extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Settings"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Settings go test
          </Text>
      </View>
    )
  }
}



export default Settings = createStackNavigator(
  {
    SettingsMain
  },
  {
    initialRouteName: "SettingsMain"
  }
);