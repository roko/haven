
import React from "react";
import { AsyncStorage, Button, StyleSheet, View, StatusBar, ScrollView, CameraRoll } from "react-native";


export default class PhotoVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    };
  }

  photoGet = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
    .then(r => {
      this.setState({ photos: r.edges });
    })
    .catch((err) => {
       console.log('No Images Found ', err)
    });
  }

  componentDidMount() {
    this.photoGet();
  }
  static navigationOptions = {
    title: "Lots of features here"
  };

  render() {
    return (
      <View style={styles.container}>
           <ScrollView>
       {this.state.photos.map((p, i) => {
       return (
         <Image
           key={i}
           style={{
             width: 300,
             height: 100,
           }}
           source={{ uri: p.node.image.uri }}
         />
       );
     })}
     </ScrollView>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

