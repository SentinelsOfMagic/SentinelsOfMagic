import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onPressSubmit = this.onPressSubmit.bind(this);
  }

  onPressSubmit() {
    console.log(this.state.username, this.state.password);
  }

  render() {
    return (
      <View style={{width: 300}}>
        <Text>
          Login
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

export default Login;
