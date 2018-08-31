import React, { Component } from 'react';
import { Text, View, FlatList, Button, Modal, TouchableHighlight, StyleSheet, SafeAreaView, AsyncStorage, ImageBackground } from 'react-native';
import { SearchBar, List, ListItem, Avatar } from "react-native-elements";
import { Contacts, Permissions, SMS } from 'expo';
import { contains } from './ContactsHelpers';
import _ from 'lodash';

class ModalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredContacts: []
    };
  }

  componentDidMount() {
    this.contactsPermission();
  }

  renderHeader = () => (
    <SearchBar
      placeholder="Search your contacts"
      placeholderTextColor="white"
      round
      containerStyle={{
        backgroundColor: "transparent",
        borderBottomColor: "transparent",
        borderTopColor: "transparent"
      }}
      inputContainerStyle={{ backgroundColor: "white" }}
      inputStyle={{ backgroundColor: "white" }}
      onChangeText={this.handleSearch}
    />
  );

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerLeft: <Button onPress={() => navigation.goBack()} title="< Back" />,
      headerTitle: "Add to Your Haven"
    };
  };

  /**
   * Prompts the user for permission.
   * If permission is granted, it currently accesses all the contacts data and returns it.
   * One can pass a query to getContactsAsync to filter a contact
   * This function is currently coupled, might be wise to decouple once * * * functionality is implemented
   */
  contactsPermission = async () => {
    //this process is slow, maybe cache this? or a spinner?
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);

    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.PHONE_NUMBERS, Contacts.EMAILS]
      });
      this.setState({ contacts: data });
      return;
    } else {
      throw new Error("Contacts permission not granted");
    }
  };

  handleSearch = input => {
    const formatQuery = input.toLowerCase();
    const filteredContacts = _.filter(this.state.contacts, person => {
      return contains(person, formatQuery);
    });
    this.setState({ query: input, filteredContacts });
  };

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

  handleContactsPress = async id => {
    const contact = await Contacts.getContactByIdAsync(id);
    this.saveContactToStorage(id);
  };

  saveContactToStorage = async key => {
    try {
      await AsyncStorage.setItem(key, key);
      this.props.navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <SafeAreaView>
        <ImageBackground
          source={require("../../../../assets/img/gradient-background-image.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <List
            containerStyle={{
              borderTopWidth: 0,
              borderBottomWidth: 0,
              marginTop: 0,
              backgroundColor: "transparent"
            }}
          >
            <FlatList
              data={this.state.filteredContacts}
              renderItem={({ item }) => (
                <ListItem
                  roundAvatar
                  button
                  onPress={() => {
                    this.handleContactsPress(item.id);
                  }}
                  title={`${item.name}`}
                  titleStyle={{ color: "white", fontFamily: "Avenir-Medium" }}
                  subtitle={item.phoneNumbers && item.phoneNumbers[0].digits}
                  subtitleStyle={{
                    color: "#d3d3d3",
                    fontFamily: "Avenir-Medium"
                  }}
                  containerStyle={{ borderBottomWidth: 0 }}
                  avatar={<Avatar size={200}
                    rounded
                    overlayContainerStyle={{ backgroundColor: 'white' }}
                    icon={{ name: "plus-one", color: "tomato" }}
                    onPress={() => console.log("Works!")} activeOpacity={0.7} />
                  }
                  
                />
              )}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              keyExtractor={item => item.id}
              automaticallyAdjustContentInsets={false}
            />
          </List>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default ModalScreen;