import React from "react";
//import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View, Button } from "react-native";
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";

import LoginScreen from "./client/src/components/Login/Login";
import HomeScreen from "./client/src/components/Home/HomeScreen.js";
import Music from './client/src/components/Home/MediaTypes/Music';
import MusicPlayer from './client/src/components/Home/MediaTypes/MusicPlayer';
import Journal from './client/src/components/Home/MediaTypes/Journal/Journal';
import PhotoVideo from './client/src/components/Home/MediaTypes/PhotoVideo';
import AuthLoadingScreen from './client/src/components/Login/AuthLoadingScreen';
import Contacts from './client/src/components/Home/Contacts/Contacts';
import Settings from './client/src/components/Home/Preferences/Settings';
import Utilities from './client/src/components/Utilities/Utilities';
import ModalScreen from './client/src/components/Home/Contacts/ContactsAdd'
import Ionicons from "react-native-vector-icons/Ionicons";
import store from './client/src/redux/store';
import {Provider} from 'react-redux';

const ContactsStack = createStackNavigator(
  {
    Contacts: {
      screen: Contacts,
      navigationOptions: {
         //title: "testing"
      }
    },
    AddContactModal: {
      screen: ModalScreen,
      navigationOptions: {
        //header: null
        title: "Add to Your Haven"
      }
    }
  },
  {
    initialRouteName: "Contacts",
    //headerMode: "none"
  }
);

/**
 * Creates a "Stack Navigator" for the main functionality of the app, starting at the home screen
 *
 */
const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Journal,
    PhotoVideo,
    ContactsStack: {
      screen: ContactsStack,
      navigationOptions: { header: null },
    },
    Music: {
      screen: Music,
      navigationOptions: { title: "Music" },
    },
    AudioPlayerlistEntry: {
      screen: navigation => (
        <AudioPlayerlistEntry {...navigation} text="AudioPlayerlistEntry" />
      ),
      navigationOptions: { title: "AudioPlayerlistEntry" }
    },
    MusicPlayer: {
      screen: MusicPlayer,
      navigationOptions: { title: "MusicPlayer" }
    }
  },
  {
    headerMode: "screen",
    //headerMode: "none"
  }
);

/**
 * Creates a "Stack Navigator" pertaining to signup and authorization
 *
 */
const AuthStack = createStackNavigator({ SignIn: LoginScreen });

/**
 * The entry point into the app, creates a "Switch Navigator"
 *
 */
const Tabs = createBottomTabNavigator(
  {
    Settings: Settings,
    Home: AppStack,
    Utilities: Utilities
  }, {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        } else if (routeName === 'Utilities') {
          iconName = `ios-beer${focused ? "" : "-outline"}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    initialRouteName: 'Home',
  }
);

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: Tabs,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading",
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
};
