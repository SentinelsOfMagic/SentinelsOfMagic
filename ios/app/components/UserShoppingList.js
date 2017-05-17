import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../style';

class UserShoppingList extends Component {
  
  static navigationOptions = { title: 'UserShoppingList' };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Shopping List
        </Text>
      </View>
    );
  }
}

export default UserShoppingList;