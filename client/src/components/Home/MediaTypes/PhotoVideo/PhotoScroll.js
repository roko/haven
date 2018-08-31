import React from "react";
import { AsyncStorage, Button, StyleSheet, View, StatusBar, Animated, ScrollView, CameraRoll, Image, Dimensions, TouchableHighlight, TouchableWithoutFeedback, Text } from "react-native";
import ImageOverlay from "react-native-image-overlay";
import photoData from './PhotoLanding';
import { MaterialCommunityIcons, Ionicons, Feather, FontAwesome } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

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
      header: null,
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
        <TouchableHighlight key={ i } onPress={ () => this.offTouch() } >
        <ImageOverlay
           overlayAlpha={ 0.30 }
           blurRadius={ 10 }
           contentPosition={ "center" }
           titleStyle={{ color: 'white', fontWeight: 'bold' }}
           key={ i }
           height={ SCREEN_HEIGHT }
             source={p.image}
         >
        <View style={{ marginTop: 140, marginBottom: 215, alignItems: "center" }} >
            <Button title={ "Add From CameraRoll..." } size={ 90 } color={ "white" } onPress={ () => this.props.addView() } /> 
            <Ionicons color="#1ac98d" size={ 60 } name="md-add" onPress={ () => this.props.addView() } />
        </View>
          </ImageOverlay>
      </TouchableHighlight>
       );
      }
      if (this.state.touched === false && this.state.options === false) { 
       return (
        <TouchableHighlight key={ i } onPress={ () => this.onTouch() } >
        <ImageOverlay
          overlayAlpha={ 0.0 }
          blurRadius={ 0 }
          contentPosition={ "center" }
          titleStyle={{ color: 'white', fontWeight: 'bold' }}
          key={i}
          height={ SCREEN_HEIGHT }
          source={p.image}
         >
        <View style={styles.navRow}>
          {/* this and the associated style should be extracted to a component for reuse */}
          <Ionicons color="white" size={ 35 } name="ios-images" onPress={() => this.optionsToggle()} />
          <MaterialCommunityIcons 
            name="home-outline" 
            size={30}
            color="#ffffff"
            onPress={ () => this.props._switchToHome() }
          />
        </View>
        </ImageOverlay>
      </TouchableHighlight>
       );
      } else if(this.state.touched === true) {
        return (
        <TouchableHighlight key={ i } onPress={ () => this.offTouch() } >
        <ImageOverlay
           overlayAlpha={ 0.25 }
           blurRadius={ 10 }
           contentPosition={ "center" }
           key={ i }
           height={ SCREEN_HEIGHT }
           source={p.image}
          >
        <View style={{borderRadius: 25, marginTop: 120 }}>
        <Ionicons name="ios-book" size={70} color="white"  />
          <Text style={ styles.storyText }>{ p.story }</Text>
          <Text style={ styles.locationText }>{ p.location }</Text>
          <View style={{ flexDirection: 'row' }}>
          <Ionicons color="#1ac98d" size={ 30 } name="md-eye-off" onPress={ () => this.offTouch() } alignItems={ "center" } marginTop={ 10 } />
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
  },
  navRow: {
    height: 40,
    width: SCREEN_WIDTH - 15,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingLeft: 15,
    // marginRight: 4,
    marginTop: 45,
    marginBottom: 735
  },
});

//? = Still Testing
//! = Urgent / Important
//* Standard Docs