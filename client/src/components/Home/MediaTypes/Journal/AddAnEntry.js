import React from 'react';
import {View, Button, TouchableOpacity, Text, TextInput } from 'react-native';

export default class AddAnEntry extends React.Component {
    constructor(props) {
      super(props);
      this.state = { title: '', description: '', file:'', height: 40 };
    }

    updateSize = (height) => {
        this.setState({
          height
        });
      }

    render() {
      return (
        <View>
          <Text> Title </Text>
          <TextInput
            style={{flexWrap:'wrap', borderColor: 'gray', borderWidth: 1}}
            onChangeText={(title) => this.setState({
              title})}
            value={this.state.title}
            multiline={true}
            editable = {true}
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
            //   maxLength = {40}
          />
          <Text> Description </Text>
          <TextInput
            style={{flexWrap:'wrap', borderColor: 'gray', borderWidth: 1}}
            onChangeText={(description) => this.setState({
              description})}
            value={this.state.description}
            multiline={true}
            editable = {true}
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
            //   maxLength = {40}
          />
          <Text> Some Thoughts </Text>
          <TextInput
            style={{flexWrap:'wrap', borderColor: 'gray', borderWidth: 1}}
            onChangeText={(file) => this.setState({
              file})}
            value={this.state.file}
            multiline={true}
            editable = {true}
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
            //   maxLength = {40}
          />
          <Button title="Save Entry" onPress={()=>{this.props.saveEntry({title: this.state.title, description: this.state.description, file: this.state.file})}} />
          <Button title="Nevermind" onPress={()=>{this.props.getEntries();this.props.changeView('default')}} />
       </View>
      );
    }
}
//passes state contents into prop method from parent Journal component
// these contents get sent to server in post req to be saved to db
//popup message to user to show entry was saved
//then autoclear field  and change view back to default to show the
//list of updated entries


//give these buttons diff colors and space them apart so user does not misclick easily