import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../style';

class Main extends Component {
  
  static navigationOptions = { title: 'Main' };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Main
        </Text>
      </View>
    );
  }
}

export default Main;
