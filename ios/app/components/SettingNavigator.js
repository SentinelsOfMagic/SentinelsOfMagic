import React, { Component } from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Settings from './Settings';
import ChangeUser from './ChangeUser';
import Login from './Login';
import styles from '../style';

class SettingNavigator extends Component {

  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/settings-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    )
  };

  constructor(props) {
    super(props);
  }

  nav(str, params) {
    const { navigate } = this.props.navigation;
    navigate(str, params);
  }

  render() {
    const SettingNav = StackNavigator({
      Settings: { screen: Settings },
      ChangeUser: { screen: ChangeUser },
      Login: { screen: Login },
    });

    const screenProps = this.props.screenProps;
    screenProps.navInSettingNav = this.nav.bind(this);

    return (
      <SettingNav screenProps={screenProps} />
    );
  }
}

export default SettingNavigator;
