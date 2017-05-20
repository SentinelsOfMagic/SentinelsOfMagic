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

    axios.post('https://fridgr-mobile.herokuapp.com/auth/login', {
      houseName: houseName,
      password: password
    })
    .then((response) => {
      console.log(response.data);
      if (response) {
        const userArray = response.data.userData;
        const houseId = response.data.houseId;
        navigate('CreateUser', {userArray: userArray, houseId: houseId});
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
        <Text style={styles.loading}>
          Login
        </Text>
        <TextField
          onChangeText={(houseName) => this.setState({houseName})}
          textColor="#ffffff"
          tintColor="#ffffff"
          label="House Name"
          value={this.state.houseName}
          autoCorrect={false}
          autoCapitalize="none"
          error={this.state.error}
        />
        <TextField
          onChangeText={(password) => this.setState({password})}
          textColor="#ffffff"
          tintColor="#ffffff"
          label="Password"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          error={this.state.error}
        />
        <View style={styles.button}>
          <Button
            onPress={this.onPressSubmit}
            overrides={{textColor: '#ffffff', backgroundColor:'#f37735'}}
            text="Login"
            raised={true}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.onPressSignUp}
            overrides={{textColor: '#ffffff', backgroundColor:'#ffc425'}}
            text="Go To Sign Up"
            raised={true}
          />
        </View>
      </View>
    );
  }
}

export default Login;
