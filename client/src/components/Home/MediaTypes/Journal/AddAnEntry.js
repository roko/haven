import React from 'react';
import { View, Button, TouchableOpacity, Text, TextInput, AlertIOS, StyleSheet} from 'react-native';

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

          <Text style={{padding:1}}> Title </Text>
          <TextInput
            style={{flexWrap:'wrap', borderColor: 'gray', borderWidth: 1, padding: 2}}
            onChangeText={(title) => this.setState({
              title})}
            value={this.state.title}
            multiline={true}
            editable = {true}
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
            //   maxLength = {40}
          />
          <View>
         </View>

          <Text style={{ padding: 2 }}> Description </Text>
          <TextInput
            style={{ flexWrap: 'wrap', borderColor: 'gray', borderWidth: 1, padding: 2}}
            onChangeText={(description) => this.setState({
              description})}
            value={this.state.description}
            multiline={true}
            editable = {true}
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
            //   maxLength = {40}
          />

          <Text style={{ padding: 1 }}>
          </Text>

          <Text > Some Thoughts </Text>
          <Text style={{fontSize: 12}}> 5,000 character limit </Text>
          <Text style={{ fontSize: 12}}> {5000 - this.state.file.length} characters remaining </Text>
          <TextInput
            style={{flexWrap:'wrap', borderColor: 'gray', borderWidth: 1}}
            onChangeText={(file) => this.setState({
              file})}
            value={this.state.file}
            multiline={true}
            editable = {true}
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
          />
          <Text style={{ padding: 1 }}>
          </Text>

          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.button}
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
                >
                  <Text style={{ color: '#ffffff' }}>Save Entry</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => { this.props.getEntries(); this.props.changeView('default') }}
                >
                  <Text>Nevermind</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>



       </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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