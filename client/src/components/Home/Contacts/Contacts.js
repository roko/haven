import React, { Component } from 'react';
import { Text, View } from 'react-native';
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
    this.contactsPermission();
  }
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
      console.log(data)
      return data; 
      // this data is what you get back from your contacts list, sort/ filter as you wish
    } else {
      throw new Error('Contacts permission not granted');
    }
  }


  static navigationOptions = {
    title: "Contacts Feature"
  };


  render() {
    return (
      <View>
        <Text> Contacts Component </Text>
      </View>
    )
  }
}