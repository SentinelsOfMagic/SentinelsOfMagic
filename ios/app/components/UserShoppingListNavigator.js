import React, { Component } from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import UserShoppingList from './UserShoppingList';
import styles from '../style';

class UserShoppingListNavigator extends Component {

  static navigationOptions = {
    tabBarLabel: 'Shopping List',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/shopping-list-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    const SLNavigator = StackNavigator({
      ShoppingList: { screen: UserShoppingList },
    });

    return (
      <SLNavigator screenProps={this.props.screenProps}/>
    );
  }
}

export default UserShoppingListNavigator;
