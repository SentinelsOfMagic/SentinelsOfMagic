import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import UserNameInputBox from './UserNameInputBox.jsx';
import CookieParser from 'cookie-parser';
import UserList from './UserList.jsx';
import { Link } from 'react-router-dom';
import { Card } from 'material-ui/Card';
import {parse} from 'cookie';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    // var cookieString = document.cookie;
    // var houseIdRegex = new RegExp ('\houseId=(.*)');
    // var houseId = houseIdRegex.exec(cookieString)[1];

    var cookie = parse(document.cookie);
    var houseId = parseInt(cookie.fridgrSesh.split('"houseId":')[1]);
    console.log('Current houseId:', houseId);

    this.state = {
      userName: '',
      userNameExists: false,
      messageForUser: 'Please type in a username.',
      houseId: houseId,
      userNameList: []
    };

    this.submitUserName = this.submitUserName.bind(this);
    this.dataFromInputBox = this.dataFromInputBox.bind(this);
    this.passInCooks = this.passInCooks.bind(this);
  }

  submitUserName() {
    var userName = this.state.userName;
    if (this.state.userNameExists === true) {
      $.ajax({
        method: 'POST',
        url: '/createUser',
        data: { userName: userName, houseId: this.state.houseId },
        success: (data) => {
          console.log('what does it look like', data);
          if (data !== 'Username already taken. Please type in another username.') {
            this.state.userNameList.push(this.state.userName);
            this.setState({
              messageForUser: data
            });
          } else {
            this.setState({
              messageForUser: data
            });
          }
        }
      });
    }
  }

  passInCooks () {
    var userName = this.state.userName;
    $.ajax({
      method: 'POST',
      url: '/cookUser',
      data: {userName: userName},
      success: (data) => {
        console.log('done passing the cookie');
      }
    });
  }

  dataFromInputBox(data) {
    if (data.userName) {

    }
    this.setState({
      userName: data.userName,
      userNameExists: data.userNameExists
    }, function() {
      this.submitUserName();
    });
  }

  render () {
    return (
      <Card className="container">
        <div className="somePadding">{this.state.messageForUser}</div>
        <UserNameInputBox dataFromInputBox={this.dataFromInputBox} submitUserName={this.submitUserName}/>
        <UserList addUser={this.state.userNameList} passInCooks={this.passInCooks}/>
      </Card>
    );
  }

}

export default CreateUser;



