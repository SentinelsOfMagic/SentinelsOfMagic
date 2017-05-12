import React from 'react';
import $ from 'jquery';
import dummyUserData from '../../../database/dummyUserData.js';
import Users from './Users.jsx';
import { Link } from 'react-router-dom';


class SelectUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      houseId: 2, //need to grab this from somewhere
      userId: ''
    };
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  grabInventory(e) {
    this.setState({
      userId: e.target.getAttribute('data-key')
    });
    //redirect to housing inventory
  }

  getUsers() {
    $.ajax({
      method: 'POST',
      url: '/users',
      data: { houseId: this.state.houseId },
      success: (data) => {
        this.setState({
          data: data
        });
        console.log('expect array with data', this.state.data);
      }
    });
  }

  render () {
    return (
      <Users users={this.state.data} houseId={this.state.houseId} redirect={this.grabInventory}/>
    );
  }

}

export default SelectUser;
