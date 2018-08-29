import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import { StyleSheet, View, Text, Button, TextInput, FlatList, SafeAreaView, SectionList, TouchableOpacity } from "react-native";
// import dummyData from "./dummyData/journalData.js";
import { List, ListItem } from "react-native-elements";
import EditSettings from './EditSettings';

class SettingsMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'default'
    }
    this.changeView = this.changeView.bind(this);
  }

  static navigationOptions = {
    title: "Settings"
  };

  //have an edit button
  //in the edit Settings component have a save button
  //send the updated prefs to db as a patch req
  changeView(newView) {
    this.setState({
      view: newView
    })
    console.log('currentview', this.state.view)
  }

  render() {
    if (this.state.view === 'default') {
      return (
        <View>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { this.changeView('edit') }}
              >
              <Text style={styles.text}>Update Haven Color</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: 'white'}}>
            <Text style={{ fontWeight: 'bold' }}> Haven color
            </Text>
            <Text> green
            </Text>
          </View>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { this.changeView('edit') }}
              >
              <Text style={styles.text}>Change Settings</Text>
            </TouchableOpacity>
          </View>

          <SafeAreaView >
            <List>

              <SectionList
              renderItem={({ item, index, section }) => <Text key={index}>{item}</Text>}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={{ fontWeight: 'bold' }}>{title}</Text>
              )}
              sections={[
                { title: 'Name', data: ['Bob'] },
                { title: 'Media Types', data: ['PhotoVideo', 'Music', 'Journal'] },
                { title: 'Interests', data: ['hiking', 'vintage cars', 'bowling'] },
                { title: 'Discoverable', data: ['true'] },
                { title: 'Journal Entries for Moral Support', data: '5' },
                { title: 'Moral Support Message', data: ['feeling down, drop me a line'] }
              ]}
              keyExtractor={(item, index) => item + index}
              />
            </List>
          </SafeAreaView>

        </View>
      )
    }

    if (this.state.view === 'edit') {
      return (
        <EditSettings changeView={this.changeView.bind(this)}/>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgb(26,201,141)',
    borderRadius: 10,
    borderWidth: 1
  }
});

export default Settings = createStackNavigator(
  {
    SettingsMain
  },
  {
    initialRouteName: "SettingsMain"
  }
);