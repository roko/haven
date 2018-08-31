import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Slider,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioPlaylistEntry from './AudioPlaylistEntry';
import PLAYLIST from '../../../../assets/sounds/dummy-audio.js';
import sliderThumb from '../../../../assets/img/thumb-slider.png';

import { Asset, Audio, Font } from 'expo';
import { 
  Feather,
  Ionicons, 
  MaterialIcons,
  MaterialCommunityIcons 
} from '@expo/vector-icons';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const ICON_SIZE = 32;

export default class Music extends Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.playbackInstance = undefined;
    this.state = {
      playlist: PLAYLIST,
      recordStatus: 'NOT_RECORDING',
      showRecorder: false,
      showSaveRecordingForm: false,
      showNewAudio: false,
      newAudioText: undefined,
      saveNewAudioText: 'New Recording',
      sliderPosition: 0,
    };

    this.onStopRecordingPress.bind(this);
    this.onStartRecordingPress.bind(this);
    this.onSaveRecordingPress.bind(this);
    this.addAudioMessage.bind(this);
    this.hideRecorder.bind(this);
    this._switchToHome.bind(this);
  }
  
  static navigationOptions = {
    header: null,
  };

  componentDidUpdate(previousProps, previousState) { 
  }

  _switchToHome() {
    this.props.navigation.goBack();
  }

  addAudioMessage() {
    this.setState({
      showRecorder: true
    });
  }

  hideRecorder() {
    this.setState({
      showRecorder: false
    });
  }

  onStartRecordingPress = () => {
    this.setState({
      recordStatus: 'RECORDING'
    });
    let position = 0;
      setInterval(() => {
        let run = this.state.recordStatus === 'RECORDING'
        if (run) {
          this.setState({
            sliderPosition: position++
          });
        } else {
          position = 0;
          this.setState({
            sliderPosition: 0
          });
        }
      }, 100);

  };

  onStopRecordingPress = () => {
    this.setState({
      recordStatus: 'NOT_RECORDING',
      showSaveRecordingForm: true,
      sliderPosition: 0

    });
  };

  onSaveRecordingPress = (text) => {
    this.setState({
      showNewAudio: true,
      newAudioText: text,
      showSaveRecordingForm: false
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
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

        {/* <MaterialCommunityIcons 
            name="home-outline" 
            size={30}
            color="#ffffff"
            onPress={() => this.props.navigation.navigate("Home")}
          /> */}
        
        <View style={styles.mainContainer}>
          
          <TouchableOpacity>
            <View style={styles.addRecordingContainer}>
              <Text style={styles.addRecordingText}>Add a Voice Message</Text>
              {this.state.showRecorder ? (
                <Feather
                  name="chevron-up"
                  size={28}
                  color="#ffffff"
                  onPress={() => this.hideRecorder()}
                />
              ) : (  
                <Ionicons
                  name="md-add"
                  size={28}
                  color="#ffffff"
                  onPress={() => this.addAudioMessage()}
                />
              )}
            </View> 
          </TouchableOpacity>

          <View style={styles.micAndSliderPane}>   
            {this.state.showRecorder && this.state.recordStatus === 'RECORDING' ? (
              <Feather
                name="stop-circle" 
                color="white" 
                size={ICON_SIZE} 
                onPress={this.onStopRecordingPress}
              />
            ) : null}

            {this.state.showRecorder && this.state.recordStatus === 'NOT_RECORDING' ? (
              <Feather 
                name="mic" 
                color="white" 
                size={ICON_SIZE} 
                onPress={this.onStartRecordingPress}
              />
            ) : null}

            {this.state.showRecorder ? (
              <View style={styles.sliderContainer}> 
                <Slider
                  value={this.state.sliderPosition}
                  minimimValue={0}
                  maximumValue={500}
                  step={1}
                  thumbImage={sliderThumb}
                  thumbTintColor="white"
                  minimumTrackTintColor="white"
                  maximumTrackTintColor="white"
                />
              </View>  
            ) : null} 
          </View>  

          {this.state.showSaveRecordingForm ? (
            <View style={styles.saveRecordingContainer}>
              <TextInput style={styles.addRecordingText}
                placeholderTextColor='rgba(255,255,255, 0.3)'
                onChangeText={(text) => this.setState({saveNewAudioText: text})}
                value={this.state.saveNewAudioText}
              />
              <MaterialIcons style={styles.checkmark}
                name="done" 
                color="white" 
                size={ICON_SIZE} 
                onPress={() => this.onSaveRecordingPress(this.state.saveNewAudioText)} // this will have to trigger adding the Audio to the Playlist
              />
            </View>
          ): null}
        
          <View  style={styles.catalogContainer}>
            {this.state.showNewAudio ? (
              <View style={styles.trackContainer}>
                <Feather
                  name="play"
                  size={16}
                  color="#ffffff"
                />
                <Text style={styles.trackText}>   {this.state.newAudioText}</Text>
              </View>
            ) : null }

            {this.state.playlist.map((track, i) =>
              <AudioPlaylistEntry
                key={i + Math.random()} 
                track={this.state.playlist[i]}
                index={i}
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
    width: DEVICE_WIDTH - 15,
    height: 30,
    paddingLeft: 20,
    marginBottom: 100,
  },
  catalogContainer: {
    marginTop: 18,
    width: DEVICE_WIDTH, 
    justifyContent: 'space-around',
    // flexDirection: 'column-reverse',
  },
  homeButtonRow: {
    height: 40,
    paddingRight: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 45,
  },
  navRow: {
    height: 40,
    paddingRight: 15,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  addRecordingContainer: {
    marginLeft: 80,
    width: DEVICE_WIDTH - 160,
    marginTop: 60,
    marginBottom: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  addRecordingText: {
    fontFamily: 'Avenir-Medium',
    fontSize: 18,
    color: 'white',
  },
  saveRecordingContainer: {
    height: 35,
    marginLeft: 100,
    width: DEVICE_WIDTH - 200,
    paddingTop: 7,
    marginBottom: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  trackContainer: {
    height: 40,
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  trackText: {
    fontFamily: 'Avenir-Medium',
    fontSize: 18,
    color: 'white',
  },
  micAndSliderPane: {
   justifyContent: 'flex-start',
   flexDirection: 'row',
   paddingLeft: 20, 
  },
  sliderContainer: {
    flex: 1,    
    marginLeft: 10,
    marginRight: 25,
    justifyContent: 'center',
    paddingBottom: 9,
  },
  recorderSlider: {
    width: DEVICE_WIDTH - 110,
  },
  sliderTrack: {
    height: 2,
    borderRadius: 1,
    backgroundColor: 'white',
  },
  checkmark: {
    paddingBottom: 35,
  },
});