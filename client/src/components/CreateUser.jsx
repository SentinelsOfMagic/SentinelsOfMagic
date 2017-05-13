import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import UserNameInputBox from './UserNameInputBox.jsx';
import CookieParser from 'cookie-parser';
import UserList from './UserList.jsx';
import { Link } from 'react-router-dom';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    var houseId = parseInt(document.cookie.split('=')[1]);

    this.state = {
      userName: '',
      userNameExists: false,
      messageForUser: 'please type in a username',
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
          this.state.userNameList.push(this.state.userName);
          if (data) {
            this.setState({
              messageForUser: 'please choose another username'
            });
          }
          console.log('suceesssssss');
          this.setState({
            messageForUser: ''
          });
        }
      });
    }
    //need to redirect to somewhere here

  }

  passInCooks () {
    console.log('happpened')
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
    this.setState({
      userName: data.userName,
      userNameExists: data.userNameExists
    }, function() {
      this.submitUserName();
    });
  }

  render () {
    return (
      <div>
        <div>{this.state.messageForUser}</div>
        <div>Username</div>
        <UserNameInputBox dataFromInputBox={this.dataFromInputBox} submitUserName={this.submitUserName}/>
        <UserList addUser={this.state.userNameList} passInCooks={this.passInCooks}/>
      </div>
    );
  }

}

export default CreateUser;



