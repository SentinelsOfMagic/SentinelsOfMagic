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
      tabBarLabel: 'House Inventory',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../img/chats-icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
      title: 'House Inventory',
      headerLeft: null,
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
  }

  getItems() {
    const context = this;
    axios.post('http://127.0.0.1:8080/inventory', this.props.screenProps )
      .then(res => {
        console.log('Successful POST request to /inventory - house inventory items retrieved', res.data);
        context.setState({items: res.data});
      })
      .catch(err => console.log('Unsuccessful POST request to /inventory - unable to retrieve house inventory items: ', err));
  }

  componentDidMount() {
    this.getItems();
  }

  render() {
    return (
      <InventoryListView
      navigation={this.props.navigation}
      headerTitle={`House Inventory - ${this.props.screenProps.houseId}`}
      listViewData={this.state.items}/>
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
