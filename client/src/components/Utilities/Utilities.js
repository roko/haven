import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import {createStackNavigator} from 'react-navigation';

//replace this with a stack navigator
//add tutorial

export class UtilitiesMain extends Component {

  static navigationOptions = {
    title: "Utilities"
  };

  render() {
    return (
      <View>
        <Text> Utilities Component </Text>
        <Button title="Onboarding Button" onPress={()=>{}}/>
      </View>
    )
  }
}

export default Utilities = createStackNavigator(
  {
    UtilitiesMain
  },
  {
    initialRouteName: "UtilitiesMain"
  }
);