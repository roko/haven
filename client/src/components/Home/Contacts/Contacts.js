import React, { Component } from 'react';
import { Text, View, FlatList, Button, Modal, TouchableHighlight, StyleSheet, SafeAreaView } from 'react-native';
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
      modalVisible: false,
      filteredContacts: [],
    }
  }
  
  componentDidMount(){
    this.contactsPermission();
  }

  static navigationOptions = {
    headerTitle: "Contacts",
    headerRight: (
      <Button
        onPress={()=>{}}
        title="add "
        color="green"
      />)
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
      const {data} = await Contacts.getContactsAsync({
        fields: [
          Contacts.PHONE_NUMBERS,
          Contacts.EMAILS,
        ]
      });
      console.log(data)
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
    const contactPhone = await Contacts.getContactByIdAsync({ id }, {fields : [Contacts.PHONE_NUMBERS]} );
    ////console.log(contactPhone)
  }

  handleSendSMS = async () => {
    const { status } = await Permissions.askAsync(Permissions.SMS);

    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // do your SMS stuff here
      let addresses;
      SMS.sendSMSAsync([addresses], message)
    } else {
      // misfortune... there's no SMS available on this device
    }
  }


  render() {
    console.log("contacts state", this.state.contacts)
    return (
      <SafeAreaView>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
          <FlatList
            data={this.state.filteredContacts}
            //data = {this.state.contacts}
            //renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                button onPress={() => {this.handleContactsPress(item.id)}}
                title={`${item.name}`}
                subtitle={item.phoneNumbers[0].digits}
                //avatar={{ uri: item.picture.thumbnail }}
                containerStyle={{ borderBottomWidth: 0 }}
              />
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