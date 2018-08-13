import React, { Component } from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';

export default class LoginScreen extends Component {

  login = () => {
    this.props.navigation.navigate("App");
  }

  loginAsync = async () => {
                             await console.log("placeholder for await function");
                             //await AsyncStorage.setItem("userToken", "abc");
                           }

  render() {
    return (
      <View style={styles.container}>
        <Text> This will have a splash page, maybe a signin button?</Text>
        <Button title="This is the login button" onPress={this.login} />
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