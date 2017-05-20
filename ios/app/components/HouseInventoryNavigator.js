import React, { Component } from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HouseInventory from './HouseInventory';
import DetailView from './DetailView';
import AddItem from './AddItem';
import styles from '../style';
import Camera from './Camera';

class HouseInventoryNavigator extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'House Inventory',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/fridge-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    )
  };

  static navigationOptions = {
    tabBarLabel: 'House Inventory',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/fridge-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    )
  };

  static navigationOptions = {
    tabBarLabel: 'House Inventory',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/fridge-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    )
  };

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
      Camera: { screen: Camera },
    });

    return (
      <HINavigator screenProps={this.props.screenProps}/>
    );
  }
}

export default HouseInventoryNavigator;
