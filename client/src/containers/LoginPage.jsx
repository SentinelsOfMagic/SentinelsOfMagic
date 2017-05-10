import React from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm.jsx';


class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        houseName: '',
        password: ''
      }
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

      context.setState({
        errors: {}
      });

      console.log('The form is valid');
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
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

export default LoginPage;
