import React from 'react';
import { Dimensions, View, Button, TouchableOpacity, Text, TextInput, AlertIOS, StyleSheet} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export default class AddAnEntry extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        title: '',
        description: '',
        file:'',
        height: 40,
        characterCount: 0
      };
    }

    updateSize (height) {
        this.setState({
          height
        });
      }

      //upon submitting entry:
      //length of entry is checked as the Microsoft Text Analytics has a limit of 5,000 characters
      //if entry is not over the limit it is sent to be analyzed for sentiment score
      render() {
      return (
        <View>
          <View style={styles.navRow}>
            <Ionicons
              name="md-add"
              size={26}
              color="#ffffff"
              onPress={
                () => {
                    if (this.state.file.length <= 5000) {
                        this.props.analyzeEntry(this.state.file);
                        this.props.saveEntry({ title: this.state.title, description: this.state.description, file: this.state.file })
                    } else {
                      AlertIOS.alert(
                        "Sorry, this entry is over 5,000 characters. Please shorten entry. Thank you!"
                      )
                    }
                }
              }
            />

            <Entypo
                name="cross"
                size={26}
                color="#ffffff"
                onPress={() => { this.props.getEntries(); this.props.changeView('default') }}
            />
          </View>

          <Text style={{ padding: 3}}>
          </Text>

          <TextInput
            style={{ flexWrap: 'wrap', borderColor: 'transparent', borderWidth: 1, padding: 2, paddingLeft: 10, fontSize: 24 }}
            onChangeText={(title) => this.setState({
              title})}
            value={this.state.title}
            multiline={true}
            editable = {true}
            placeholder="Title"
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
          />

          <Text style={{ padding: 3 }}>
          </Text>

          <TextInput
            style={{ flexWrap: 'wrap', borderColor: 'transparent', borderWidth: 1, padding: 2, paddingLeft: 10, fontSize: 24}}
            onChangeText={(description) => this.setState({
              description})}
            value={this.state.description}
            multiline={true}
            editable = {true}
            placeholder="Description"
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
          />

          <Text style={{ padding: 3 }}>
          </Text>

          <TextInput
            style={{flexWrap:'wrap', borderColor: 'transparent', borderWidth: 1, paddingLeft: 10, fontSize: 24}}
            onChangeText={(file) => this.setState({
              file})}
            value={this.state.file}
            multiline={true}
            editable = {true}
            placeholder="Thoughts"
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
          />
          <Text style={{ padding: 1 }}>
          </Text>

          <View style={{
                width: DEVICE_WIDTH - 15,
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexDirection: "row",
                paddingLeft: 15}}>
          <Text style={{fontSize: 14, color: '#ffffff'}}> 5,000 character limit </Text>
          <Text style={{ fontSize: 14, color: '#ffffff'}}> {5000 - this.state.file.length} characters remaining </Text>
        </View>

       </View>
      );
    }
}

const styles = StyleSheet.create({
  navRow: {
      height: 40,
      width: DEVICE_WIDTH - 15,
      justifyContent: "space-between",
      alignItems: "flex-end",
      flexDirection: "row",
      paddingLeft: 15,
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
  button2: {
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'lightcyan',
    borderRadius: 10,
    borderWidth: 1
  },
  flatList: {
    padding: 10,
    textAlignVertical: "center",
    textAlign: "center"
  },
  buttonContainer: {
    flex: 1,
  }
});
//passes state contents into prop method from parent Journal component
// these contents get sent to server in post req to be saved to db
//popup message to user to show entry was saved
//then autoclear field  and change view back to default to show the
//list of updated entries


//give these buttons diff colors and space them apart so user does not misclick easily