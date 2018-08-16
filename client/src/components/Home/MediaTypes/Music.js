import React from "react";
import { AsyncStorage, Audio, Button, Text, StyleSheet, View, StatusBar } from "react-native";
Expo.Audio.setIsEnabledAsync(true); // audio is enabled by default so we shouldn't need this
import { MaterialIcons } from '@expo/vector-icons';

// to-dos
// import npm module that will be used to play and store music
// add a way for the user to select music to store
// add the api necessary to store song in database and/or state
// persist this data so that the same songs are available if user logs out/ closes app


export default class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orientationShown: false,
      // for later use, upon first visit user is given an orientation
      // so they know how to adds songs to this view
      song: []
    };
  }

  static navigationOptions = {
    title: "Music Title"
  };

  componentDidMount() {
    this.playSomething();
  }

  playSomething = async () => {
    const soundObject = new Expo.Audio.Sound(); 
    try {
      await soundObject.loadAsync(require('../../../../assets/sounds/rowing-a-boat.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
      console.log('song load success');
    } catch (error) {
      // An error occurred!
      console.log('song load error');
    }
  }

  render() {
    return ( 
      <View style={styles.container}>
        <Text>Testing hot loader one two</Text>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});