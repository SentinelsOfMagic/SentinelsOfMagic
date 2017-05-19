import React from 'react';
import { View, Text, Image, Button } from 'react-native';

class DetailView extends React.Component {
  // static navigationOptions = {
  //   title: 'DetailView'
  // }
  constructor(props) {
    super(props);
    this.handleClaimItem = this.handleClaimItem.bind(this);
    this.handleUndoItem = this.handleUndoItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleClaimItem() {
    const { params } = this.props.navigation.state;
    console.log('************ CLAIM ************', params.data.name);
  }

  handleUndoItem() {
    const { params } = this.props.navigation.state;
    console.log('************ UNDO ************', params.data.name);
  }

  handleDeleteItem() {
    const { params } = this.props.navigation.state;
    console.log('************ DELETE ************', params.data.name);
  }

  render() {
    console.log('DetailView');
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>{'id: ' + params.data.id}</Text>
        <Text>{'name: ' + params.data.name}</Text>
        <Text>{'needtorestock: ' + params.data.needtorestock}</Text>
        <Text>{'notes: ' + params.data.notes}</Text>
        <Text>{'userid: ' + params.data.userid}</Text>
        <Text>{'username: ' + params.data.username}</Text>

        <Button style={{flex: 1}}
          onPress={this.handleClaimItem}
          title="Claim"
          color="#841584"
        />
        <Button style={{flex: 1}}
          onPress={this.handleUndoItem}
          title="Undo"
          color="#841584"
        />
        <Button style={{flex: 1}}
          onPress={this.handleDeleteItem}
          title="Delete"
          color="#841584"
        />
      </View>
    );
  }
}

export default DetailView;
