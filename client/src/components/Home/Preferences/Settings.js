import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import { StyleSheet, View, Text, Button, TextInput, FlatList, SafeAreaView, SectionList } from "react-native";
// import dummyData from "./dummyData/journalData.js";
import { List, ListItem } from "react-native-elements";


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
      <SafeAreaView >
        <List>

          <SectionList
          renderItem={({ item, index, section }) => <Text key={index}>{item}</Text>}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
          )}
          sections={[
            { title: 'Title1', data: ['item1', 'item2'] },
            { title: 'Title2', data: ['item3', 'item4'] },
            { title: 'Title3', data: ['item5', 'item6'] },
          ]}
          keyExtractor={(item, index) => item + index}
          />
        </List>
      </SafeAreaView>
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