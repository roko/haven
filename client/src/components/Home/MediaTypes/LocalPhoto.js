import React from "react";
import { AsyncStorage, Button, StyleSheet, View, StatusBar, Animated, ScrollView, CameraRoll, Image, Dimensions, TouchableHighlight, TouchableWithoutFeedback, Text } from "react-native";
import ImageOverlay from "react-native-image-overlay";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';  
import photoData from './photoStock/PhotoLanding';

// import Gallery from "react-photo-gallery";

const xOffset = new Animated.Value(0);

_switchToPhotoVideo = () => {
  this.props.navigation.navigate("PhotoVideo");
};

const transitionAnimation = index => {
  return {
    transform: [
      { perspective: 800 },
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [0.25, 1, 0.25]
        })
      },
      {
        rotateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["45deg", "0deg", "45deg"]
        })
      },
      {
        rotateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["-45deg", "0deg", "45deg"]
        })
      }
    ]
  };
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class PhotoVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: photoData,
      touched: false
    };
  }

  onTouch = () => {
    this.setState({ touched: true })
  }

  offTouch = () => {
    this.setState({ touched: false })
  }

  static navigationOptions = {
    title: "Photos & Videos"
  };

  render() {
    console.log(this.state.photos)
    return (
      <View styles={styles.container}>
           <Animated.ScrollView scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xOffset } } }],
          { useNativeDriver: true } 
        )}
        horizontal
        pagingEnabled
        style={styles.scrollView}
      >
       {this.state.photos.map((p, i) => {
      if (this.state.touched === false) { 
       return (
        <TouchableHighlight key={i} onPress={ () => this.onTouch() } >
        <Image
           key={i}
           style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,

           }}
           source={{ uri: p.image }}
         />
      </TouchableHighlight>
       );
      } else if(this.state.touched === true) {
        return (
        <TouchableHighlight key={i} onPress={ () => this.offTouch() } >
        <ImageOverlay
           overlayAlpha={ 0.25 }
           blurRadius={ 10 }
           contentPosition={ "center" }
           title={ "Fiji, 2007 with Family" }
           titleStyle={{ color: 'white', fontWeight: 'bold' }}
           key={i}
           height={ SCREEN_HEIGHT }
          source={{ uri: p.image}}
          >
        <View style={{ justifyContent: "center", borderRadius: 25, }}>
        {/* <Ionicons style={{ justifyContent: 'flex-start' }} name="ios-close-circle-outline" size={20} onPress={() => this.offTouch()} color="#1ac98d"  /> */}
        <Ionicons name="ios-book" size={70} color="white"  />
          <Text style={styles.storyText}>{p.story}</Text>
          <Text style={styles.locationText}>{p.location}</Text>
          <View style={{ flexDirection: 'row'}}>
          <Ionicons color="#1ac98d" size={45} name="md-arrow-dropleft" onPress={() => this.offTouch()} />
          <Text style={styles.locationText}>                             </Text>
          {/* <Ionicons color="#1ac98d" size={40} name="ios-arrow-dropright" onPress={() => this.offTouch()} /> */}
          {/* <Ionicons color="#1ac98d" name="md-arrow-round-forward" onPress={() => this.offTouch()} /> */}
          </View>
        </View>
         </ImageOverlay>
        </TouchableHighlight>
       );
      }
     })} 
     </Animated.ScrollView>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
   
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

const Screen = props => {
  return (
    <View style={styles.scrollPage}>
      <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
        <Text style={styles.text}>{props.text}</Text>
      </Animated.View>
    </View>
  );
};
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
    fontSize: 45,
    fontWeight: "bold",
    color: "white"
  },
  storyText: {
    fontSize: 45,
    color: "white"
  }
});