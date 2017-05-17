import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from "react-navigation";
import styles from '../style';
import HouseInventory from './HouseInventory';  
import UserShoppingList from './UserShoppingList';
import Settings from './Settings';

const Main = TabNavigator({
  HouseInventory: { screen: HouseInventory },
  UserShoppingList: { screen: UserShoppingList },
  Settings: { screen: Settings }
});

export default Main;
