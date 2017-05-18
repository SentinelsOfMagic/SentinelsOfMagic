import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../style';

class ChangeUser extends Component {
   constructor(props) {
    super(props);
  }
  
  static navigationOptions = { title: 'Change User' };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Change User
        </Text>
      </View>
    );
  }
}

export default ChangeUser;