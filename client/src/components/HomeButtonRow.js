import React, { Component } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  View, 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class HomeButtonRow extends Component {
  constructor(props) {
		super(props);
  };

  static navigationOptions = {
    header: null,
  };

  _switchToHome = () => {
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <View style={styles.homeButtonRow}>
        <TouchableOpacity>
          <Ionicons 
            name="ios-home-outline" 
            size={26}
            color="#ffffff"
            onPress={this._switchToHome}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  homeButtonRow: {
    height: 40,
    width: DEVICE_WIDTH - 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    
  },
});
