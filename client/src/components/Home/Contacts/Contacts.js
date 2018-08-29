import React, { Component } from 'react';
import { Text, View, FlatList, Button, Modal, TouchableHighlight, StyleSheet, SafeAreaView, AsyncStorage } from 'react-native';
import { SearchBar, List, ListItem, FormInput, FormLabel, Avatar } from "react-native-elements";
import { SwipeListView } from "react-native-swipe-list-view";

import {Contacts, Permissions, SMS} from 'expo';
import { contains } from './ContactsHelpers';
import _ from 'lodash';
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * Expo Documentation for getting contacts:
 * {@link https://docs.expo.io/versions/v29.0.0/sdk/contacts}
 * 
 */

export default class ContactsScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      havenContacts: [],
      filteredContacts: [],
      query: ''
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
        onPress={()=>{navigation.navigate("Home")}}
        title="< Back"
        
      />
    ),
    headerRight: (
      // <Ionicons
      //   onPress={()=>{navigation.navigate("AddContactModal")}}
      //   //title="Add"
      //   color="green"
      //   size={28}
      //   name="ios-add-circle-outline"
      // /> 
      <Button
        onPress={() => { navigation.navigate("AddContactModal") }}
        title="Add"
        color="green"
        size={28}
        
      />
    )
    }
  };
  getContactsFromStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const havenContacts = [];
      for (let key of keys) {
        const value = await AsyncStorage.getItem(key);
        const contact = await Contacts.getContactByIdAsync(value);
        if(contact !== null) {
          havenContacts.push(contact)
        }
      }
      this.setState({havenContacts}, () => console.log("state",this.state.havenContacts))
    } catch (error) {
      console.log(error)
    }
  }

  clearStorage = async () => {
    await AsyncStorage.removeItem("@Haven:key")
  }

  renderHeader = () => (
     <SearchBar 
      placeholder="Search your haven" 
      lightTheme
      round
      onChangeText={this.handleSearch} />
    )

  renderFooter = () => (
    <View>
      <FormLabel>Send a message!</FormLabel>
      <FormInput
        placeholder='Hello friend!'
      />
    </View>
  )

  renderAvatar = () => (
    <Avatar
      size={200}
      rounded
      // title="CR"
      icon={{ name: 'user' }}
      onPress={() => console.log("Works!")}
      activeOpacity={0.7}
    />
  )

  handleSearch = input => {
    const formatQuery = input.toLowerCase()
    console.log("input", input)
    const filteredContacts = _.filter(this.state.havenContacts, person => {
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
            useFlatList
            data={this.state.query.length > 0 ? this.state.filteredContacts: this.state.havenContacts}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                button onPress={() => {this.handleContactsPress(item.id)}}
                title={`${item.name}`}
                subtitle={item.phoneNumbers && item.phoneNumbers[0].number}
                avatar={
                  <Avatar
                    size={200}
                    rounded
                    icon={{ name: 'sms', color: 'orange' }}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                  />}
                containerStyle={{ borderBottomWidth: 0 }}
              />
            )}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
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