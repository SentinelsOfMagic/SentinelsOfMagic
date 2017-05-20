import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Main from './ios/app/components/Main';
import Loading from './ios/app/components/Loading';
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
    const Nav = StackNavigator({
      Loading: { screen: Loading },
      Login: { screen: Login },
      SignUp: { screen: SignUp },
      Main: { screen: Main },
      CreateUser: { screen: CreateUser },
    });

    return (
      <Nav />
    );
  }
}

AppRegistry.registerComponent('newMobile', () => newMobile);
