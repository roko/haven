import React from "react";
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

//ios-musical-notes-outline


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home Screen Title"
  };

  _switchToMusic = () => {
    this.props.navigation.navigate("Music");
  };

  _switchToJournal = () => {
    this.props.navigation.navigate("Journal");
  };

  _switchToPhotoVideo = () => {
    this.props.navigation.navigate("PhotoVideo");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={styles.container}>
      ios-image-outline
        <Ionicons name="ios-musical-notes-outline" size={70} color="black" onPress={this._switchToMusic} />
        <Ionicons name="ios-image-outline" size={70} color="black" onPress={this._switchToPhotoVideo} />
        <FontAwesome name="book" size={70} color="black" onPress={this._switchToJournal} />
        <Button title="Sign Out" onPress={this._signOutAsync} />
      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});