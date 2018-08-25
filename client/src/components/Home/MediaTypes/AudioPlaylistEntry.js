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

  _switchToMusicPlayer = () => { //new
    this.props.navigation.navigate("Music");
  };

  render() {
    return (
      <View style={styles.trackContainer}>
        <TouchableOpacity onPress={this._switchToMusicPlayer}>
          <Feather
            name="play"
            size={18}
            color="#ffffff"
          />
          <Text style={styles.trackText}>{this.props.track.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	trackContainer: {
		height: 30,
    marginLeft: 20,
    flexDirection: "row",
  },
  trackText: {
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    color: 'white',
  }
});

