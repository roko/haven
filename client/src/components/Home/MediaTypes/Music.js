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
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import MusicHeader from './MusicHeader';
import MusicTrackArt from './MusicTrackArt';
import MusicTrackDetails from './MusicTrackDetails';
import MusicSeekBar from './MusicSeekBar';
import MusicControls from './MusicControls';
import Video from 'react-native-video';

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: true,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
    };
  }

  setDuration(data) {
    // console.log(totalLength);
    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
    //console.log(data);
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    if (this.state.selectedTrack < this.props.tracks.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        isChanging: false,
        selectedTrack: this.state.selectedTrack + 1,
      }), 0);
    }
  }



  render() {
    const track = this.props.tracks[this.state.selectedTrack];
    const video = this.state.isChanging ? null : (
      <Video source={{uri: track.audioUrl}} // Can be a URL or a local file.
        ref="audioElement"
        paused={this.state.paused}               // Pauses playback entirely.
        resizeMode="cover"           // Fill the whole screen at aspect ratio.
        repeat={true}                // Repeat forever.
        onLoadStart={this.loadStart} // Callback when video starts to load
        onLoad={this.setDuration.bind(this)}    // Callback when video loads
        onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        onEnd={this.onEnd}           // Callback when playback finishes
        onError={this.videoError}    // Callback when video cannot be loaded
        style={styles.audioElement} />
    );

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <MusicHeader message="Playing from Your Music" />
        <MusicTrackArt url={track.albumArtUrl} />
        <MusicTrackDetails title={track.title} artist={track.artist} />
        <MusicSeekBar
          onSeek={this.seek.bind(this)}
          trackLength={this.state.totalLength}
          onSlidingStart={() => this.setState({paused: true})}
          currentPosition={this.state.currentPosition} />
        <MusicControls
          onPressRepeat={() => this.setState({repeatOn : !this.state.repeatOn})}
          repeatOn={this.state.repeatOn}
          shuffleOn={this.state.shuffleOn}
          forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
          onPressShuffle={() => this.setState({shuffleOn: !this.state.shuffleOn})}
          onPressPlay={() => this.setState({paused: false})}
          onPressPause={() => this.setState({paused: true})}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
          paused={this.state.paused}/>
        {video}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};


