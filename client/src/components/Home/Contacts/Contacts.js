import React, { Component } from 'react';
import { Text, View, FlatList, Button, TouchableOpacity, StyleSheet, SafeAreaView, AsyncStorage, ImageBackground, Dimensions } from 'react-native';
import { SearchBar, List, ListItem, FormInput, FormLabel, Avatar, FormValidationMessage } from "react-native-elements";

import {Contacts, Permissions, SMS} from 'expo';
import {MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'
import { contains } from './ContactsHelpers';
import _ from 'lodash';

/**
 * Expo Documentation for getting contacts:
 * {@link https://docs.expo.io/versions/v29.0.0/sdk/contacts}
 *
 */
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");


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
      header: null,
      // headerTitle: "Contacts",
      // headerLeft: (
      //   <Button
      //     onPress={()=>{navigation.navigate("Home")}}
      //     title="< Back"
      //   />
      // ),
      // headerRight: (
      //   <Button
      //     onPress={() => { navigation.navigate("AddContactModal") }}
      //     title="Add"
      //     color="green"
      //     size={28}
      //   />
      // )
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
      placeholder="Search your Haven..."
      placeholderTextColor='grey'
      round
      containerStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
      inputContainerStyle={{ backgroundColor: 'white',  }}
      inputStyle={{ backgroundColor: 'white' }}
      onChangeText={this.handleSearch}
    />
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
        placeholderTextColor='#d3d3d3'
        onChangeText={this.handleMessage}
        inputStyle={{color:'white', fontFamily:'Avenir-Medium' }}
    />
      {/* <FormValidationMessage>Error message</FormValidationMessage> */}

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

  renderNavRow = () => (
    <View style={styles.navRow}>

      <TouchableOpacity>
        <MaterialIcons
          name="library-add"
          size={32}
          color="#ffffff"
          onPress={() => { this.props.navigation.navigate("AddContactModal") }}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <MaterialCommunityIcons
          name="home-outline"
          size={30}
          color="#ffffff"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </TouchableOpacity>

    </View>
  )

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
    return <View>
        <ImageBackground source={require("../../../../assets/img/gradient-background-image.png")} style={{ width: "100%", height: "100%" }}>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0, backgroundColor: 'transparent', }}>
          {this.renderNavRow()}
            <FlatList
              data={this.state.query.length ? this.state.filteredContacts : this.state.havenContacts}
              renderItem={({ item }) =>
                <ListItem
                  roundAvatar
                  button onPress={() => {
                    this.handleContactsPress(item.id, this.state.message);
                  }}
                  title={`${item.name}`}
                  titleStyle={{color:'white', fontFamily:'Avenir-Medium'}}
                  subtitle={item.phoneNumbers && item.phoneNumbers[0].number}
                  subtitleStyle={{ color: '#d3d3d3', fontFamily:'Avenir-Medium'}}
                  avatar={<Avatar size={200}
                    rounded
                    overlayContainerStyle={{ backgroundColor: 'white' }}
                    icon={{ name: "star", color: "tomato" }}
                    onPress={() => console.log("Works!")} activeOpacity={0.7} />
                  }
                  containerStyle={{ borderBottomWidth: 0 }} />}
                  ItemSeparatorComponent={this.renderSeparator}
                  ListHeaderComponent={this.renderHeader}
                  ListFooterComponent={this.renderFooter}
                  keyExtractor={item => item.id}
                  automaticallyAdjustContentInsets={false} />
          </List>
        </ImageBackground>
      </View>;
  }
}

const styles = StyleSheet.create({
  homeButtonRow: {
    height: 40,
    paddingRight: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 45,
  },
  navRow: {
    height: 40,
    width: DEVICE_WIDTH - 15,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingLeft: 15,
    marginTop: 45,
  }
})