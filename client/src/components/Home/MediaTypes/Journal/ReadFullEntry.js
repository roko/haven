import React from 'react';
import { TouchableOpacity, Button, Text, View, StyleSheet } from 'react-native';

const ReadFullEntry = (props) => {
  return (
    <View>
      <Button
        color='rgb(26,201,141)'
        title="Return to Journal Entries" onPress={() => { props.changeView('default') }}
        />

      <View style={{
        backgroundColor: 'lightcyan', padding: 10,
        textAlignVertical: "center",
        textAlign: "center"
      }}>
        <View style={{ backgroundColor: 'rgb(26,201,141)'}}>
          <Text style={{ textAlign: "center", color: '#ffffff'}}> {props.entry.title}
          </Text>
          <Text style={{ fontSize: 11, textAlign: "center" }}> {props.entry.description}
          </Text>
        </View>
        <Text> {props.entry.file}
        </Text>
      </View>

      <Button
        color='rgb(26,201,141)'
        title="Return to Journal Entries" onPress={() => { props.changeView('default') }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgb(26,201,141)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default ReadFullEntry;