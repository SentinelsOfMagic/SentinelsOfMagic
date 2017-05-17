import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

class UserNameInputBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userName: '',
      userNameExists: false,
      error: ''
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
    this.setState({
      userName: ''
    });
    this.props.buttonClicked(true);
  }

  render () {
    return (

      <div>
       <TextField type="text" floatingLabelText="Name" errorText={this.props.error} onChange={this.change} value={this.state.userName}></TextField>
       <div>
        <RaisedButton className="somePadding" secondary={true} label="Submit" onClick={(e)=>{ this.passDataToCreateUser(); }}></RaisedButton>
       </div>
      </div>


    );
  }

}

export default UserNameInputBox;
