import React from "react";
import { AsyncStorage, Button, StyleSheet, View, StatusBar , Text} from "react-native";


export default class Journal extends React.Component {
  static navigationOptions = {
    title: "Journal Page"
  };

  musicPlaceholder = () => {
     
  };

  // musicPlaceholderAsync = async () => {
    // await AsyncStorage.clear();
    // this.props.navigation.navigate("");
  // };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Button Example" onPress={()=>{}} />
        <Text> Text Example </Text>
        <StatusBar barStyle="default" />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});