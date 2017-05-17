import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import styles from '../style';

class SignUp extends Component {

  static navigationOptions = { title: 'Sign Up' };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onPressSubmit = this.onPressSubmit.bind(this);
  }

  onPressSubmit() {
    const { navigate } = this.props.navigation;
    console.log(this.state.username, this.state.password);
    navigate('Main');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Sign Up
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          placeholder="username"
          autoCorrect={false}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(password) => this.setState({password})}
          placeholder="password"
          autoCorrect={false}
        />
        <Button
          onPress={this.onPressSubmit}
          title="Submit"
          color="#841584"
        />
      </View>
    );
  }
}

export default SignUp;
