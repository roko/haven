import React from "react";
import { AsyncStorage, Button, StyleSheet, View, StatusBar , Text, TextInput,  FlatList} from "react-native";
import JournalEntry from "./JournalEntry";
import AddAnEntry from "./AddAnEntry";
import dummyData from "./dummyData/journalData.js";
// import { List, ListItem } from "react-native-elements";

export default class Journal extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      data: dummyData,
      view: 'default'
    }
  }

  //also update the list of entries whenever there is a change
  //should this check for change or autosend get request when page loads?

  musicPlaceholder = () => {
     
  };
  // musicPlaceholderAsync = async () => {
    // await AsyncStorage.clear();
    // this.props.navigation.navigate("");
  // };
   
  changeView (newView) {
    this.setState({
      view: newView
    })
  }

  saveEntry (content) {
    //refactor later to use generic axios post req passed down from main app
  }

  render() { 
    console.log('journal component is totally rendering', this.state.data);
    //clickable button to open up modal for making a new entry
    //input field for user to make journal entry
    //button to save that entry

    //previous journal entries for user to go back to view/edit/delete?
    //make scrollable/change to grid view etc? stretch goal for user settings - user can customize if they want to switch to grid view instead of default list scrollable view?
    //stretch goal for user settings - let user customize journal colors?
    
      if (this.state.view === 'default') {
        return (
          <View>
          <Button title="Add some thoughts" onPress={()=>{this.changeView('makeEntry')}} />
          <Text> My thoughts </Text>
          <FlatList
            style={styles.flatList}
            data={this.state.data}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (<JournalEntry data={item} onPressItem={() => this.props.onPressItem(item, index)} />)}
            />
        </View>
      );
    }

    if (this.state.view === 'makeEntry') {
      return(
        <View>
          <AddAnEntry 
          changeView={this.changeView.bind(this)}/>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});