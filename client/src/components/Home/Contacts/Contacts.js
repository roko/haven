import React, { Component } from 'react';
import { Text, View, FlatList, Button, Modal, TouchableHighlight, StyleSheet } from 'react-native';
import { SearchBar, List, ListItem } from "react-native-elements";
import {Contacts, Permissions} from 'expo';

/**
 * Expo Documentation for getting contacts:
 * {@link https://docs.expo.io/versions/v29.0.0/sdk/contacts}
 * 
 * 
 */

export default class ContactsScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false
    }

  }
  
  componentDidMount(){
    
    this.contactsPermission();
  }


  static navigationOptions = {
    headerTitle: "Contacts",
    headerRight: 
      <Button
        onPress={()=>{}}
        title="add "
        color="#fff"
      />
  };
/**
 * Prompts the user for permission.
 * If permission is granted, it currently accesses all the contacts data and returns it.
 * One can pass a query to getContactsAsync to filter a contact
 * This function is currently coupled, might be wise to decouple once * * * functionality is implemented
 */

  contactsPermission = async () => {

    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    
    console.log(status)
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        //fields: [Contacts.Fields.Emails],
      });
      //console.log(data)
      this.setState({contacts: data})
      return; 
      // this data is what you get back from your contacts list, sort/ filter as you wish
    } else {
      throw new Error('Contacts permission not granted');
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    //console.log("contacts state", this.state)
    return (
      <View style={styles.container}>

        <SearchBar
          placeholder='Type in a a name here...'
          // onChangeText={()=>{}}
        />

        <Modal
          animationType="fade"
          visible={this.state.modalVisible}
          // presentationStyle="pageSheet"
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={styles.container}>
            <View>
              <Text>Figure out how to position this modal</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

        <List>
          <FlatList
            data={this.state.contacts}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={`${item.name.first} ${item.name.last}`}
                subtitle={item.email}
                avatar={{ uri: item.picture.thumbnail }}
              />
            )}
          />
        </List>

      



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  modal:{
    flex: 1
  },
  flatList: {
    padding: 10,
    textAlignVertical: "center",
    textAlign: "center"
  },
  button: {
    alignItems: "center",
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "rgb(26,201,141)",
    borderRadius: 10,
    borderWidth: 1
  },
  text: {
    color: "#ffffff"
  }
});