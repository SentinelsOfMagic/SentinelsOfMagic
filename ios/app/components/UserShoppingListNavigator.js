import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import UserShoppingList from './UserShoppingList';

class UserShoppingListNavigator extends Component {

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
