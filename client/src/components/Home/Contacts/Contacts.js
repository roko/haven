import React, { Component } from 'react';
import { Text, View, FlatList, Button, TouchableHighlight, StyleSheet, SafeAreaView, AsyncStorage } from 'react-native';
import { SearchBar, List, ListItem, FormInput, FormLabel, Avatar } from "react-native-elements";

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
      havenContacts: [],
      filteredContacts: [],
      query: '',
      message: ''
    }
  }
  
  componentDidMount(){
    this.getContactsFromStorage();
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: "Contacts",
      headerLeft: (
        <Button
          onPress={()=>{navigation.navigate("Home")}}
          title="< Back"
        />
      ),
      headerRight: (
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
      this.setState({havenContacts})
    } catch (error) {
      console.error(error)
    }
  }

  clearStorage = async (key) => {
    await AsyncStorage.removeItem(key)
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
      <FormLabel>
        <Button 
          title="Send a message!" 
          onPress={()=>{console.log('it worked!')}}
        />
      </FormLabel>
      <FormInput
        placeholder='Hello friend!'
        onChangeText={this.handleMessage}
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
  
  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
      }}
    />
  );

  handleSearch = input => {
    const formatQuery = input.toLowerCase()
    const filteredContacts = _.filter(this.state.havenContacts, person => {
      return contains(person, formatQuery)
    })
    this.setState({query: input, filteredContacts})
  }

  handleMessage = message => {
    this.setState({ message })
  }

  handleContactsPress = async (id, message) => {
    const contact = await Contacts.getContactByIdAsync(id);
    this.handleSendSMS(contact.phoneNumbers[0].digits, message)
  }

  handleSendSMS = async (number, message = 'hello friend!') => {
    const { status } = await Permissions.askAsync(Permissions.SMS);
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      //let addresses;
      SMS.sendSMSAsync([number], message)
    } else {
      console.log('SMS not available')
    }
  }

  render() {
    return (
      <SafeAreaView>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
          <FlatList
            data={this.state.query.length > 0 ? this.state.filteredContacts: this.state.havenContacts}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                button onPress={() => {this.handleContactsPress(item.id, this.state.message)}}
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