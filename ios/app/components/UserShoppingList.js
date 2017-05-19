import React from 'react';
import { StyleSheet, Text, View, Button, Image, } from 'react-native';

import InventoryListView from './InventoryListView';

class UserShoppingList extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Shopping List',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <InventoryListView
      navigation={this.props.navigation}
      headerTitle={'Shopping List'}
      /*listViewData={}*//>
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

export default UserShoppingList;
