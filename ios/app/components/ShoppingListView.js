import React from 'react';
import { ListView, Text, View, StyleSheet } from 'react-native';
import ShoppingListRow from './ShoppingListRow';
import Header from './Header';

class ShoppingListView extends React.Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(props) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(props.listViewData),
    });
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={styles.separator}
      />
    );
  }

  render() {
    return (
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data) => (
            <ShoppingListRow
              {...data}
              navigation={this.props.navigation}
              handleClickRow={this.props.handleClickRow}
              screenProps={this.props.screenProps}
            />
          )}
          renderSeparator={this.renderSeparator}
          renderHeader={() => <Header headerTitle={this.props.headerTitle}/>}
        />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
});

export default ShoppingListView;
