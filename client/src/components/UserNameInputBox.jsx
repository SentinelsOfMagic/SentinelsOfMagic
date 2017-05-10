import React from 'react';

class UserNameInputBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userName: '',
      userNameExists: false
    };

    this.change = this.change.bind(this);
    this.passDataToCreateUser = this.passDataToCreateUser.bind(this);

  }

  change(e) {
    this.setState ({
      userName: e.target.value,
      userNameExists: true
    });
  }


  passDataToCreateUser() {
    if (this.state.userNameExists === true) {
      this.props.dataFromInputBox({userName: this.state.userName, userNameExists: this.state.userNameExists});
    }
  }

  render () {
    return (
      <div>
       <input type='text' onChange={this.change}></input>
        <button type="submit" onClick={(e)=>{ this.passDataToCreateUser(); this.props.submitUserName(); }} >Submit</button>
      </div>
    );
  }

}

export default UserNameInputBox;
