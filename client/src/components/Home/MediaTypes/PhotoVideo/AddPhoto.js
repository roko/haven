import React, { Component } from "react";
import axios from "axios";
import StoryMod from "./StoryMod";
import DialogInput from 'react-native-dialog-input';
import { 
  StyleSheet, 
  View, 
  FlatList,
  Dimensions, 
  Image, 
  CameraRoll,
  TouchableOpacity  
} from 'react-native';

//*Grid Sizing
const formatData = ( data, numColumn ) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  
  let numberOfElementsLastRow = data.length - ( numberOfFullRows * numColumns );
  while ( numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0 ) {
    data.push({ key: `blank-${ numberOfElementsLastRow }`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

const numColumns = 3;
export default class AddPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      favorites: [],
      dialogVisible: false,
      storyTime: false
    };
    this.storyTime = this.storyTime.bind(this)
    this.notStoryTime = this.notStoryTime.bind(this)
  }
 
  static navigationOptions = {
    title: "All Photos"
  };

  photoGet = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
    .then(r => {
      this.setState({ photos: r.edges });
      console.log('all photos: ', r.edges)
    })
    .catch((err) => {
       console.log('No Images Found ', err)
    } );
  }

  componentDidMount() {
    this.photoGet();
    console.log(this.state.photos)
  };
  
  storyTime = () => {
    this.setState({ storytime: true })
  };

  notStoryTime = () => {
    this.setState({ storytime: false })
  };

  renderItem = ({ item, index }) => {

    item.story = '';

    if (item.empty === true) {
      return <View key={ index } style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity key={ index } style={ styles.item } 
      onPress={ () => {
        this.storyTime(),
        this.props.savePhotoVid.bind({
          filename: item.node.image.filename, 
          height: item.node.image.height, 
          width: item.node.image.width, 
          isSorted: item.node.image.isSorted,
          playableDuration: item.node.image.playableDuration,
          uri: item.node.image.uri,
          lat: item.node.location.latitude,
          long: item.node.location.longitude,
          type: item.node.type,
          story: '',
      })
      }}>
          <Image
          style={{
          width: 123,
          height: Dimensions.get('window').width / numColumns,
          }}
          key={ index }
          source={{ uri: item.node.image.uri }} />
      </TouchableOpacity>
    );
  };

  render() {
    if(this.state.storytime === true) {
      return(
        <View>
      <StoryMod storyOff={() => this.notStoryTime()}  />
          <FlatList
          data={ formatData( this.state.photos, numColumns ) }
          style={ styles.container }
          renderItem={ this.renderItem }
          numColumns={ numColumns }
        />
        </View>
      )
    } else {
      return (
        <FlatList
          data={ formatData( this.state.photos, numColumns ) }
          style={ styles.container }
          renderItem={ this.renderItem }
          numColumns={ numColumns }
        />
      );
    };
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});



//? = Still Testing
//! = Urgent / Important
//* Standard Docs