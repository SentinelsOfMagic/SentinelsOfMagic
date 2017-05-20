import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, View } from 'react-native';
import { Button } from 'react-native-material-design';
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
         <Button
          onPress={this.onPressChangeUser}
          overrides={{textColor: '#ffffff', backgroundColor:'#f37735'}}
          text="Change User"
          raised={true}
        />
        <Button
          onPress={this.onPressLogOut}
          overrides={{textColor: '#ffffff', backgroundColor:'#ffc425'}}
          text="Logout"
          raised={true}
          color="#841584"
        />
      </View>
    );
  }
}

export default Settings;
