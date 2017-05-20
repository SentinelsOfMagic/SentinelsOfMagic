import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import axios from 'axios';

import ShoppingListView from './ShoppingListView';
import dummyUserData from '../../../database/dummyUserData.js';

class UserShoppingList extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => {

    const removeFromShoppingList = () => {
      axios.post('https://fridgr-mobile.herokuapp.com/removeFromShoppingList',
      {...screenProps, data: navigation.state.params.selectedItems})
      .then(res => {
        navigation.setParams({
          shoppingListItems: res.data,
          selectedItems: [],
        });
      })
      .catch(err => {
        console.log(err);
      });
    };

    return {
      title: 'Shopping List',
      headerRight:
      (<Button
        onPress={removeFromShoppingList}
        title="remove items"
        color="#841584"
      />),
    };
  };

  constructor(props) {
    super(props);
    this.props.navigation.state.params = {
      shoppingListItems: dummyUserData,
      selectedItems: [],
    };
    this.getShoppingList = this.getShoppingList.bind(this);
    this.handleClickRow = this.handleClickRow.bind(this);
  }

  getShoppingList() {
    axios.post('https://fridgr-mobile.herokuapp.com/shoppingList', this.props.screenProps)
    .then(res => {
      this.props.navigation.setParams({shoppingListItems: res.data});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleClickRow(item) {
    this.props.navigation.setParams({
      selectedItems: [...this.props.navigation.state.params.selectedItems, item]
    }, () => console.log('SHOPPING LIST STATE:', this.props.navigation.state.params));
  }
  // shouldComponentUpdate(nextProps, nextState)
  componentDidMount() {
    this.getShoppingList();
  }

  // componentWillReceiveProps(props) {
  //   this.getShoppingList();
  // }

  render() {
    return (
      <ShoppingListView
        navigation={this.props.navigation}
        headerTitle={'Shopping List'}
        listViewData={this.props.navigation.state.params.shoppingListItems}
        screenProps={this.props.screenProps}
        handleClickRow={this.handleClickRow}
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

export default UserShoppingList;
