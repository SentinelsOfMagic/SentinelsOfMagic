import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../style';

class Settings extends Component {
  
  static navigationOptions = { title: 'Settings' };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Settings
        </Text>
      </View>
    );
  }
}

export default Settings;