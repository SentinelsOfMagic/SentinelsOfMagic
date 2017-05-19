import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';
import styles from '../style';

class Login extends Component {

  static navigationOptions = {
    title: 'Login',
    headerLeft: null
  };

  constructor(props) {
    super(props);
    this.state = {
      houseName: '',
      password: '',
      userArray: []

    };
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onPressSignUp = this.onPressSignUp.bind(this);
  }

  onPressSubmit() {
    const { navigate } = this.props.navigation;

    const houseName = this.state.houseName;
    const password = this.state.password;

    axios.post('http://127.0.0.1:8080/auth/login', {
      houseName: houseName,
      password: password
    })
    .then((response) => {
      if (response && response.data.length > 0) {
        const userArray = response.data;
        navigate('CreateUser', {userArray: userArray});
      } else {
        throw new Error('no existing users');
      }
    })
    .catch((err) => {
      console.log('Error occurred during login:', err);
    });
  }

  onPressSignUp() {
    const { navigate } = this.props.navigation;
    navigate('SignUp');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome
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
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Button
          onPress={this.onPressSubmit}
          title="Submit"
          color="#841584"
        />
        <Button
          onPress={this.onPressSignUp}
          title="New User Sign Up"
          color="#841584"
        />
      </View>
    );
  }
}

export default Login;
