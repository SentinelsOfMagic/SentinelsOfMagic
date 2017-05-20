import React from 'react';
import { StyleSheet, Text, View, Button, Image, } from 'react-native';
import axios from 'axios';

import InventoryListView from './InventoryListView';
import dummyData from '../../../database/dummyData.js';

class HouseInventory extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => {
    const onPressAddItemView = () => {
      const { navigate } = navigation;
      navigate('AddItem', screenProps);
    }
    return {
      title: 'House Inventory',
      headerRight:
      (<Button
        onPress={onPressAddItemView}
        title="+ add item"
        color="#841584"
      />),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      items: dummyData
    };
    this.getItems = this.getItems.bind(this);
    this.props.screenProps.getItems = this.getItems;
  }

  getItems() {
    axios.post('http://127.0.0.1:8080/inventory', this.props.screenProps )
      .then(res => {
        console.log('Successful POST request to /inventory - house inventory items retrieved', res.data);
        this.setState({items: res.data}, console.log('state^^^^^^^^^^^^', this.state));
      })
      .catch(err => console.log('Unsuccessful POST request to /inventory - unable to retrieve house inventory items: ', err));
  }

  componentDidMount() {
    this.getItems();
  }
  // componentWillReceiveProps(props) {
  //   this.getItems();
  // }

  // componentsDidUpdate() {
  //   this.getItems();
  // }
  
  render() {
    return (
      <InventoryListView
        navigation={this.props.navigation}
        headerTitle={'House Inventory'}
        listViewData={this.state.items}
        screenProps={this.props.screenProps}
        getItems={this.getItems}
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

// const styles = StyleSheet.create({
//   bigblue: {
//     color: 'blue',
//     fontWeight: 'bold',
//     fontSize: 30,
//     textAlign: 'center'
//   }
// });

export default HouseInventory;
