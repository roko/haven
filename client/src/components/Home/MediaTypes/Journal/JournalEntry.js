import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const JournalEntry = (props) => {
    console.log('is this even rendering')
  return (
    <TouchableOpacity onPress={props.onPressItem}>
      <Text>{props.data.title}</Text>
      <Text>{props.data.description}</Text>
    </TouchableOpacity>
  );
}

export default JournalEntry;