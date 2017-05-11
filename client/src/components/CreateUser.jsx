import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import UserNameInputBox from './UserNameInputBox.jsx';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userNameExists: false,
      messageForUser: 'please type in a username'
    };

    this.submitUserName = this.submitUserName.bind(this);
    this.dataFromInputBox = this.dataFromInputBox.bind(this);
  }

  submitUserName() {
    var userName = this.state.userName;
    if (this.state.userNameExists === true) {
      $.ajax({
        method: 'POST',
        url: '/createUser',
        data: { userName: userName },
        success: (data) => {
          this.setState({
            messageForUser: ''
          });
        }
      });
    }
  }

  dataFromInputBox(data) {
    console.log('expect true', data.userNameExists);
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
      </div>
    );
  }

}

export default CreateUser;



