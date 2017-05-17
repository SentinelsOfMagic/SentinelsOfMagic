import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../style';

class HouseInventory extends Component {
  
  static navigationOptions = { title: 'HouseInventory' };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          HouseInventory
        </Text>
      </View>
    );
  }
}

export default HouseInventory;