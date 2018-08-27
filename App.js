import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createTabNavigator } from "react-navigation";
import LoginScreen from "./client/src/components/Login/Login";
import HomeScreen from "./client/src/components/Home/HomeScreen.js";
import Music from './client/src/components/Home/MediaTypes/Music';
import Journal from './client/src/components/Home/MediaTypes/Journal/Journal';
import PhotoVideo from './client/src/components/Home/MediaTypes/PhotoVideo';
import AuthLoadingScreen from './client/src/components/Login/AuthLoadingScreen';
import Contacts from './client/src/components/Home/Contacts/Contacts';
import Settings from './client/src/components/Home/Preferences/Settings';
import Utilities from './client/src/components/Utilities/Utilities';
import Ionicons from "react-native-vector-icons/Ionicons";


/**
 * Creates a "Stack Navigator" for the main functionality of the app, starting at the home screen
 *
 */
const AppStack = createStackNavigator({ Home: HomeScreen,
  Music,
  Journal,
  PhotoVideo,
  Contacts,
});

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
  //list routes
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

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    initialRouteName: 'Home',
  }
)


const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: Tabs,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);
export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    )
  }
}
