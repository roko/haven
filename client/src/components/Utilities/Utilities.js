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
        <Button title="Onboarding Button" onPress={()=>{}}/>
        <Button title="Tool 1 Button" onPress={()=>{}}/>
        <Button title="Tool 2 Button" onPress={()=>{}}/>
        <Button title="Tool 3 Button" onPress={()=>{}}/>
        <Button title="Tool 4 Button" onPress={()=>{}}/>
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