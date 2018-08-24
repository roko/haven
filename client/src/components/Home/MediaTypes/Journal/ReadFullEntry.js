import React from 'react';
import { TouchableOpacity, Button, Text, View, StyleSheet } from 'react-native';

const ReadFullEntry = (props) => {
  return (
    <View>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { props.changeView('default') }}
        >
          <Text>Return to Journal Entries</Text>
        </TouchableOpacity>
      </View>

         <Text style={{ padding: 5 }}>
          </Text>

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

      <Text style={{ padding: 1}}>
      </Text>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { props.changeView('default') }}
        >
          <Text>Return to Journal Entries</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
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
  text: {
    color: '#ffffff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default ReadFullEntry;