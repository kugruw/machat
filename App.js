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

const AuthStack = createStackNavigator({
  Login,
  SignUp,
});

const FriendsStack = createStackNavigator(
  {
    Friends,
  },
  {defaultNavigationOptions},
);

const ChatStack = createStackNavigator(
  {
    Chat,
  },
  {defaultNavigationOptions},
);

const AccountStack = createStackNavigator({
  Account,
  ChangePassword,
  ChangeEmail,
});

const BottomTabNavigator = createBottomTabNavigator(
  {
    Friends: FriendsStack,
    Chat: ChatStack,
    Account: AccountStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Friends':
            iconName = 'contacts';
            break;
          case 'Chat':
            iconName = 'chatboxes';
            break;
          case 'Account':
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
  },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      BottomTabNavigator,
    },
    {initialRouteName: 'Auth'},
  ),
);

const App = () => {
  return (
    <Root>
      <AppContainer />
    </Root>
  );
};

export default App;
