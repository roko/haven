import React from 'react';
import {View, Button, TouchableOpacity, Text, TextInput } from 'react-native';

export default class AddAnEntry extends React.Component {
    constructor(props) {
      super(props);
      this.state = { text: '', height: 40 };
    }
    
    updateSize = (height) => {
        this.setState({
          height
        });
      }

    render() {
      return (
        <View>
          <TextInput
            style={{flexWrap:'wrap', borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({
                text})}
            value={this.state.text}
            multiline={true}
            editable = {true}
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
            //   maxLength = {40}
          />
          <Button title="Save Entry" onPress={()=>{this.props.saveEntry(this.state.text)}} />
          <Button title="Nevermind" onPress={()=>{this.props.changeView('default')}} />
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