import React from "react";
import {
  AsyncStorage,
  Button,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Haven",
    // headerStyle: {
    //   backgroundColor: '#f4511e',
    // },
    headerTintColor: 'green',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
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
    const { params } = this.props.navigation.state;
    console.log(params)
    return (
      <View style={styles.container}>
        <View style={styles.iconsContainerTopRow} >
          <Ionicons name="ios-musical-notes-outline" size={130} color="white" onPress={this._switchToMusic} />
          <Ionicons name="ios-image-outline" size={130} color="white" onPress={this._switchToPhotoVideo} />
        </View>
        <View style={styles.iconsContainerBottomRow} >
          <TouchableOpacity onPress={this._switchToJournal}>
            <Image
              style={{width: 130, height: 130}}
              source={require('../../../assets/img/journal-icon.png')}
            />
          </TouchableOpacity>
          {/* <FontAwesome name="pencil-square-o" size={130} color="white" onPress={this._switchToJournal} /> */}
          <Ionicons name="ios-contacts-outline" size={130} color="white" onPress={this._switchToContacts} />
          {/* <FontAwesome name="gears" size={70} color="black" onPress={this._switchToSettings} /> */}
          {/* <Ionicons name="md-return-left" size={70} color="black" onPress={this._signOutAsync} /> */}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "rgb(26,201,141)",
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
  }
});