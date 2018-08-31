import React, { Component } from "react";
import { 
  View, 
  Button,  
  Dimensions,
  StyleSheet
} from 'react-native';
import AddPhoto from "./PhotoVideo/AddPhoto";
import PhotoScroll from "./PhotoVideo/PhotoScroll";
import { MaterialCommunityIcons, Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
//? import axios from "axios";
//? const db = require('../../../../../database/db'); 

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
export default class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      view: "favorites"
    };
    this.savePhotoVid = this.savePhotoVid.bind(this);
    this.addView = this.addView.bind(this)
    this._switchToHome.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  //*Save individual Photo object to db
  savePhotoVid(photo) {
    console.log("save fired!")
    fetch('localhost:3000/savedPhotos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
      filename: photo.filename, 
      height: photo.height, 
      width: photo.width, 
      isSorted: photo.isSorted,
      playableDuration: photo.playableDuration,
      uri: photo.uri,
      lat: photo.latitude,
      long: photo.longitude,
      type: photo.type,
      story: photo.story,
    }),
  });
}

_switchToHome = () => {
  this.props.navigation.navigate("Home");
};

  //*Switch to "Add Photo" grid
  addView = () => {
    this.setState({ view: "add" })
  }
 //*Switch to "Saved Photos" ScrollView
  favoritesView = () => {
    this.setState({ view: "favorites" })
  }

  render() {
    if(this.state.view === "favorites") {
    return (
    <View>
      <PhotoScroll addView={ this.addView } _switchToHome={ this._switchToHome } />
      </View>
    );
  }
  else if(this.state.view === "add") {
    return (
      <AddPhoto savePhotoVid={ () => this.savePhotoVid.bind(this) } />
    );
   }
   else if(this.state.view === "home") {
     return (
       <View  style={{ marginTop: 280 }} >
       <Button title={ "Add a Photo" } onPress={ () => this.addView() } />
       <Button title={ "Favorites" } onPress={ () => this.favoritesView() } />
     </View>
      )
    }
  }
};

//       <View style={styles.navRow}>
//       {/* this and the associated style should be extracted to a component for reuse */}
//       <Ionicons color="white" size={ 35 } name="ios-images" onPress={() => this.optionsToggle()} />
//       <MaterialCommunityIcons 
//         name="home-outline" 
//         size={30}
//         color="#ffffff"
//         onPress={() => this.props.navigation.navigate("Home")}
//       />
//     </View>
// const styles = StyleSheet.create({
//   scrollPage: {
//     width: SCREEN_WIDTH,
//     padding: 20
//   },
//   screen: {
//     height: SCREEN_HEIGHT,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 25,
//     backgroundColor: "white"
//   },
//   locationText: {
//     fontFamily: 'Avenir-Heavy',
//     fontSize: 40,
//     color: 'white',	   
//     // fontWeight: "bold",
//   },
//   storyText: {
//     fontFamily: 'Avenir-BookOblique',
//     fontSize: 40,
//     color: "white"
//   },
//   navRow: {
//     height: 40,
//     width: SCREEN_WIDTH - 15,
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     flexDirection: "row",
//     paddingLeft: 15,
//     // marginRight: 4,
//     marginTop: 45,
//     marginBottom: 735
//   },
// });

//? = Still Testing
//! = Urgent / Important
//* Standard Docs