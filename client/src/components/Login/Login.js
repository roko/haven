import React, { Component } from 'react';
import {AsyncStorage, View, StyleSheet, Text, ImageBackground} from 'react-native';
import Expo from "expo";
import {SocialIcon, Button} from "react-native-elements";


export default class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = { signedIn: false, name: "", photoUrl: "" }
  }
  static navigationOptions = {
    title: "todo: get rid of this bar",
    header: null,
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
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      //console.log('Logged in!', `Hi ${(await response.json())}!`);
      this.setState({fb: response.json(), signedIn: true},() =>{
        console.log(this.state)
      })
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
    return (
      <ImageBackground source={require('./assets/splash.png')} style={{ width: '100%', height: '100%' }}>


        <View style={styles.buttons}>
          <Button title="Google" onPress={this.signInWithGoogle} />
          <Button title="Shortcut login" onPress={this.login} />
          <Button title="AsyncStorage login" onPress={this.loginAsync} />
          <Button title="Facebook" onPress={this.signInWithFaceBook} />
          <SocialIcon
            title='Sign In With Facebook'
            button onPress={this.signInWithFaceBook}
            type='facebook'
          />
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({

  //todo make this not crappy
  buttons: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    bottom: 0,
    left: 120
  },

});