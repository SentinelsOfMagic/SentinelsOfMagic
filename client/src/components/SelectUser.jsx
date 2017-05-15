import React from 'react';
import $ from 'jquery';
import dummyUserData from '../../../database/dummyUserData.js';
import Users from './Users.jsx';
import { Link } from 'react-router-dom';
import CookieParser from 'cookie-parser';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import {parse} from 'cookie';

class SelectUser extends React.Component {
  constructor(props) {
    super(props);

    // var cookieString = document.cookie;
    // var houseIdRegex = new RegExp ('\houseId=(.*)');
    // var houseId = houseIdRegex.exec(cookieString)[1];

    var cookie = parse(document.cookie);
    var houseId = parseInt(cookie.fridgrSesh.split('"houseId":')[1]);
    console.log('Current houseId:', houseId);

    this.state = {
      data: [],
      houseId: houseId,
      userId: 0,
      redirect: false,
      to: '/inventory',
      usersCount: 0
    };
    this.getUsers = this.getUsers.bind(this);
    this.grabInventory = this.grabInventory.bind(this);
  }

  componentWillMount() {
    let cookies = parse(document.cookie);
    let fridgrSesh = JSON.parse(cookies.fridgrSesh.slice(2));

    if (!cookies.fridgrSesh || !fridgrSesh.houseId) {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    // console.log(this.state.houseId);
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
          data: data,
          usersCount: data.length
        });
      }
    });
  }


  render () {
    return (
      <div className="item">
        <div className="somePadding someSidePadding">
          <RaisedButton className="title" secondary={true} label={<Link to="/createUser">Create User</Link>}></RaisedButton>
        </div>
        <div className="somePadding someSidePadding">Who are you? 😄</div>
        {this.state.redirect ? <Redirect to={this.state.to}/> :
        <div className="somePadding item"><Users users={this.state.data} usersCount={this.state.usersCount} houseId={this.state.houseId} redirect={this.grabInventory}/></div>}
      </div>
    );
  }

}

export default SelectUser;
