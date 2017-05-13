import React from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm.jsx';
import { Redirect } from 'react-router-dom';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      user: {
        houseName: '',
        password: ''
      },
      successMessage: successMessage,
      redirect: false,
      to: ''
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  // onChange handler method
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  // onSubmit handle method
  processForm(event) {
    event.preventDefault(); // prevents form component from default action (opens a new window)

    const houseName = this.state.user.houseName;
    const password = this.state.user.password;

    var context = this;

    axios.post('/auth/login', {
      houseName: houseName,
      password: password
    })
    .then((response) => {
      console.log('Login form is valid');

      var houseId = parseInt(document.cookie.split('=')[1]);

      // check if a user exists
      if (response.data.length > 0) {
        console.log('have users');
        // if exists, redirect to SelectUser
        context.setState({
          errors: {},
          redirect: true,
          to: '/users'
        });
      } else {
        // if no user exists, redirect to CreateUser
        console.log('no user found');
        context.setState({
          errors: {},
          redirect: true,
          to: '/createUser'
        });
      }
    })
    .catch((err) => {
      var errors = err.response.data.errors ? err.response.data.errors : {};
      errors.summary = err.response.data.message;

      context.setState({
        errors: errors
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.redirect ?
          <Redirect to={this.state.to}/> :
          <LoginForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            errors={this.state.errors}
            successMessage={this.state.successMessage}
            user={this.state.user}
          />}
      </div>
    );
  }
}

export default LoginPage;
