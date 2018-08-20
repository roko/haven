import React, { Component } from 'react';
import {AsyncStorage, Button, View, StyleSheet, Text} from 'react-native';
import Expo from "expo";

export default class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = { signedIn: false, name: "", photoUrl: "" }
  }

  login = () => {
    this.props.navigation.navigate("App");
  }

  loginAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
  }

/**
 * 
 * This uses expo. 
 * {@link https://docs.expo.io/versions/v29.0.0/sdk/facebook}
 * TODO: abstract out sensitive information, app id, etc.
 * 
 * There are other ways to authenticate, this is one.
 * 
 * Important considerations:
 *  data flow within the app,
 *  what info does the app access?
 */

  signInWithFaceBook = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1536280386518398', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
        console.log(
          'Logged in!',
          `Hi ${(await response.json()).name}!`,
      );
      this.setState({fb: response, signedIn: true})
      //console.log(this.state)
      this.props.navigation.navigate("App", this.state);
    }
  }


/**
 * 
 * This uses expo. 
 * {@link https://docs.expo.io/versions/v29.0.0/sdk/google}
 * TODO: abstract out sensitive information, app id, etc.
 * 
 * There are other ways to authenticate, this is one. 
 * Important considerations: 
 *  data flow within the app,
 *  what info does the app access?
 */
  
  signInWithGoogle = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '', //fill this in for android
        iosClientId: '219416284006-qkusha6eacbqh6eksqqng2o94vc6uagd.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        }, () => {
          console.log(result.accessToken)
          this.props.navigation.navigate("App", this.state);
        });
        //return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    return <View style={styles.container}>
        <Text> This will have a splash page, maybe a signin button?</Text>
        <Button title="This is the Google login button" onPress={this.signInWithGoogle} />
        <Button title="This is the regular login button" onPress={this.login} />
        <Button title="This is the AsyncStorage login button" onPress={this.loginAsync} />
        <Button title="This is the Facebook login button" onPress={this.signInWithFaceBook} />
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});