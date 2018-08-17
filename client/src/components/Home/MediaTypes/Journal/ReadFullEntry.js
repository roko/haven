import React from 'react';
import { TouchableOpacity, Button, Text, View, StyleSheet } from 'react-native';

const ReadFullEntry = (props) => {
  console.log('birds are noisy', props)
  return (
    <View>
      <Button title="Return to Journal Entries" onPress={() => { props.changeView('default') }} />
      <View>
        <Text> {props.entry.title}
        </Text>
        <Text> {props.entry.description}
        </Text>
        <Text> {props.entry.file}
        </Text>
      </View>
      <Button title="Return to Journal Entries" onPress={() => { props.changeView('default') }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  }
});

export default ReadFullEntry;