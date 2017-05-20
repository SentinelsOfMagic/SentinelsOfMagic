import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from './Header';
import axios from 'axios';

const SERVER_URL = 'http://127.0.0.1:8080';

class DetailView extends React.Component {

  constructor(props) {
    super(props);
    const { data } = this.props.navigation.state.params;
    this.state = {
      id: data.id,
      name: data.name,
      notes: data.notes,
      needToRestock: data.needtorestock,
      username: data.username,
      userId: this.props.screenProps.userId,
      itemUserId: data.userid
    };
    this.handleRestockItem = this.handleRestockItem.bind(this);
    this.handleClaimItem = this.handleClaimItem.bind(this);
    this.handleUnclaimItem = this.handleUnclaimItem.bind(this);
    this.handleUndoItem = this.handleUndoItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleRestockItem() {
    const { data } = this.props.navigation.state.params;
    console.log('************ RESTOCK ************', data.name);
    axios.post(SERVER_URL + '/restock', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /restock');
        this.setState({
          needToRestock: true,
        }, () => {
          data.getItems();
        });
      })
      .catch(err => console.log('Bad POST request to /restock: ', err));
  }

  handleClaimItem() {
    const { data } = this.props.navigation.state.params;
    console.log('************ CLAIM ************', data.name);
    axios.post(SERVER_URL + '/claim', { itemId: this.state.id, userId: this.state.userId })
      .then(res => {
        console.log('Successful POST request to /claim');
        this.setState({
          username: res.data.username,
          itemUserId: this.state.userId,
        }, () => {
          data.getItems();
          this.props.screenProps.forceRenderInMain();
        });
      })
      .catch(err => console.log('Bad POST request to /claim: ', err));
  }

  handleUnclaimItem() {
    const { data } = this.props.navigation.state.params;
    console.log('************ UNDO ************', data.name);
    axios.post(SERVER_URL + '/unclaim', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /unclaim');
        this.setState({
          username: null,
        }, () => {
          data.getItems();
          this.props.screenProps.forceRenderInMain();
        });
      })
      .catch(err => console.log('Bad POST request to /unclaim'));
  }

  handleUndoItem() {
    axios.post('/undo', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /unclaim');
        this.setState({
          needToRestock: false,
        }, () => {
          data.getItems();
        });
      })
      .catch(err => console.log('Bad POST request to /unclaim'));
  }

  handleDeleteItem() {
    const { data } = this.props.navigation.state.params;
    const { goBack } = this.props.navigation;
    console.log('************ DELETE ************', data.name);
    axios.post(SERVER_URL + '/delete', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /delete');
        data.getItems();
      })
      .then(() => {
        goBack();
      })
      .catch(err => console.log('Bad POST request to /delete'));
  }

  render() {
    return (
      <View>
        <Text>{'id: ' + this.state.id}</Text>
        <Text>{'name: ' + this.state.name}</Text>
        <Text>{'notes: ' + this.state.notes}</Text>
        <Text>{'needtorestock: ' + this.state.needToRestock}</Text>
        <Text>{'username: ' + this.state.username}</Text>
        <Text>{'userid: ' + this.state.userId}</Text>
        <Text>{'itemUserId: ' + this.state.itemUserId}</Text>

        {!this.state.needToRestock && <Button style={styles.button}
          onPress={this.handleRestockItem}
          title="Need to Restock"
          color="#841584"
        />}
        {(this.state.needToRestock && !this.state.username) ? <Button style={styles.button}
          onPress={this.handleClaimItem}
          title="Claim"
          color="#841584"
        /> : <Button style={styles.button}
          onPress={this.handleUnclaimItem}
          title="Unclaim"
          color="#841584"
        /> }
        {this.state.needToRestock && !this.state.username && <Button style={styles.button}
          onPress={this.handleUndoItem}
          title="Undo"
          color="#841584"
        />}
        {this.state.needToRestock && !this.state.username && <Button style={styles.button}
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
