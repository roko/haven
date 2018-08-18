// import React from "react";
// import { AsyncStorage, Audio, Button, Text, StyleSheet, View, StatusBar } from "react-native";
// Expo.Audio.setIsEnabledAsync(true); // audio is enabled by default so we shouldn't need this
// import { MaterialIcons } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';

// // to-dos
// // import npm module that will be used to play and store music
// // add a way for the user to select music to store
// // add the api necessary to store song in database and/or state
// // persist this data so that the same songs are available if user logs out/ closes app


// export default class Music extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       orientationShown: false,
//       // for later use, upon first visit user is given an orientation
//       // so they know how to adds songs to this view
//       song: []
//     };
//   }

//   static navigationOptions = {
//     title: "Your Audio Haven"
//   };

//   playTibetan = async () => {
//     const soundObject = new Expo.Audio.Sound(); 
//     try {
//       await soundObject.loadAsync(require('../../../../assets/sounds/tibetan-singing-bowl.wav'));
//       await soundObject.playAsync();
//       console.log('song load success');
//     } catch (error) {
//       console.log('song load error');
//     }
//   }

//   playWater = async () => {
//     const soundObject = new Expo.Audio.Sound(); 
//     try {
//       await soundObject.loadAsync(require('../../../../assets/sounds/rowing-a-boat.mp3'));
//       await soundObject.playAsync();
//       console.log('song load success');
//     } catch (error) {
//       console.log('song load error');
//     }
//   }

//   playFire = async () => {
//     const soundObject = new Expo.Audio.Sound(); 
//     try {
//       await soundObject.loadAsync(require('../../../../assets/sounds/campfire.mp3'));
//       await soundObject.playAsync();
//       console.log('song load success');
//     } catch (error) {
//       console.log('song load error');
//     }
//   }

//   playBodyScanMeditation = async () => {
//     const soundObject = new Expo.Audio.Sound(); 
//     try {
//       await soundObject.loadAsync(require('../../../../assets/sounds/body-scan-meditation-four-min.mp3'));
//       await soundObject.playAsync();
//       console.log('song load success');
//     } catch (error) {
//       console.log('song load error');
//     }
//   }

//   playBreathingMeditation = async () => {
//     const soundObject = new Expo.Audio.Sound(); 
//     try {
//       await soundObject.loadAsync(require('../../../../assets/sounds/breathing-meditation-three-min.mp3'));
//       await soundObject.playAsync();
//       console.log('song load success');
//     } catch (error) {
//       console.log('song load error');
//     }
//   }

//   render() {
//     return ( 
//       <View style={styles.container}>
//         <MaterialIcons name="play-circle-outline" size={48} color="red" onPress={this.playTibetan} />
//         <Text>Tibetan Singing Bowl</Text>
//         <MaterialIcons name="play-circle-outline" size={48} color="red" onPress={this.playWater} />
//         <Text>Water Flowing</Text>
//         <MaterialIcons name="play-circle-outline" size={48} color="red" onPress={this.playFire} />
//         <Text>Campfire</Text>
//         <MaterialIcons name="play-circle-outline" size={48} color="red" onPress={this.playBreathingMeditation} />
//         <Text>Breathing Meditation (3m)</Text>
//         <MaterialIcons name="play-circle-outline" size={48} color="red" onPress={this.playBodyScanMeditation} />
//         <Text>Body Scan Meditation (4m)</Text>
//         <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }

//   _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate("Auth");
//   };
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

// Pre-MVP player above, experimental Spotify-ish player below


import React, { Component } from 'react';

//import { AsyncStorage, Audio, Button, Text, StyleSheet, View, StatusBar } from "react-native";
import {
  View,
  Text,
} from 'react-native';

export default class Music extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>
          Hello React Native!
        </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
}

