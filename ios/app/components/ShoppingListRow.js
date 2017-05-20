import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Navigator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

class ShoppingListRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const {navigate} = this.props.navigation;
    return (
      <TouchableHighlight onPress={() => {
        this.props.handleClickRow(this.props);
        console.log('PRESSED SHOPPING LIST ITEM')
      }}>
        <View style={styles.container}>
          <Image source={{uri: this.props.image}} style={styles.photo}/>
          <Text style={styles.text}>
            {'item: ', this.props.houses_items_id, ', id - ', this.props.id, ', name - ', this.props.itemname}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ShoppingListRow;
