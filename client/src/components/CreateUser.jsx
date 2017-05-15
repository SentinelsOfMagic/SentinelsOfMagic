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

    var cookie = parse(document.cookie);
    var houseId = parseInt(cookie.fridgrSesh.split('"houseId":')[1]);
    console.log('Current houseId:', houseId);

    this.state = {
      userName: '',
      userNameExists: false,
      error: '',
      houseId: houseId,
      userNameList: [],
      buttonClicked: false,
      usersExist: false,
      cookieIsSet: false
    };

    this.submitUserName = this.submitUserName.bind(this);
    this.dataFromInputBox = this.dataFromInputBox.bind(this);
    this.passInCooks = this.passInCooks.bind(this);
  }

  componentWillMount() {
    let cookies = parse(document.cookie);
    let fridgrSesh = JSON.parse(cookies.fridgrSesh.slice(2));

    if (!cookies.fridgrSesh || !fridgrSesh.houseId) {
      this.props.history.push('/login');
    } else {
      $.ajax({
        method: 'POST',
        url: '/checkUsers',
        data: { houseId: this.state.houseId },
        success: (data) => {
          if (data.length > 0) {
            this.setState({
              usersExist: true
            });
            console.log('usersExist');
          } else {
            console.log('usersDontExist');
          }
        }
      });
    }
  }

  submitUserName() {
    if (this.state.userName === '') {
      this.setState({
        error: 'Please enter a valid username'
      });
    } else {
      var userName = this.state.userName;
      if (this.state.userNameExists === true) {
        $.ajax({
          method: 'POST',
          url: '/createUser',
          data: { userName: userName, houseId: this.state.houseId },
          success: (data) => {
            console.log('what does it look like', data);
            if (data !== 'Username already taken. Please enter another.') {
              this.state.userNameList.push(this.state.userName);
              this.setState({
                error: ''
              });
            } else {
              this.setState({
                error: data
              });
            }
          }
        });
      }
    }
  }

  passInCooks(username) {
    $.ajax({
      method: 'POST',
      url: '/cookUser',
      data: {userName: username, houseId: this.state.houseId},
      success: (data) => {
        console.log('done passing the cookie');
        this.setState({
          cookieIsSet: true
        });
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

  buttonClicked(bool) {
    this.setState({
      buttonClicked: bool
    });
  }

  render () {
    return (
      <Card className="container">
        <h4 className="card-heading">Add new user/s</h4>
        <UserNameInputBox error={this.state.error} dataFromInputBox={this.dataFromInputBox} submitUserName={this.submitUserName} buttonClicked={this.buttonClicked.bind(this)}/>
        <UserList error={this.state.error} cookieIsSet={this.state.cookieIsSet} usersExist={this.state.usersExist} addUser={this.state.userNameList} passInCooks={this.passInCooks.bind(this)} clicked={this.state.buttonClicked}/>
      </Card>
    );
  }

}

export default CreateUser;



