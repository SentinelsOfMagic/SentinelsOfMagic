import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';
import CreateUser from './CreateUser';
import styles from '../style';

class SignUp extends Component {

  static navigationOptions = { title: 'Sign Up' };

  constructor(props) {
    super(props);
    this.state = {
      houseName: '',
      password: ''
    };
    this.onPressSubmit = this.onPressSubmit.bind(this);
  }

  onPressSubmit() {
    const { navigate } = this.props.navigation;

    const houseName = this.state.houseName;
    const password = this.state.password;

    axios.post('http://127.0.0.1:8080/auth/signup', {
      houseName: houseName,
      password: password
    })
    .then((response) => {
      console.log('Sign up success');
      navigate('Login');
    })
    .catch((err) => {
      console.log('Error occurred during signup:', err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Sign Up
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(houseName) => this.setState({houseName})}
          value={this.state.houseName}
          placeholder="House Name"
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
