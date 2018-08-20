import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
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

//make contacts list viewable
//have a toggle for contacts

//after button is pressed then the contacts set to true for emergencyContact receieve a message via text with the Twilio API

// var accountSid = 'AC4d836751e46d00914fe3459f3010aeeb'; // Your Account SID from www.twilio.com/console
// var authToken = '18a6ffe24d5bc5c5311a59bc48da89cf';   // Your Auth Token from www.twilio.com/console

// var twilio = require('twilio');
// var client = new twilio(accountSid, authToken);

// client.messages.create({
//   body: 'Hello from Node',
//   to: '+14155181582',  // Text this number
//   from: '+14155181582' // From a valid Twilio number
// })
//   .then((message) => console.log(message.sid));

  getSupport () {

  }

  render() {
    return (
      <View>
        <Text> Contacts Component </Text>
        <Button title="Feeling down?" onPress={() => { this.getSupport()}} />
      </View>
    )
  }
}