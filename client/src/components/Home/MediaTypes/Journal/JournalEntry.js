import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

//alternate coloring so the entries in list show as green, lightcyan, green, lightcyan to differentiate
const JournalEntry = (props) => {
  if (props.id % 2) {
    return (
      <View>
        <View style={{ backgroundColor: 'rgb(26,201,141)', borderRadius: 45, textAlign: 'center'}}>
          <TouchableOpacity
            style={styles.entry}
            onPress={props.changeView.bind(props.id)}
          >
            <Text style={{ width: '100%', textAlign: 'center' }} >{props.data.title}</Text>
            <Text style={{ width: '100%', textAlign: 'center'}}>
            {props.data.description}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <View style={{ backgroundColor: 'lightcyan', borderRadius: 45, textAlign: 'center' }}>
          <TouchableOpacity
            style={styles.entryOdd}
            onPress={props.changeView.bind(props.id)}
          >
            <Text style={{ width: '100%', textAlign: 'center' }} >{props.data.title}</Text>
            <Text style={{ width: '100%', textAlign: 'center' }} > {props.data.description}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  entry: {
    alignItems: 'center',
    backgroundColor: 'rgb(26,201,141)',
    padding: 10
  },
  entryOdd: {
    alignItems: 'center',
    backgroundColor: 'lightcyan',
    padding: 10
  }
});

export default JournalEntry;