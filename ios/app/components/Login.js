import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import styles from '../style';

class Login extends Component {
  
  static navigationOptions = { title: 'Login' };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onPressSignUp = this.onPressSignUp.bind(this);
  }

  onPressSubmit() {
    const { navigate } = this.props.navigation;
    console.log(this.state.username, this.state.password);
    navigate('Main');
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
