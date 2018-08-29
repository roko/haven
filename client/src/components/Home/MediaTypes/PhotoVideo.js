import React, { Component } from "react";
import { 
  View, 
  Button,  
} from 'react-native';
import AddPhoto from "./PhotoVideo/AddPhoto";
import PhotoScroll from "./PhotoVideo/PhotoScroll";
//? import axios from "axios";
//? const db = require('../../../../../database/db'); 
export default class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      view: "favorites"
    };
    this.savePhotoVid = this.savePhotoVid.bind(this);
    this.addView = this.addView.bind(this)
  }

  static navigationOptions = {
    title: "All Photos"
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
      <PhotoScroll addView={ this.addView } />
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


//? = Still Testing
//! = Urgent / Important
//* Standard Docs