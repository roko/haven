import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const JournalEntry = (props) => {
    console.log('is this even rendering')
    if (props.id % 2) {
        return (
          <View style={{ backgroundColor: 'aquamarine' }} >
          <TouchableOpacity onPress={props.onPressItem.bind(this)}>
            <Text>{props.data.title}</Text>
            <Text>{props.data.description}</Text>
          </TouchableOpacity>
          </View>
        );
    } else {
      return (
        <View style={{ backgroundColor: 'lightcyan' }} >
        <TouchableOpacity onPress={props.onPressItem.bind(this)}>
          <Text>{props.data.title}</Text>
          <Text>{props.data.description}</Text>
        </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  }
});

export default JournalEntry;