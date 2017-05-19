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

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.showDetailView = this.showDetailView.bind(this);
  }
  showDetailView() {
    console.log('clicked', this.props.title);
  }
  render() {
    // const {navigate} = this.props.navigation;
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('Detail', { data: this.props })}>
        <View style={styles.container}>
          <Image source={{uri: this.props.image}} style={styles.photo}/>
          <Text style={styles.text}>
            {this.props.name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
};

export default Row;
