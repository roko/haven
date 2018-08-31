import React from "react";
import Modal from "react-native-modal";
import { Dimensions, AlertIOS, StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from "react-native";
import { MaterialIcons, MaterialCommunityIcons
} from '@expo/vector-icons';
import JournalEntry from "./JournalEntry";
import AddAnEntry from "./AddAnEntry";
import ReadFullEntry from "./ReadFullEntry";

const config = require('./dummyData/dummyConfig');

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export default class Journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      view: 'default',
      userId: 5,
      modalVisible: true,
      needPositive: false,
      positiveImage: '',
      userFirstName: 'Bob',
      phoneNumbersOfTrustedConfidantes: ['4155181582'],
      setMessageForSupport: 'has been feeling really down recently and would appreciate your moral support!',
      supportEntriesMinimumRequirement: 5,
      currentLowSentiment: 3
    }
    //need to update userFirstName, phoneNumbersOfTrustedConfidantes, setMessageForSupport, userId, supportEntriesMinimumRequirement, currentLowSentiment to be real data as these are currently hardcoded temporarily
    //update these so when user logs in there is a fetch request from db to retrieve user table info

    this.getEntries = this.getEntries.bind(this);
    this.changeView = this.changeView.bind(this);
    this.analyzeEntry = this.analyzeEntry.bind(this);
    this.obtainPositivity = this.obtainPositivity.bind(this);
    this.closeQuoteModal = this.closeQuoteModal.bind(this);
    this.checkIfSupportRequestShouldBeSent = this.checkIfSupportRequestShouldBeSent.bind(this);
    this.requestSupport = this.requestSupport.bind(this);
  }

  componentDidMount() {
    this.getEntries();
  }

  changeView(newView) {
    this.setState({
      view: newView
    })
    console.log('currentview', this.state.view)
  }

  //update in the dummyConfig file so the journalEndpoint's value is your router IP
  getEntries() {
    let endpoint = config.journalEndpoint.fetch + ':3000/journal/';
    console.log('whats the endpoint', endpoint)

    fetch(endpoint + this.state.userId)
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
    //need to increment id by 1 as database table requires id to be unique. Check for data length first in case there are currently no entries yet.
    let id = this.state.data.length ? (this.state.data[this.state.data.length - 1].id + 1) : 1

    fetch(endpoint, { method: "POST", headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ id: id, userId: this.state.userId, title: content.title, description: content.description, file: content.file }) })
      .then((responseData) => {
        AlertIOS.alert(
          "Entry saved!",
          "Go back to my Journal -> "
        )
      })
      .done(() => { this.getEntries(); this.changeView('default') });
  }

  checkIfSupportRequestShouldBeSent() {
    console.log('sentimentcount', this.state.currentLowSentiment);
    //update later so a patch request is sent to server to update the currentLowSentiment count of the logged in user
    //if currentLowSentiment count has reached the set supportEntriesMinimumRequirement number that user has chosen in Settings then requestSupport gets called
    //for now this is hardcoded so if user reaches 5 entries of low sentiment everyone on their contacts list marked as support will receive a text requesting some moral support for user - need to input user's name, pull contact's numbers for the request and use either default message or customized message that user had inputted in settings and also update the currentLowSentiment count in database

    if (this.state.currentLowSentiment + 1 === this.state.supportEntriesMinimumRequirement) {
      this.requestSupport();
      this.setState({
        currentLowSentiment: 0
      })
    } else {
      this.setState({
        currentLowSentiment: this.state.currentLowSentiment + 1
      })
    }
  }

  //this sends a request to Twilio API so all of the user's contact numbers who are set to Support mode will get a text message
  requestSupport() {
    let endpoint = '' + config.journalEndpoint.fetch + ':3000/support/';

    fetch(endpoint, { method: "POST", headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ userFirstName: this.state.userFirstName, phoneNumbersOfTrustedConfidantes: this.state.phoneNumbersOfTrustedConfidantes, setMessageForSupport: this.state.setMessageForSupport }) })
      .then((responseData) => {
        console.log('some support has been requested!')
      })
  }

  //this sends a request with body of inputted journal entry to Microsoft Text Analytics so the data can be parsed through for a sentiment score. As the Analytics service is not 100% accurate this is set so the sentiment has to be less the 0.1 to trigger the request for a motivational quote image.
  analyzeEntry(content) {
    let endpoint = '' + config.journalEndpoint.fetch + ':3000/analyze/';

    fetch(endpoint + content)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        if (Number(response) < 1 / 10) {
          this.checkIfSupportRequestShouldBeSent();
          this.setState({ needPositive: true });
          this.obtainPositivity();
        }
      })
  }

  //this sends a request to the healthruwords API - as there are occasional broken/incomplete links returned from this API I have created a backupImages array of working imgur links as a placeholder so user wil always get some sort of motivational/positive image even if API returns unuseable link
  obtainPositivity() {
    let endpoint = config.journalEndpoint.fetch + ':3000/positive/';

    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        //check if API returned a broken link
        //if it is broken then replace with a generic link
        if (((response.slice(response.length - 4) === '.jpg') || response.slice(response.length - 4) === '.png')) {
          this.setState({
            positiveImage: response
          })
        } else {
          let backupImages = ['http://healthruwords.com/wp-content/uploads/2014/02/inspirational-motivational-image-quotes-quotations-quotes-of-the-day-roxanajones-com-you-are-your-prophecy-300x289.jpg', 'http://healthruwords.com/wp-content/uploads/2016/07/Healthruwords.com_-_Inspirational_Images_-_From-Thoughts-to-Things-300x300.jpg', 'http://healthruwords.com/wp-content/uploads/2014/10/Nov-14-The-Invisible-Bridge-300x300.jpg', 'http://healthruwords.com/wp-content/uploads/2015/08/healthruwords-com_-_inspirational_images_-_-hearts-beliefs-300x300.jpg', 'http://healthruwords.com/wp-content/uploads/2014/10/Oct-16-Present-Peace-300x300.jpg', 'http://healthruwords.com/wp-content/uploads/2016/09/Healthruwords.com_-_Inspirational_Images_-_Imagination-over-Knowledge-300x300.jpg'];

          this.setState({
            positiveImage: backupImages[Math.floor(Math.random() * backupImages.length)]
          })
        }
      })
  }

  closeQuoteModal () {
    this.setState({ needPositive: false })
  }

  clearPositiveImage () {
    this.setState({
      positiveImage: ''
    })
  }

  render() {

    if (this.state.needPositive) {
      console.log('plz render')
      return (
        <View>
          <ImageBackground
              source={require('../../../../../assets/img/gradient-background-image.png')}
              style={{ width: '100%', height: '100%' }}
            >
            <View style={{
              width: DEVICE_WIDTH - 15,
              justifyContent: "space-between",
              flexDirection: "row",
              paddingLeft: 15,
              marginTop: 80,}}>
              <TouchableOpacity onPress={() => {this.closeQuoteModal(); this.clearPositiveImage()}}>
                <View style={{ justifyContent: 'center'}}>

                  <Image
                    source={{
                      uri: this.state.positiveImage
                    }}
                    style={{ width: 350, height: 350 }} />
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      );
    }

    //previous journal entries for user to go back to view/edit/delete?
    //make scrollable/change to grid view etc? stretch goal for user settings - user can customize if they want to switch to grid view instead of default list scrollable view?
    //stretch goal for user settings - let user customize journal colors?

    if (this.state.view === 'default') {
      return (
        <View>
          <ImageBackground
            source={require('../../../../../assets/img/gradient-background-image.png')}
            style={{ width: '100%', height: '100%' }}
          >
            <View style={styles.navRow}>
              <MaterialIcons
                name="library-add"
                size={32}
                color="#ffffff"
                onPress={() => { this.changeView('makeEntry') }}
              />
              <MaterialCommunityIcons
                name="home-outline"
                size={30}
                color="#ffffff"
                onPress={() => this.props.navigation.navigate("Home")}
              />
            </View>
            <FlatList
              style={styles.flatList}
              data={this.state.data}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <View>
                  <JournalEntry
                    entries={this.state.data}
                    changeView={this.changeView.bind(this, item)}
                    data={item}
                    id={index}
                  />
                </View>
              )}
            />
          </ImageBackground>
        </View>
      );
    }

    if (this.state.view === 'makeEntry') {
      return (
        <View>
          <ImageBackground
            source={require('../../../../../assets/img/gradient-background-image.png')}
            style={{ width: '100%', height: '100%' }}
          >
            <AddAnEntry
              analyzeEntry={this.analyzeEntry}
              changeView={this.changeView}
              getEntries={this.getEntries}
              saveEntry={this.saveEntry.bind(this)} />
          </ImageBackground>
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
    alignItems: "center",
    justifyContent: "center"
  },
  flatList: {
    padding: 10
  },
  button: {
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgb(26,201,141)',
    borderRadius: 10,
    borderWidth: 1
  },
  navRow: {
    height: 40,
    width: DEVICE_WIDTH - 15,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingLeft: 15,
    marginTop: 45,
  },
  text: {
    color: '#ffffff'
  }
});