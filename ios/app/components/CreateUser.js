import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-material-design';
import { TextField } from 'react-native-material-textfield';
import Main from './Main';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../style';

class CreateUser extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      username: '',
      userArray: [],
      houseId: null,
      successMessage: null
    };
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onPressUser = this.onPressUser.bind(this);
  }

  componentDidMount() {
    const { navigate, state } = this.props.navigation;
    let users = [];
    const dataArray = state.params.userArray;

    for (let i = 0; i < dataArray.length; i++) {
      users.push(dataArray[i].username)
    }
    this.setState({
      userArray: users,
      houseId: dataArray[0].house_id
    })
  }

  onPressSubmit() {
    const { navigate, state } = this.props.navigation;

    const username = this.state.username;

    axios.post('http://127.0.0.1:8080/createUser', {
      userName: username,
      houseId: this.state.houseId
    })
    .then((response) => {
      if (response && response.data === 'Successfully created user') {
        this.state.userArray.push(username)
      } else {
        throw new Error('could not add user');
      }
    })
    .catch((err) => {
      console.log('Error occurred during user submission:', err);
    });
  }

  onPressUser (index) {
    const { navigate, state } = this.props.navigation;

    const dataArray = state.params.userArray;
    const userId = dataArray[index].id;
    this.setState({
      userId: userId
    }, () => {
      navigate('Main', {
        houseId: this.state.houseId,
        userId: this.state.userId
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Add New User
        </Text>
        <TextField
          onChangeText={(username) => this.setState({username})}
          label="What's your name?"
          value={this.state.username}
          autoCorrect={false}
        />
        <View style={styles.button}>
          <Button
            onPress={this.onPressSubmit}
            text="Create User"
            raised={true}
          />
        </View>
        <View style={{marginTop: 50}}>
          <Text style={styles.welcome}>
            Select Existing User
          </Text>
        </View>
        <View style={styles.center}>
          <ModalDropdown
            dropdownStyle={styles.dropdown}
            textStyle={styles.textStyle}
            options={this.state.userArray}
            onSelect={this.onPressUser}
          />
        </View>
      </View>
    );
  }
}

export default CreateUser;
