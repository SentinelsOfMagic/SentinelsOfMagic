import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Button, Card } from 'react-native-material-design';
import styles from '../style';

class Loading extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.onPressLogin = this.onPressLogin.bind(this);
    this.onPressSignUp = this.onPressSignUp.bind(this);
  }

  onPressLogin() {
    const { navigate } = this.props.navigation;
    navigate('Login');
  }

  onPressSignUp() {
    const { navigate } = this.props.navigation;
    navigate('SignUp');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 260, height: 260, alignSelf:"center"}}
          source={require('../img/fridge-and-cat.png')}
        />
        <Text style={styles.loading}>
          Fridgr
        </Text>
        <View style={styles.button}>
          <Button
            onPress={this.onPressLogin}
            overrides={{textColor: '#ffffff', backgroundColor:'#f37735'}}
            text="Login"
            raised={true}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.onPressSignUp}
            overrides={{textColor: '#ffffff', backgroundColor:'#ffc425'}}
            text="Sign Up"
            raised={true}
          />
        </View>
      </View>
    );
  }
}

export default Loading;
