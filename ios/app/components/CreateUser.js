import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import Main from './Main';
import styles from '../style';

class CreateUser extends Component {

  static navigationOptions = { title: 'Add New User' };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onPressMain = this.onPressMain.bind(this);
  }

  onPressSubmit() {
    const { navigate } = this.props.navigation;
    console.log(this.state.username, this.state.password);
  }

  onPressMain() {
    const { navigate } = this.props.navigation;
    navigate('Main');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Add User
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          placeholder="username"
          autoCorrect={false}
        />
        <Button
          onPress={this.onPressSubmit}
          title="Submit"
          color="#841584"
        />
          <Button
          onPress={this.onPressMain}
          title="House Inventory"
          color="#841584"
        />
      </View>
    );
  }
}

export default CreateUser;