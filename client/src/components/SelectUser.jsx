import React from 'react';
import $ from 'jquery';
import dummyUserData from '../../../database/dummyUserData.js';
import Users from './Users.jsx';
import { Link } from 'react-router-dom';
import CookieParser from 'cookie-parser';
import { Redirect } from 'react-router-dom';

class SelectUser extends React.Component {
  constructor(props) {
    super(props);

    // var houseId = parseInt(document.cookie.split(';')[0]);
    var cookieString = document.cookie;
    var houseIdRegex = new RegExp ('\houseId=(.*)');
    var houseId = houseIdRegex.exec(cookieString)[1];

    this.state = {
      data: [],
      houseId: houseId,
      userId: 0,
      redirect: false,
      to: '/inventory'
    };
    this.getUsers = this.getUsers.bind(this);
    this.grabInventory = this.grabInventory.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  grabInventory(e) {
    this.setState({
      userId: parseInt(e.target.getAttribute('data-key'))
    }, function() {
      $.ajax({
        method: 'POST',
        url: '/settingCooks',
        data: { userId: this.state.userId },
        success: (data ) => {
          this.setState({
            redirect: true
          });
          console.log('sucess sending the cookie! :D');
        }
      });
      console.log('this should be a number', this.state.userId);
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
        {this.state.redirect ? <Redirect to={this.state.to}/> :
        <Users users={this.state.data} houseId={this.state.houseId} redirect={this.grabInventory}/>}
        <Link to="/createUser">Create User</Link>
      </div>
    );
  }

}

export default SelectUser;
