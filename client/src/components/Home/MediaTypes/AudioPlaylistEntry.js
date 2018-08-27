import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text,
  TouchableOpacity, 
  View, 
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default class AudioPlaylistEntry extends Component {
  constructor(props) {
		super(props);
  };


  _switchToMusicPlayer = () => {
    this.props.navigate("MusicPlayer")
  }


  render() {
    console.log(this.props.navigate, 'from audioPlaylistEntry');
    return (
      <TouchableOpacity onPress={this._switchToMusicPlayer}>
      <View style={styles.trackContainer}>
        <Feather
          name="play"
          size={16}
          color="#ffffff"
        />
        <Text style={styles.trackText}>   {this.props.track.name}</Text>
      </View>
    </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  trackContainer: {
    height: 30,
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  trackText: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    color: 'white',
  }
});

