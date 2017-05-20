import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-material-design';
import { TextField } from 'react-native-material-textfield';
import axios from 'axios';
import styles from '../style';

class Login extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      houseName: '',
      password: '',
      userArray: [],
      error: null
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
      console.log('Error occurred during login:', err.response.data.message);
      this.setState({ error: err.response.data.message })
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
          Login
        </Text>
        <TextField
          onChangeText={(houseName) => this.setState({houseName})}
          label="House Name"
          value={this.state.houseName}
          autoCorrect={false}
          autoCapitalize="none"
          error={this.state.error}
        />
        <TextField
          onChangeText={(password) => this.setState({password})}
          label="Password"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          error={this.state.error}
        />
        <View style={styles.button}>
          <Button
            onPress={this.onPressSubmit}
            text="Login"
            raised={true}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.onPressSignUp}
            text="Go To Sign Up"
            raised={true}
          />
        </View>
      </View>
    );
  }
}

export default Login;
