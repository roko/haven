import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Recorder, Player} from 'react-native-audio-player-recorder-no-linking';
import AudioPlaylistEntry from './AudioPlaylistEntry';
import PLAYLIST from '../../../../assets/sounds/dummy-audio.js';
import Slider from 'react-native-slider';
import { Asset, Audio, Font } from 'expo';
import { Feather, Ionicons } from '@expo/vector-icons';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export default class Music extends Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.playbackInstance = undefined;
    this.state = {
      playlist: PLAYLIST,
      showRecorder: false
    };
  }

  _switchToHome() {
    this.props.navigation.goBack();
  }

  soundRecorderComplete() {

  }

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state.showRecorder)
    return (
      <ImageBackground source={require('../../../../assets/img/gradient-background-image.png')} style={{ width: '100%', height: '100%' }}>
        <View style={styles.homeButtonRow}>
          <TouchableOpacity>
            <Ionicons 
              name="ios-home-outline" 
              size={26}
              color="#ffffff"
              onPress={this._switchToHome}  
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
            { this.state.showRecorder ? (
              <TouchableOpacity onPress={this.setState({ showRecorder: true })}>
                <View style={styles.addRecordingContainer}>
                  <Feather
                    name="play"
                    size={16}
                    color="#ffffff"
                  />
                  <Text style={styles.addRecordingText}>   Add a Voice Message to Your Catalog</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.recorderContainer}>
                <Recorder
                  onComplete={this.soundRecorderComplete.bind(this)}
                  maxDurationMillis={150000}
                  completeButtonText={'Finished'}
                  showDebug={false}
                />
              </View>
            )}
    
          <View style={styles.catalogContainer}>
            {this.state.playlist.map((track, i) =>
              <AudioPlaylistEntry
                key={i + Math.random()} 
                track={this.state.playlist[i]}
                navigate={navigate}
              />
            )}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
  },
  recorderContainer: {
    width: DEVICE_WIDTH,
    height: 30,
  },
  catalogContainer: {
    width: DEVICE_WIDTH, 
    justifyContent: 'space-around',
    // flexDirection: 'column-reverse',
  },
  homeButtonRow: {
    height: 40,
    paddingRight: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  navRow: {
    height: 40,
    width: DEVICE_WIDTH - 15,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  addRecordingContainer: {
    height: 30,
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  addRecordingText: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    color: 'white',
  }
});
