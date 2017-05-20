import React, { Component } from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HouseInventory from './HouseInventory';
import DetailView from './DetailView';
import Camera from './Camera';
import AddItem from './AddItem';
import styles from '../style';

class HouseInventoryNavigator extends Component {

  static navigationOptions = {
    tabBarLabel: 'House Inventory',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/fridge-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    )
  };

  render() {
    const HINavigator = StackNavigator({
      List: { screen: HouseInventory },
      Detail: { screen: DetailView },
      AddItem: { screen: AddItem },
      Camera: { screen: Camera}
    });
    console.log('************************************', this.props.screenProps);

    return (

      <HINavigator screenProps={this.props.screenProps}/>
    );
  }
}

export default HouseInventoryNavigator;
