import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-material-design';
import { TextField } from 'react-native-material-textfield';
import axios from 'axios';
import CreateUser from './CreateUser';
import styles from '../style';

class SignUp extends Component {

  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      houseName: '',
      password: '',
      error: null
    };
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onPressLogin = this.onPressLogin.bind(this);
  }

  onPressLogin() {
    const { goBack } = this.props.navigation;
    goBack();
  }

  onPressSubmit() {
    const { navigate } = this.props.navigation;

    const houseName = this.state.houseName;
    const password = this.state.password;

    axios.post('https://fridgr-mobile.herokuapp.com/auth/signup', {
      houseName: houseName,
      password: password
    })
    .then((response) => {
      console.log('Sign up success');
      navigate('Login');
    })
    .catch((err) => {
      console.log('Error occurred during signup:', err.response.data.message);
      this.setState({ error: err.response.data.message })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>
          Sign Up
        </Text>
        <TextField
          label="House Name"
          textColor="#ffffff"
          tintColor="#ffffff"
          onChangeText={(houseName) => this.setState({houseName})}
          value={this.state.houseName}
          autoCorrect={false}
          error={this.state.error}
        />
        <TextField
          label="Password"
          textColor="#ffffff"
          tintColor="#ffffff"
          onChangeText={(password) => this.setState({password})}
          autoCorrect={false}
          error={this.state.error}
        />
        <View style={styles.button}>
          <Button
            onPress={this.onPressSubmit}
            overrides={{textColor: '#ffffff', backgroundColor:'#f37735'}}
            text="Sign Up"
            raised={true}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.onPressLogin}
            overrides={{textColor: '#ffffff', backgroundColor:'#ffc425'}}
            text="Go Back to Login"
            raised={true}
          />
        </View>
      </View>
    );
  }
}

export default SignUp;
