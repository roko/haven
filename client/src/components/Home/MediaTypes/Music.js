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
import AudioPlaylistEntry from './AudioPlaylistEntry';

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

export default class Music extends Component {
	constructor(props) {
		super(props);
		this.index = 0;
		this.playbackInstance = undefined;
		this.state = {
      playlist: PLAYLIST
			// playbackInstanceName: LOADING_STRING,
			// playbackInstancePosition: undefined,
			// playbackInstanceDuration: undefined,
			// shouldPlay: false,
			// isPlaying: false,
			// isBuffering: false,
			// isLoading: true,
			// fontLoaded: false,
			// volume: 1.0,
			// rate: 1.0,
			// portrait: undefined,
		};
	}

	render() {
		return false ? (
			<View />
		) : (
      <ImageBackground source={require('../../../../assets/img/gradient-background-image.png')} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>

          {this.state.playlist.map((track, i) =>
            <AudioPlaylistEntry
              key={i + Math.random()} 
              track={this.state.playlist[i]}
            />
          )}
        </View>
      </ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH, 
		justifyContent: 'center',

		// alignSelf: 'stretch',
		// backgroundColor: BACKGROUND_COLOR,
  }
});