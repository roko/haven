import React from "react";
import {
  AsyncStorage,
  Button,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";
import { EvilIcons, Ionicons } from '@expo/vector-icons';


const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
  };

  _switchToMusic = () => {
    this.props.navigation.navigate("Music");
  };

  _switchToJournal = () => {
    console.log('journal icon clicked')
    this.props.navigation.navigate("Journal");
  };

  _switchToPhotoVideo = () => {
    this.props.navigation.navigate("PhotoVideo");
  };

  _switchToContacts = () => {
    this.props.navigation.navigate("Contacts");
  };

  _switchToSettings = () => {
    this.props.navigation.navigate("Settings");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <ImageBackground source={require("../../../assets/img/gradient-background-image.png")} style={{ width: "100%", height: "100%" }}>
        <View style={styles.container}>
          <View style={styles.iconsContainerTopRow}>
            <TouchableOpacity onPress={this._switchToMusic} >
              <Ionicons name="ios-musical-notes-outline" size={130} color="white" />
            </TouchableOpacity>
          <TouchableOpacity onPress={this._switchToPhotoVideo}>
              <Ionicons name="ios-image-outline" size={130} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.iconsContainerBottomRow}>
            <TouchableOpacity onPress={this._switchToJournal}>
              <Image style={{ width: 130, height: 130 }} source={require("../../../assets/img/journal-icon.png")} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this._switchToContacts}>
              <Ionicons name="ios-contacts-outline" size={130} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.settingsIconContainer}>
            <TouchableOpacity onPress={this._switchToSettings}>
                <EvilIcons name="gear" size={48} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    height: DEVICE_HEIGHT,
    // backgroundColor: "rgb(26,201,141)",
  },
  iconsContainerTopRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 25,
  },
  iconsContainerBottomRow: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 55,
    paddingRight: 55,
    paddingTop: 25,
    justifyContent: "space-between",
  },
  settingsIconContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 30,
    marginRight: 25,
  }
});