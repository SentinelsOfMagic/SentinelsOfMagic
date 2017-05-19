import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import Header from './Header';
import axios from 'axios';

const SERVER_URL = 'http://127.0.0.1:8080';

class DetailView extends React.Component {
  // static navigationOptions = {
  //   title: 'DetailView'
  // }
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      id: params.data.id,
      name: params.data.name,
      notes: params.data.notes,
      needToRestock: params.data.needtorestock,
      username: params.data.username,
      userId: this.props.screenProps.userId,
      itemUserId: params.data.userid
    };
    this.handleRestockItem = this.handleRestockItem.bind(this);
    this.handleClaimItem = this.handleClaimItem.bind(this);
    this.handleUndoItem = this.handleUndoItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }
  handleRestockItem() {
    const { params } = this.props.navigation.state;
    console.log('************ RESTOCK ************', params.data.name);
    axios.post(SERVER_URL + '/restock', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /restock');
        this.setState({
          needToRestock: true
        }, () => {
          params.data.getItems();
        });
      })
      .catch(err => console.log('Bad POST request to /restock: ', err));
  }

  handleClaimItem() {
    const { params } = this.props.navigation.state;
    console.log('************ CLAIM ************', params.data.name);
    axios.post(SERVER_URL + '/claim', { itemId: this.state.id, userId: this.state.userId })
      .then(res => {
        console.log('Successful POST request to /claim');
        this.setState({
          username: res.data.username,
          itemUserId: this.state.userId
        }, () => {
          params.data.getItems();
        });
      })
      .catch(err => console.log('Bad POST request to /claim: ', err));
  }

  handleUndoItem() {
    const { params } = this.props.navigation.state;
    console.log('************ UNDO ************', params.data.name);
    axios.post(SERVER_URL + '/unclaim', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /unclaim');
        this.setState({
          username: null,
          needToRestock: false
        }, () => {
          params.data.getItems();
        });
      })
      .catch(err => console.log('Bad POST request to /unclaim'));
  }

  handleDeleteItem() {
    const { params } = this.props.navigation.state;
    const { navigate, goBack } = this.props.navigation;
    console.log('************ DELETE ************', params.data.name);
    axios.post(SERVER_URL + '/delete', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /delete');
        params.data.getItems();
      })
      .then(() => {
        goBack();
      })
      .catch(err => console.log('Bad POST request to /delete'));
  }

  render() {
    return (
      <View renderHeader={() => <Header headerTitle={this.state.name} />}>
        <Text>{'id: ' + this.state.id}</Text>
        <Text>{'name: ' + this.state.name}</Text>
        <Text>{'needtorestock: ' + this.state.needToRestock}</Text>
        <Text>{'notes: ' + this.state.notes}</Text>
        <Text>{'userid: ' + this.state.userId}</Text>
        <Text>{'claim username: ' + this.state.username}</Text>
        {!this.state.needToRestock && <Button style={this.state.needToRestock ? styles.buttonHide : styles.buttonShow}
          onPress={this.handleRestockItem}
          title="Need to Restock"
          color="#841584"
        />}
        {this.state.needToRestock && <Button style={styles.button}
          onPress={this.handleClaimItem}
          title="Claim"
          color="#841584"
        />}
        {this.state.needToRestock && <Button style={this.state.needToRestock ? styles.buttonShow : styles.buttonHide}
          onPress={this.handleUndoItem}
          title="Undo"
          color="#841584"
        />}
        {this.state.needToRestock && <Button style={this.state.needToRestock ? styles.buttonShow : styles.buttonHide}
          onPress={this.handleDeleteItem}
          title="Delete"
          color="#841584"
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
});

export default DetailView;
