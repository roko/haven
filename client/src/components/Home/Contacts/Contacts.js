import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {Contacts} from 'expo';

export default class ContactsScreen extends Component {

  constructor(props){
    super(props);
    this.testContacts();
  }

  testContacts = async () => {
    const { data } = await Contacts.getContactsAsync({
      //fields: [Contacts.Fields.Emails],
   });

    if (data.length > 0) {
      const contact = data[0];
      console.log(contact);
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