import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, View, Button } from 'react-native';
import CreateUser from './CreateUser';
import Login from './Login';
import styles from '../style';

class Settings extends Component {

  static navigationOptions = { title: 'Settings' };

  constructor(props) {
    super(props);

    this.onPressChangeUser = this.onPressChangeUser.bind(this);
    this.onPressLogOut = this.onPressLogOut.bind(this);
  }

  onPressChangeUser() {
    const { navigate } = this.props.navigation;

    navigate('ChangeUser')
  }

  onPressLogOut() {
    const { navigate } = this.props.navigation;
    this.props.screenProps.navInMain('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Settings
        </Text>
         <Button
          onPress={this.onPressChangeUser}
          title="Change User"
          color="#841584"
        />
        <Button
          onPress={this.onPressLogOut}
          title="Logout"
          color="#841584"
        />
      </View>
    );
  }
}

export default Settings;
