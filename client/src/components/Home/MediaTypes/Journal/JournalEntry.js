import React from 'react';
import { Dimensions, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
//alternate coloring so the entries in list show as green, lightcyan, green, lightcyan to differentiate

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

const JournalEntry = (props) => {
  if (props.id < props.entries.length-1) {
    return (
    <View>
      <Text style={{ padding: 1 }}>
      </Text>
      <TouchableOpacity
      onPress={props.changeView.bind(props.id)}
      >
        <View style={styles.container}>
          <Ionicons
            name="md-star-outline"
            size={36}
            color="#ffffff"
          />
            <Text style={{ fontFamily: 'Avenir-Medium', paddingLeft: 15, color: '#ffffff', fontSize: 22 }} >
          {props.data.title}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={props.changeView.bind(props.id)}
        >
        <View style={styles.container}>
            <Text style={{ fontFamily: 'Avenir-Medium', color: '#ffffff', fontSize: 16 }}>
            {props.data.description}</Text>
        </View>
      </TouchableOpacity>
        <Entypo
          name="dots-three-horizontal"
          size={20}
          color="#ffffff"
          style={{ textAlign: 'center' }}
        />
    </View>
    );
  } else {
    return (
      <View>
        <Text style={{ padding: 1 }}>
        </Text>
        <TouchableOpacity
          onPress={props.changeView.bind(props.id)}
        >
          <View style={styles.container}>
            <Ionicons
              name="md-star-outline"
              size={36}
              color="#ffffff"
            />
            <Text style={{ fontFamily: 'Avenir-Medium', paddingLeft: 15, color: '#ffffff', fontSize: 22 }} >
              {props.data.title}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.changeView.bind(props.id)}
        >
          <View style={styles.container}>
            <Text style={{ fontFamily: 'Avenir-Medium', color: '#ffffff', fontSize: 16 }}>
              {props.data.description}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  }
});

export default JournalEntry;