import React from "react";
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View
} from "react-native";


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

  _switchToContacts = () => {
    this.props.navigation.navigate("Contacts");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Music Button" onPress={this._switchToMusic} />
        <Button title="Journal Button" onPress={this._switchToJournal} />
        <Button title="Photo / Video Button" onPress={this._switchToPhotoVideo} />
        <Button title="Contacts Feature" onPress={this._switchToContacts} />
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