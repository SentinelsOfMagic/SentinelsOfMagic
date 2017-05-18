import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
// import styles from '../style';
import { Button, Card } from 'react-native-material-design';

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

    axios.post('https://sentinelsofmagic.herokuapp.com/auth/login', {
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
      <View>
        <Card.Body>
          <Text>
            Welcome
          </Text>
        </Card.Body>
        <Card.Body>
          <TextInput
            onChangeText={(houseName) => this.setState({houseName})}
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            value={this.state.houseName}
            placeholder="House Name"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Card.Body>
        <TextInput
          onChangeText={(password) => this.setState({password})}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="password"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <View>
          <Button
            onPress={this.onPressSubmit}
            text="Submit"
            raised={true}
          />
        </View>
        <View>
          <Button
            onPress={this.onPressSignUp}
            text="New User Sign Up"
            raised={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Login;
