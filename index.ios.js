import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Navigator, NativeModules } from 'react-native';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

import Main from './ios/app/components/Main';
import Login from './ios/app/components/Login';
import SignUp from './ios/app/components/SignUp';
import CreateUser from './ios/app/components/CreateUser';
import styles from './ios/app/style.js';

console.disableYellowBox = true;

class newMobile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const uiTheme = {
      palette: {
        primaryColor: COLOR.green500,
      },
      toolbar: {
        container: {
          height: 100,
        },
      },
    };

    const Nav = StackNavigator({
      Login: { screen: Login },
      SignUp: { screen: SignUp },
      Main: { screen: Main },
      CreateUser: { screen: CreateUser },
    });

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Nav />
      </ThemeProvider>
    );
  }
}


AppRegistry.registerComponent('newMobile', () => newMobile);
