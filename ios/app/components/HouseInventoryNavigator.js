import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HouseInventory from './HouseInventory';
import DetailView from './DetailView';
import Camera from './Camera';
import AddItem from './AddItem';

class HouseInventoryNavigator extends Component {

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
