import React, { Component } from 'react';
import {
	Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
import Slider from 'react-native-slider'; 
import { Asset, Audio, Font } from 'expo';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import PLAYLIST from '../../../../assets/sounds/dummy-audio.js';

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
		this.index = this.props.navigation.getParam('index');
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
  
  static navigationOptions = {
    header: null,
  };

	componentDidMount() {
    // this.index = this.state.params;
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
    const { navigate } = this.props.navigation;
		return !this.state.fontLoaded ? (
			<View />
		) : (
      <ImageBackground 
        source={require('../../../../assets/img/gradient-background-image.png')} 
        style={{ width: '100%', height: '100%' }}
      >
        <View style={styles.navRow}>
          {/* this and the associated style should be extracted to a component for reuse */}
          <Ionicons 
            name="ios-arrow-back" 
            size={30}
            color="#ffffff"
            onPress={() => this.props.navigation.goBack()}
          />
          <MaterialCommunityIcons 
            name="home-outline" 
            size={30}
            color="#ffffff"
            onPress={() => this.props.navigation.navigate("Home")}
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
					<Text style={styles.detailsText}> 
						{this.state.playbackInstanceName}
					</Text>
					<Text style={styles.detailsText}> 
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
						style={styles.skipButtons}
						onPress={this._onBackPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<Ionicons
								name="ios-skip-backward-outline"
								size={60}
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
								<Ionicons
									name="ios-pause-outline"
									size={90}
									color="#ffffff"
								/>
							) : (
								<Ionicons
									name="ios-play-outline"
									size={90}
									color="#ffffff"
								/>
							)}
						</View>
					</TouchableHighlight>
				
					<TouchableHighlight
						style={styles.skipButtons}
						onPress={this._onForwardPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<Ionicons
								name="ios-skip-forward-outline"
								size={60}
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
							value={0.5}
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
      {/* </SafeAreaView> */}
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
		marginTop: 45,
	},
	portrait: {
		height: 290,
		width: 290,
	},
	detailsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  detailsText: {
    fontFamily: 'Avenir-Medium',
    fontSize: 18,
    color: 'white',
  },
	playbackContainer: {
		flex: 1,
		flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
		alignItems: 'center',
		alignSelf: 'stretch',
	},
	playbackSlider: {
    alignSelf: 'stretch',
		marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
  },
  volumeContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'space-between',
		minWidth: DEVICE_WIDTH - 40,
    maxWidth: DEVICE_WIDTH - 40,
    paddingRight: 25,
    marginLeft: 32,
	},
	volumeSlider: {
    width: DEVICE_WIDTH - 120,
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
    paddingLeft: 15,
    marginTop: 45,
  },
  skipButtons: {
    paddingTop: 15,
  }
});
