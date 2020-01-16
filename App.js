import React from 'react';
import {Root, Icon} from 'native-base';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {defaultNavigationOptions} from './src/config/navigation';
import {color} from './src/config/color';

import Chat from './src/screens/chat';
import Friends from './src/screens/friends';

import Account from './src/screens/account';
import ChangePassword from './src/screens/account/Password';
import ChangeEmail from './src/screens/account/Email';
import Profile from './src/screens/account/Profile';

import Login from './src/screens/auth/Login';
import SignUp from './src/screens/auth/SignUp';

const FriendsStack = createStackNavigator(
  {Friends},
  {defaultNavigationOptions},
);
const ChatStack = createStackNavigator({Chat}, {defaultNavigationOptions});
const AccountStack = createStackNavigator(
  {Account},
  {defaultNavigationOptions},
);

const BottomTabNavigator = createBottomTabNavigator(
  {
    FriendsStack,
    ChatStack,
    AccountStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        switch (routeName) {
          case 'FriendsStack':
            iconName = 'contacts';
            break;
          case 'ChatStack':
            iconName = 'chatboxes';
            break;
          case 'AccountStack':
            iconName = 'contact';
            break;
          default:
            iconName = 'logo-android';
        }
        return (
          <Icon
            active={focused}
            name={iconName}
            style={{fontSize: 25, color: tintColor}}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: color.col5,
      inactiveTintColor: color.regularGray,
    },
    initialRouteName: 'ChatStack',
    navigationOptions: {headerShown: false},
  },
);

const Auth = createStackNavigator({
  Login,
  SignUp,
});

const Main = createStackNavigator(
  {
    BottomTabNavigator,
    ChangePassword,
    ChangeEmail,
    Profile,
  },
  {defaultNavigationOptions},
);

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Auth,
    Main,
  }),
);

import {Provider} from './src/context';

const App = () => {
  return (
    <Provider>
      <Root>
        <AppContainer />
      </Root>
    </Provider>
  );
};

export default App;
