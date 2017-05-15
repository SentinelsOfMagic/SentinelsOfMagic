import React from 'react';
import { Link } from 'react-router-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const UserList = (props) => {
  if (props.clicked) {
    return (
      <div>
        <SelectField floatingLabelText="Select a user" multiple={false}>
          {props.addUser.map((user)=>(<MenuItem key={user}>{user}</MenuItem>))}
        </SelectField>
        <div>
          and <Link to="/inventory">continue</Link>
        </div>
        <div>or <Link to="/users">go back</Link> and select a different user.</div>
      </div>
    );
  } else if (props.usersExist) {
    return (
      <div>
        <div>or <Link to="/users">go back</Link> and select a different user.</div>
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }
};

export default UserList;

// {props.addUser.map((user)=>(<div key={user} onClick={props.passInCooks.bind(this)}><Link to="/inventory">{user}</Link></div>))}
