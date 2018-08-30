import React from "react";
import { AsyncStorage, Button, StyleSheet, View, StatusBar, Animated, ScrollView, CameraRoll, Image, Dimensions, TouchableHighlight, TouchableWithoutFeedback, Text } from "react-native";
import ImageOverlay from "react-native-image-overlay";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';  
import photoData from '../photoStock/PhotoLanding';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

_switchToAddPhoto = () => {
  this.props.navigation.navigate("AddPhoto");
};

export default class PhotoScroll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: photoData,
            touched: false,
            options: false
        };
    }

  static navigationOptions = {
    title: "Haven Photos"
  };

  optionsToggle = () => {
      this.setState({ options: !this.state.options })
  } 
  onTouch = () => {
    this.setState({ touched: true })
  }

  offTouch = () => {
    this.setState({ touched: false, options: false })
  }

  render() {
    console.log(this.state.photos)
    return (
      <View>
        <Animated.ScrollView 
          scrollEventThrottle={16}
          horizontal
          pagingEnabled
      >
       {this.state.photos.map((p, i) => {
        if (this.state.options === true) { 
       return (
        <TouchableHighlight key={i} onPress={ () => this.offTouch() } >
        <ImageOverlay
           overlayAlpha={ 0.30 }
           blurRadius={ 10 }
           contentPosition={ "center" }
           titleStyle={{ color: 'white', fontWeight: 'bold' }}
           key={i}
           height={ SCREEN_HEIGHT }
          source={{ uri: p.image }}
         >
        <View style={{ marginTop: 140, marginBottom: 215, alignItems: "center" }} >
            <Button title={ "Add From CameraRoll..." } size={ 90 } color={ "white" } onPress={ () => this.props.addView() } /> 
            <Ionicons color="#1ac98d" size={ 60 } name="ios-add" onPress={() => this.props.addView()} />
        </View>
          </ImageOverlay>
      </TouchableHighlight>
       );
      }
      if (this.state.touched === false && this.state.options === false) { 
       return (
        <TouchableHighlight key={i} onPress={ () => this.onTouch() } >
        <ImageOverlay
           overlayAlpha={ 0.0 }
           blurRadius={ 0 }
           contentPosition={ "center" }
           titleStyle={{ color: 'white', fontWeight: 'bold' }}
           key={i}
           height={ SCREEN_HEIGHT }
          source={{ uri: p.image }}
         >
        <View style={{flex: 1, flexDirection: 'row', marginLeft: 350, marginTop: 5}}>
          <Ionicons color="white" size={ 35 } name="md-more" onPress={() => this.optionsToggle()} />
          </View>
          </ImageOverlay>
      </TouchableHighlight>
       );
      } else if(this.state.touched === true) {
        return (
        <TouchableHighlight key={i} onPress={ () => this.offTouch() } >
        <ImageOverlay
           overlayAlpha={ 0.25 }
           blurRadius={ 10 }
           contentPosition={ "center" }
           key={i}
           height={ SCREEN_HEIGHT }
          source={{ uri: p.image }}
          >
        <View style={{borderRadius: 25, marginTop: 120 }}>
        <Ionicons name="ios-book" size={70} color="white"  />
          <Text style={styles.storyText}>{p.story}</Text>
          <Text style={styles.locationText}>{p.location}</Text>
          <View style={{ flexDirection: 'row'}}>
          <Ionicons color="#1ac98d" size={30} name="ios-eye-off-outline" onPress={() => this.offTouch()} alignItems={"center"} marginTop={10} />
          </View>
        </View>
         </ImageOverlay>
        </TouchableHighlight>
       );
      }
     })} 
     </Animated.ScrollView>
        <StatusBar barStyle="default" />
      </View>
    );
 
  }
}

//Styles
const styles = StyleSheet.create({
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 20
  },
  screen: {
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "white"
  },
  locationText: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 40,
    color: 'white',	   
    // fontWeight: "bold",
  },
  storyText: {
    fontFamily: 'Avenir-BookOblique',
    fontSize: 40,
    color: "white"
  }
});

//? = Still Testing
//! = Urgent / Important
//* Standard Docs