import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import { StyleSheet, View, Text, Button, TextInput, FlatList, SafeAreaView, SectionList, TouchableOpacity, AsyncStorage, ImageBackground} from "react-native";
// import dummyData from "./dummyData/journalData.js";
import { List, ListItem } from "react-native-elements";
import {
  MaterialCommunityIcons
} from '@expo/vector-icons';
import EditSettings from './EditSettings';

class SettingsMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'default',
      color: 'rgb(26,201,141)'
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

  //update this later so the colorcode is also sent to usertable in db which the gets all the menu/other components to have the updated color
  updateColor (newColor) {
    this.setState({
      color: newColor
    })
  }

  _signOutAsync = async () => {
    await AsyncStorage.removeItem("userToken");
    this.props.navigation.navigate("Auth");
  };

  render() {
    if (this.state.view === 'default') {
      return (
        <View>
          <ImageBackground source={require('../../../../assets/img/gradient-background-image.png')} style={{ width: '100%', height: '100%' }}>
            <View style={styles.homeButtonRow}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="home-outline"
                size={30}
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}
              />
            </TouchableOpacity>
          </View>
            <View style={styles.container}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: this.state.color }
                ]}
                onPress={() => { this.changeView('edit') }}
                >
                <Text style={styles.text}>Update Haven Color</Text>
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: 'white'}}>
              <Text style={{ fontWeight: 'bold' }}> Haven color
              </Text>
              <TouchableOpacity
                style={[
                  styles.colorPreview,
                  { backgroundColor: this.state.color }
                ]}
              >
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <TouchableOpacity
                style={[
                  styles.button,
                ]}
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
                ]}
                keyExtractor={(item, index) => item + index}
                />
              </List>
            </SafeAreaView>
            <Button title="Log Out" onPress={this._signOutAsync}/>
          </ImageBackground>
        </View>
      )
    }

    if (this.state.view === 'edit') {
      return (
        <EditSettings updateColor={this.updateColor.bind(this)} changeView={this.changeView.bind(this)}/>
      )
    }
  }
}

const styleObject = {
  button: {
  alignItems: 'center',
  marginRight: 40,
  marginLeft: 40,
  marginTop: 10,
  padding: 10,
  paddingTop: 10,
  paddingBottom: 10,
  borderRadius: 10,
  borderWidth: 1
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    alignItems: "center",
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  colorPreview: {
    marginLeft: 12,
    marginTop: 12,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.25
  },
  homeButtonRow: {
    height: 40,
    paddingRight: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 45,
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