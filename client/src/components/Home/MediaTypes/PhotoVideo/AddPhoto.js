import React, { Component } from "react";
import Dialog from "react-native-dialog";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  Dimensions, 
  Image, 
  CameraRoll,
  AsyncStorage, 
  Button,  
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      favorites: [],
      dialogVisible: false,
    };
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
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleFavorite = () => {
    this.setState({ dialogVisible: false });
  };

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View key={ item.key } style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity key={ item.key } style={ styles.item } onPress={this.showDialog} >
          <Image
          style={{
          width: 123,
          height: Dimensions.get('window').width / numColumns,
          }}
          key={ item.key }
          source={{ uri: item.node.image.uri }} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <FlatList
        data={ formatData( this.state.photos, numColumns ) }
        style={ styles.container }
        renderItem={ this.renderItem }
        numColumns={ numColumns }
      />
    );
  }
}

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