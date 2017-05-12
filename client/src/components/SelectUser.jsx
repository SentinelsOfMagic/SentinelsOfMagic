import React from 'react';
import $ from 'jquery';
import dummyUserData from '../../../database/dummyUserData.js';
import Users from './Users.jsx';
import { Link } from 'react-router-dom';
import CookieParser from 'cookie-parser';

class SelectUser extends React.Component {
  constructor(props) {
    super(props);

    var houseId = parseInt(document.cookie.split('=')[1]);

    this.state = {
      data: [],
      houseId: houseId,
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
      }
    });
  }



  render () {
    return (
      <div>
        <Users users={this.state.data} houseId={this.state.houseId} redirect={this.grabInventory}/>
        <Link to="/createUser">Create User</Link>
      </div>
    );
  }

}

export default SelectUser;
