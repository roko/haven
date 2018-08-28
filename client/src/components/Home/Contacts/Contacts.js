import React, { Component } from 'react';
import { Text, View, FlatList, Button, Modal, TouchableHighlight, StyleSheet, SafeAreaView, AsyncStorage } from 'react-native';
import { SearchBar, List, ListItem } from "react-native-elements";
import {Contacts, Permissions, SMS} from 'expo';
import { contains } from './ContactsHelpers';
import _ from 'lodash';

/**
 * Expo Documentation for getting contacts:
 * {@link https://docs.expo.io/versions/v29.0.0/sdk/contacts}
 * 
 */

export default class ContactsScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      filteredContacts: [],
    }
  }
  
  componentDidMount(){
    this.getContactsFromStorage();
  }

  static navigationOptions = ({ navigation }) => {

    const params = navigation.state.params || {};

    return {
    //header: null,
    headerTitle: "Contacts",
    headerLeft: (
      <Button
        onPress={()=>{navigation.goBack()}}
        title="back button"
      />
    ),
    headerRight: (
      <Button
        onPress={()=>{navigation.navigate("AddContactModal")}}
        title="add "
        color="green"
      />)
    }
  };




  getContactsFromStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const havenContacts = [];
      for (let key of keys) {
        const value = await AsyncStorage.getItem(key);
        const contact = await Contacts.getContactByIdAsync(value);
        havenContacts.push(contact)
      }
      this.setState({havenContacts}, ()=> console.log("state",this.state.havenContacts))
    } catch (error) {
      console.log(error)
    }
  }

  clearStorage = async () => {
    await AsyncStorage.removeItem("@Haven:key")
  }

  renderHeader = () => (
     <SearchBar 
      placeholder="find someone" 
      lightTheme
      round
      onChangeText={this.handleSearch} />
    )

  handleSearch = input => {
    const formatQuery = input.toLowerCase()
    console.log("input", input)
    const filteredContacts = _.filter(this.state.contacts, person => {
      return contains(person, formatQuery)
    })
    this.setState({query: input, filteredContacts})
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  handleContactsPress = async (id) => {
    console.log("pressed list item", id);
    const contact = await Contacts.getContactByIdAsync(id);
    console.log(contact.phoneNumbers[0].digits)
    this.handleSendSMS(contact.phoneNumbers[0].digits)
  }

  handleSendSMS = async (number, message = 'hello') => {
    const { status } = await Permissions.askAsync(Permissions.SMS);
    console.log(status)

    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      let addresses;
      SMS.sendSMSAsync([number], message)
    } else {
      // misfortune... there's no SMS available on this device
    }
  }



  render() {
    console.log("contacts state", this.state)
    return (
      <SafeAreaView>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
          <FlatList
            data={this.state.havenContacts}
            renderItem={({ item }) => (
              <TouchableHighlight
                underlaycolor={"green"}
              >
                <ListItem
                  roundAvatar
                  button onPress={() => {this.handleContactsPress(item.id)}}
                  title={`${item.name}`}
                  subtitle={item.phoneNumbers && item.phoneNumbers[0].digits}
                  //avatar={{ uri: item.picture.thumbnail }}
                  containerStyle={{ borderBottomWidth: 0 }}
                  />

              </TouchableHighlight>
            )}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            keyExtractor={item => item.id}
            automaticallyAdjustContentInsets={false}
            />
        </List>
      </SafeAreaView>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   modal:{
//     flex: 1
//   },
//   flatList: {
//     padding: 10,
//     textAlignVertical: "center",
//     textAlign: "center"
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
//   button: {
//     alignItems: "center",
//     marginRight: 40,
//     marginLeft: 40,
//     marginTop: 10,
//     padding: 10,
//     paddingTop: 10,
//     paddingBottom: 10,
//     backgroundColor: "rgb(26,201,141)",
//     borderRadius: 10,
//     borderWidth: 1
//   },
//   text: {
//     color: "#ffffff"
//   }
// });