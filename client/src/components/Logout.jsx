import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    // clear out cookies
    //
  }

  render() {
    return (
      <Redirect to='/login' />
    );
  }
}
