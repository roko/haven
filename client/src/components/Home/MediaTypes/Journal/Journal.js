import React from "react";
import Modal from "react-native-modal";
import { AlertIOS, AsyncStorage, Button, StyleSheet, View, StatusBar, Text, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import JournalEntry from "./JournalEntry";
import AddAnEntry from "./AddAnEntry";
import ReadFullEntry from "./ReadFullEntry";
import config from "./../../../../../../server/config";
// import dummyData from "./dummyData/journalData.js";
// import { List, ListItem } from "react-native-elements";

export default class Journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      view: 'default',
      userId: 5,
      modalVisible: true,
      needPositive: false,
      positiveImage: ''
    }
    this.getEntries = this.getEntries.bind(this);
    this.changeView = this.changeView.bind(this);
    this.analyzeEntry = this.analyzeEntry.bind(this);
    this.obtainPositivity = this.obtainPositivity.bind(this);
    this.closeQuoteModal = this.closeQuoteModal.bind(this);
  }
  //userId is set to 5 as a default, update this when we get some info from the login?

  componentDidMount() {
    this.getEntries();
  }

  changeView(newView) {
    this.setState({
      view: newView
    })
    console.log('currentview', this.state.view)
  }

  getEntries() {
    let endpoint = config.journalEndpoint.fetch + ':3000/journal/';
    console.log('whats the endpoint', endpoint)

    fetch('http://192.168.0.103:3000/journal/' + this.state.userId)
      .then((response) => response.json())
      .then((response) => {
        console.log('heres data', response)
        this.setState({
          data: response
        })
      })
      .catch((error) => {
        console.log(error, 'could not get data from server')
      })
  }

  saveEntry(content) {
    let endpoint = '' + config.journalEndpoint.fetch + ':3000/journal/';
    let id = (this.state.data[this.state.data.length - 1].id + 1) || 1
    //make sure url is not set to https and set to your ip address instead of localhost or it will give that red error in simulator

    //get id to autogenerate as db currently requires it to be unique, until then - manually change the id value each time this is tested
    fetch(endpoint, { method: "POST", headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ id: id, userId: this.state.userId, title: content.title, description: content.description, file: content.file }) })
      .then((responseData) => {
        AlertIOS.alert(
          "Entry saved!",
          "Go back to my Journal -> "
        )
      })
      .done(() => { this.getEntries(); this.changeView('default') });
  }


  analyzeEntry(content) {
    let endpoint = '' + config.journalEndpoint.fetch + ':3000/analyze/';

    fetch(endpoint + content)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        if (Number(response) < 1 / 10) {
          this.setState({ needPositive: true });
          this.obtainPositivity();
        } else {
          AlertIOS.alert(
            "Woohoo!"
          )
        }
      })
  }

  obtainPositivity() {
    let endpoint = '' + config.journalEndpoint.fetch + ':3000/positive/';

    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          positiveImage: response
        })
      })
  }

  closeQuoteModal = () =>
    this.setState({ needPositive: false })

  render() {
    console.log('rerendering');
    if (this.state.needPositive) {
      console.log('plz render')
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={this.closeQuoteModal}>
            <Image
            source={{
              uri: this.state.positiveImage}}
              onError={() => this.setState({ uri: "https://www.rd.com/wp-content/uploads/2018/01/01-motivational-quotes-about-success-quotable-quotes-nicole-fornabaio-rd-com-760x506.jpg" })}
            style={{ width: 390, height: 390 }} />
          </TouchableOpacity>
          <Modal isVisible={this.state.needPositive}>
            <View style={{ flex: 1 }}>
              <Text>Hello!</Text>
              <TouchableOpacity onPress={this.closeQuoteModal}>
                <Text>Hide me!</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      );
    }
    //previous journal entries for user to go back to view/edit/delete?
    //make scrollable/change to grid view etc? stretch goal for user settings - user can customize if they want to switch to grid view instead of default list scrollable view?
    //stretch goal for user settings - let user customize journal colors?

    if (this.state.view === 'default') {
      return (
        <View>
          <Button title="Add some thoughts" onPress={() => { this.changeView('makeEntry') }} />
          <Text> My thoughts </Text>
          <FlatList
            style={styles.flatList}
            data={this.state.data}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
              <JournalEntry
                changeView={this.changeView.bind(this, item)}
                data={item}
                id={index}
              // onPressItem={() => this.changeView.bind(this, item)}
              />)}
          />
        </View>
      );
    }

    if (this.state.view === 'makeEntry') {
      return (
        <View>
          <AddAnEntry
            analyzeEntry={this.analyzeEntry}
            changeView={this.changeView}
            getEntries={this.getEntries}
            saveEntry={this.saveEntry.bind(this)} />
        </View>
      )
    }

    return (
      <ReadFullEntry
        changeView={this.changeView.bind(this)}
        entry={this.state.view} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  flatList: {
    padding: 10,
    textAlignVertical: "center",
    textAlign: "center"
  }
});