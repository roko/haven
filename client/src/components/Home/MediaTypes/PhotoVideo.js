import React, { Component } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  Dimensions, 
  Image, 
  TouchableHighlight, 
  CameraRoll,
  AsyncStorage, 
  Button,  
  StatusBar, 
  Animated, 
  ScrollView,
  TouchableOpacity  
} from 'react-native';
import AddPhoto from "./PhotoVideo/AddPhoto";
import PhotoScroll from "./PhotoVideo/PhotoScroll";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "favorites"
    };
    this.addView = this.addView.bind(this)
  }

  static navigationOptions = {
    title: "All Photos"
  };

  addView = () => {
    this.setState({ view: "add" })
  }

  favoritesView = () => {
    this.setState({ view: "favorites" })
  }

  render() {
    if(this.state.view === "favorites") {
    return (
      <PhotoScroll addView={this.addView} />
    );
  }
  else if(this.state.view === "add") {
    return (
      <AddPhoto />
    );
   }
   else if(this.state.view === "home") {
     return (
     <View  style={{ marginTop: 280 }} >
       <Button title={"Add a Photo"} onPress={() => this.addView()} />
       <Button title={"Favorites"} onPress={() => this.favoritesView()} />
     </View>
      )
    }
  }
};
