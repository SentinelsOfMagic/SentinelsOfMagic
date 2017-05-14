import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';

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
    this.props.dataFromInputBox({userName: this.state.userName, userNameExists: this.state.userNameExists});
  }

  render () {
    return (

      <div>
       <input type='text' onChange={this.change}></input>
       <div>
        <RaisedButton className="somePadding" secondary={true} onClick={(e)=>{ this.passDataToCreateUser(); }}>Submit</RaisedButton>
       </div>
      </div>


    );
  }

}

export default UserNameInputBox;
