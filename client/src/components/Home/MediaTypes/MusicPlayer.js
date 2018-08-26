import React, { Component } from 'react';
import {
	Dimensions,
  Image,
  ImageBackground,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
import Slider from 'react-native-slider'; 
import { Asset, Audio, Font } from 'expo';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';

class PlaylistItem {
	constructor(name, uri, image) {
		this.name = name;
		this.uri = uri;
		this.image = image;
	}
}

const PLAYLIST = [
	new PlaylistItem(
		'Comfort Fit - “Sorry”',
		'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
		'https://images.shazam.com/coverart/t55537491-b955650891_s400.jpg'
	),
	new PlaylistItem(
		'Mildred Bailey – “All Of Me”',
		'https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3',
		'https://tinyurl.com/y9u8e437'
	),
	new PlaylistItem(
		'Podington Bear - “Rubber Robot”',
		'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3',
		'https://cdn-img.jamendo.com/albums/s166/166372/covers/1.300.jpg?du=1529657778'
	),
];

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
// const BACKGROUND_COLOR = 'rgb(26,201,141)';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = 'Loading...';
const BUFFERING_STRING = 'Buffering...';
const RATE_SCALE = 3.0;

export default class MusicPlayer extends Component {
	constructor(props) {
		super(props);
		this.index = 0;
		this.isSeeking = false;
		this.shouldPlayAtEndOfSeek = false;
		this.playbackInstance = undefined;
		this.state = {
			playbackInstanceName: LOADING_STRING,
			playbackInstancePosition: undefined,
			playbackInstanceDuration: undefined,
			shouldPlay: false,
			isPlaying: false,
			isBuffering: false,
			isLoading: true,
			fontLoaded: false,
			volume: 1.0,
			rate: 1.0,
			portrait: undefined,
		};
	}

	componentDidMount() {
		Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
		});
		(async () => {
			await Font.loadAsync({
				roboto: require('../../../../assets/fonts/Roboto.ttf'),
			});
			this.setState({ fontLoaded: true });
		})();

		this._loadNewPlaybackInstance(false);
	}

	async _loadNewPlaybackInstance(playing) {
		if (this.playbackInstance != null) {
			await this.playbackInstance.unloadAsync();
			this.playbackInstance.setOnPlaybackStatusUpdate(null);
			this.playbackInstance = null;
		}

		const source = { uri: PLAYLIST[this.index].uri };
		const initialStatus = {
			shouldPlay: playing,
			rate: this.state.rate,
			volume: this.state.volume,
		};

		const { sound, status } = await Audio.Sound.create(
			source,
			initialStatus,
			this._onPlaybackStatusUpdate
		);
		this.playbackInstance = sound;

		this._updateScreenForLoading(false);
	}

	_updateScreenForLoading(isLoading) {
		if (isLoading) {
			this.setState({
				isPlaying: false,
				playbackInstanceName: LOADING_STRING,
				playbackInstanceDuration: null,
				playbackInstancePosition: null,
				isLoading: true,
			});
		} else {
			this.setState({
				playbackInstanceName: PLAYLIST[this.index].name,
				portrait: PLAYLIST[this.index].image,
				isLoading: false,
			});
		}
	}

	_onPlaybackStatusUpdate = status => {
		if (status.isLoaded) {
			this.setState({
				playbackInstancePosition: status.positionMillis,
				playbackInstanceDuration: status.durationMillis,
				shouldPlay: status.shouldPlay,
				isPlaying: status.isPlaying,
				isBuffering: status.isBuffering,
				rate: status.rate,
				volume: status.volume,
			});
			if (status.didJustFinish) {
				this._advanceIndex(true); 
				this._updatePlaybackInstanceForIndex(true);
			}
		} else {
			if (status.error) {
				console.log(`FATAL PLAYER ERROR: ${status.error}`);
			}
		}
	};

	_advanceIndex(forward) {
		this.index =
			(this.index + (forward ? 1 : PLAYLIST.length - 1)) %
			PLAYLIST.length;
	}

	async _updatePlaybackInstanceForIndex(playing) {
		this._updateScreenForLoading(true);

		this._loadNewPlaybackInstance(playing);
	}

	_onPlayPausePressed = () => {
		if (this.playbackInstance != null) {
			if (this.state.isPlaying) {
				this.playbackInstance.pauseAsync();
			} else {
				this.playbackInstance.playAsync();
			}
		}
	};

	_onStopPressed = () => {
		if (this.playbackInstance != null) {
			this.playbackInstance.stopAsync();
		}
	};

	_onForwardPressed = () => {
		if (this.playbackInstance != null) {
			this._advanceIndex(true);
			this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
		}
	};

	_onBackPressed = () => {
		if (this.playbackInstance != null) {
			this._advanceIndex(false);
			this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
		}
	};

	_onVolumeSliderValueChange = value => {
		if (this.playbackInstance != null) {
			this.playbackInstance.setVolumeAsync(value);
		}
	};

	_trySetRate = async rate => {
		if (this.playbackInstance != null) {
			try {
				await this.playbackInstance.setRateAsync(rate);
			} catch (error) {
				// Rate changing could not be performed, possibly because the client's Android API is too old.
			}
		}
	};

	_onRateSliderSlidingComplete = async value => {
		this._trySetRate(value * RATE_SCALE);
	};

	_onSeekSliderValueChange = value => {
		if (this.playbackInstance != null && !this.isSeeking) {
			this.isSeeking = true;
			this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
			this.playbackInstance.pauseAsync();
		}
	};

	_onSeekSliderSlidingComplete = async value => {
		if (this.playbackInstance != null) {
			this.isSeeking = false;
			const seekPosition = value * this.state.playbackInstanceDuration;
			if (this.shouldPlayAtEndOfSeek) {
				this.playbackInstance.playFromPositionAsync(seekPosition);
			} else {
				this.playbackInstance.setPositionAsync(seekPosition);
			}
		}
	};

	_getSeekSliderPosition() {
		if (
			this.playbackInstance != null &&
			this.state.playbackInstancePosition != null &&
			this.state.playbackInstanceDuration != null
		) {
			return (
				this.state.playbackInstancePosition /
				this.state.playbackInstanceDuration
			);
		}
		return 0;
	}

	_getMMSSFromMillis(millis) {
		const totalSeconds = millis / 1000;
		const seconds = Math.floor(totalSeconds % 60);
		const minutes = Math.floor(totalSeconds / 60);

		const padWithZero = number => {
			const string = number.toString();
			if (number < 10) {
				return '0' + string;
			}
			return string;
		};
		return padWithZero(minutes) + ':' + padWithZero(seconds);
	}

	_getTimestamp() {
		if (
			this.playbackInstance != null &&
			this.state.playbackInstancePosition != null &&
			this.state.playbackInstanceDuration != null
		) {
			return `${this._getMMSSFromMillis(
				this.state.playbackInstancePosition
			)} / ${this._getMMSSFromMillis(
				this.state.playbackInstanceDuration
			)}`;
		}
		return '';
	}

	render() {
		return !this.state.fontLoaded ? (
			<View />
		) : (
      <ImageBackground source={require('../../../../assets/img/gradient-background-image.png')} style={{ width: '100%', height: '100%' }}>
        <View style={styles.navRow}>
          {/* this and the associated style should be extracted to a component for reuse */}
          <Ionicons 
            name="ios-arrow-round-back-outline" 
            size={30}
            color="#ffffff"
          />
          <Ionicons 
            name="ios-home-outline" 
            size={26}
            color="#ffffff"
            onPress={this._switchToHome}
          />
        </View>
			<View style={styles.container}>
				<View style={styles.portraitContainer}>
					<Image
						style={styles.portrait}
						source={{
							uri: this.state.portrait,
						}}
					/>
				</View>
				<View style={styles.detailsContainer}>
					<Text> 
						{this.state.playbackInstanceName}
					</Text>
					<Text>
						{this.state.isBuffering ? (
							BUFFERING_STRING
						) : (
							this._getTimestamp()
						)}
					</Text>
				</View>
				<View
					style={[
						styles.buttonsContainerBase,
						styles.buttonsContainerTopRow,
						{
							opacity: this.state.isLoading
								? DISABLED_OPACITY
								: 1.0,
						},
					]}
				>
					<TouchableHighlight
						// underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={this._onBackPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<Feather
								name="skip-back"
								size={40}
								color="#ffffff"
							/>
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						// underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={this._onPlayPausePressed}
						disabled={this.state.isLoading}
					>
						<View>
							{this.state.isPlaying ? (
								<Feather
									name="pause"
									size={60}
									color="#ffffff"
								/>
							) : (
								<Feather
									name="play"
									size={60}
									color="#ffffff"
								/>
							)}
						</View>
					</TouchableHighlight>
					{/* <TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={this._onStopPressed}
						disabled={this.state.isLoading}
					>
						<View> // DON'T THINK I WANT A STOP CIRCLE BUT KEEPING IT COMMENTED IN CASE REMOVING IT BREAKS SOMETHING I DONT' YET UNDERSTAND
							<Feather
								name="stop-circle"
								size={40}
								color="#ffffff"
							/>
						</View>
					</TouchableHighlight> */}
					<TouchableHighlight
						// underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={this._onForwardPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<Feather
								name="skip-forward"
								size={40}
								color="#ffffff"
							/>
						</View>
					</TouchableHighlight>
				</View>
				<View
					style={[
						styles.playbackContainer,
						{
							opacity: this.state.isLoading
								? DISABLED_OPACITY
								: 1.0,
						},
					]}
				>
					<Slider
						style={styles.playbackSlider}
						value={this._getSeekSliderPosition()}
						onValueChange={this._onSeekSliderValueChange}
						onSlidingComplete={this._onSeekSliderSlidingComplete}
						thumbTintColor="#ffffff"
						minimumTrackTintColor="#ffffff"
						disabled={this.state.isLoading}
					/>
				</View>
				<View
					style={[
						styles.buttonsContainerBase,
						styles.buttonsContainerMiddleRow,
					]}
				>
					<View style={styles.volumeContainer}>
						<View>
							<Ionicons
                style={styles.volumeDownIcon}
								name="ios-volume-down-outline"
								size={40}
								color="#ffffff"
							/>
						</View>
						<Slider
							style={styles.volumeSlider}
							value={1}
							onValueChange={this._onVolumeSliderValueChange}
							thumbTintColor="#ffffff"
							minimumTrackTintColor="#ffffff"
						/>
						<View>
							<Ionicons
                style={styles.volumeUpIcon}
								name="ios-volume-up-outline"
								size={40}
								color="#ffffff"
							/>
						</View>
					</View>
				</View>
				<View
					style={[
						styles.buttonsContainerBase,
						styles.buttonsContainerBottomRow,
					]}
				>

				</View>
			</View>
      </ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
		// backgroundColor: BACKGROUND_COLOR,
	},
	portraitContainer: {
		marginTop: 30,
	},
	portrait: {
		height: 240,
		width: 240,
	},
	detailsContainer: {
		height: 40,
		marginTop: 27,
    alignItems: 'center',
	},
	playbackContainer: {
		flex: 1,
		flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 15,
		alignItems: 'center',
		alignSelf: 'stretch',
	},
	playbackSlider: {
    alignSelf: 'stretch',
		marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
	},
	text: {
    color: '#ffffff',
		fontSize: FONT_SIZE,
		minHeight: FONT_SIZE,
	},
	buttonsContainerBase: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	buttonsContainerTopRow: {
		maxHeight: 80,
		minWidth: DEVICE_WIDTH / 2.0,
		maxWidth: DEVICE_WIDTH / 2.0,
	},
	buttonsContainerMiddleRow: {
		maxHeight: 40,
		alignSelf: 'stretch',
		paddingRight: 20,
	},
	volumeContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		minWidth: DEVICE_WIDTH - 40,
    maxWidth: DEVICE_WIDTH - 40,
    paddingRight: 25,
    paddingLeft: 25,
    marginTop: 10,
	},
	volumeSlider: {
		width: DEVICE_WIDTH - 110,
  },
  volumeDownIcon: {
    paddingRight: 10,
  },
  volumeUpIcon: {
    paddingLeft: 10,
  },
	buttonsContainerBottomRow: {
		alignSelf: 'stretch',
  },
  navRow: {
    height: 40,
    width: DEVICE_WIDTH - 15,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
});


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


// import React, { Component } from 'react';
// import {
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';
// import MusicHeader from './MusicHeader';
// import MusicTrackArt from './MusicTrackArt';
// import MusicTrackDetails from './MusicTrackDetails';
// import MusicSeekBar from './MusicSeekBar';
// import MusicControls from './MusicControls';
// import Video from 'react-native-video';

// export default class MusicPlayer extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       paused: true,
//       totalLength: 1,
//       currentPosition: 0,
//       selectedTrack: 0,
//       repeatOn: false,
//       shuffleOn: false,
//     };
//   }

//   setDuration(data) {
//     // console.log(totalLength);
//     this.setState({totalLength: Math.floor(data.duration)});
//   }

//   setTime(data) {
//     //console.log(data);
//     this.setState({currentPosition: Math.floor(data.currentTime)});
//   }

//   seek(time) {
//     time = Math.round(time);
//     this.refs.audioElement && this.refs.audioElement.seek(time);
//     this.setState({
//       currentPosition: time,
//       paused: false,
//     });
//   }

//   onBack() {
//     if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
//       this.refs.audioElement && this.refs.audioElement.seek(0);
//       this.setState({ isChanging: true });
//       setTimeout(() => this.setState({
//         currentPosition: 0,
//         paused: false,
//         totalLength: 1,
//         isChanging: false,
//         selectedTrack: this.state.selectedTrack - 1,
//       }), 0);
//     } else {
//       this.refs.audioElement.seek(0);
//       this.setState({
//         currentPosition: 0,
//       });
//     }
//   }

//   onForward() {
//     if (this.state.selectedTrack < this.props.tracks.length - 1) {
//       this.refs.audioElement && this.refs.audioElement.seek(0);
//       this.setState({ isChanging: true });
//       setTimeout(() => this.setState({
//         currentPosition: 0,
//         totalLength: 1,
//         paused: false,
//         isChanging: false,
//         selectedTrack: this.state.selectedTrack + 1,
//       }), 0);
//     }
//   }



//   render() {
//     console.log('Music Player renders')
//     const track = this.props.tracks[this.state.selectedTrack];
//     // const video = this.state.isChanging ? null : (
//     //   <Video source={{uri: track.audioUrl}} // Can be a URL or a local file.
//     //     ref="audioElement"
//     //     paused={this.state.paused}               // Pauses playback entirely.
//     //     resizeMode="cover"           // Fill the whole screen at aspect ratio.
//     //     repeat={true}                // Repeat forever.
//     //     onLoadStart={this.loadStart} // Callback when video starts to load
//     //     onLoad={this.setDuration.bind(this)}    // Callback when video loads
//     //     onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
//     //     onEnd={this.onEnd}           // Callback when playback finishes
//     //     onError={this.videoError}    // Callback when video cannot be loaded
//     //     style={styles.audioElement} />
//     // );

//     return (
//       <View style={styles.container}>
//         <StatusBar hidden={true} />
//         <MusicHeader message="Playing from Your Music" />
//         <MusicTrackArt url={track.albumArtUrl} />
//         <MusicTrackDetails title={track.title} artist={track.artist} />
//         <MusicSeekBar
//           onSeek={this.seek.bind(this)}
//           trackLength={this.state.totalLength}
//           onSlidingStart={() => this.setState({paused: true})}
//           currentPosition={this.state.currentPosition} />
//         <MusicControls
//           onPressRepeat={() => this.setState({repeatOn : !this.state.repeatOn})}
//           repeatOn={this.state.repeatOn}
//           shuffleOn={this.state.shuffleOn}
//           forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
//           onPressShuffle={() => this.setState({shuffleOn: !this.state.shuffleOn})}
//           onPressPlay={() => this.setState({paused: false})}
//           onPressPause={() => this.setState({paused: true})}
//           onBack={this.onBack.bind(this)}
//           onForward={this.onForward.bind(this)}
//           paused={this.state.paused}/>
//         {/* {video} */}
//       </View>
//     );
//   }
// }

// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: 'rgb(26,201,141)',
//   },
//   audioElement: {
//     height: 0,
//     width: 0,
//   }
// };


