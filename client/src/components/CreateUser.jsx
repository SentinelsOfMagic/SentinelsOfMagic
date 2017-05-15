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
      messageForUser: 'Enter a new user',
      houseId: houseId,
      userNameList: [],
      buttonClicked: false
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
    }
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

  buttonClicked(bool) {
    this.setState({
      buttonClicked: bool
    });
  }

  render () {
    return (
      <Card className="container">
        <h4 className="card-heading">{this.state.messageForUser}</h4>
        <UserNameInputBox dataFromInputBox={this.dataFromInputBox} submitUserName={this.submitUserName} buttonClicked={this.buttonClicked.bind(this)}/>
        <UserList addUser={this.state.userNameList} passInCooks={this.passInCooks} clicked={this.state.buttonClicked}/>
      </Card>
    );
  }

}

export default CreateUser;



