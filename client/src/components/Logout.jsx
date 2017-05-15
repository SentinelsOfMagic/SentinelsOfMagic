import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  componentWillMount() {
    var context = this;

    axios.post('/auth/logout')
    .then((response) => {
      // reset localStorage
      localStorage.removeItem('loggedIn');

    // set logout success message
      localStorage.setItem('successMessage', response.data.message);

      context.setState({
        redirect: true
      });

      console.log('Logout successful!');
    })
    .catch((err) => {
      console.log('Error occurred during logout:', err);
    });
  }

  render() {
    return (
      <div>
        {this.state.redirect ?
          <Redirect to='/login' /> :
          null
        }
      </div>
    );
  }
}

export default Logout;
