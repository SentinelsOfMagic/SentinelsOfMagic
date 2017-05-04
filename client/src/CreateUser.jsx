import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userNameExists: false,
      messageForUser: 'please type in a username'
    };
    this.change = this.change.bind(this);
    this.submitUserName = this.submitUserName.bind(this);
  }

  change(e) {

    this.setState ({
      userName: e.target.value,
      userNameExists: true
    })
  }

  submitUserName() {
    var userName = this.state.userName;
    if (this.state.userName === true) {
      $.ajax({
      method:'POST',
      url: 'match server route',
      data: {'userName': userName},
      success: (data) => {
        this.setState({
          messageForUser: ''
        })
        console.log('success but i dont expect to get back any data', data);
      },
      dataType: 'json'
      })
    }
    //if user succesfully posts to database succesfully, do we still need a next button?
    //shouldn't we redirect them to another page right after?
  }

  render () {
    return (
      <div>
        <div>Please create one user before proceeding</div>
        <div>Username</div>
        <input type="text" onChange={this.change}>
        <div>{this.state.message}</div>
        <button type="submit" onClick={this.submitUserName}>Submit</button>
      </div>
    )
  }

}

export default CreateUser;

// ReactDOM.render(<CreateUser/>, document.getElementById('app'));



