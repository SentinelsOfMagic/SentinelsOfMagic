import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Settings from './Settings';
import ChangeUser from './ChangeUser';
import Login from './Login';

class SettingNavigator extends Component {

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
