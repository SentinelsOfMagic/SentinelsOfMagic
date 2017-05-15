import React from 'react';
import { Link } from 'react-router-dom';

const UserList = (props) => {
  if (props.clicked) {
    return (
      <div>
        <div>Continue as: </div>
        {props.addUser.map((user)=>(<div key={user} onClick={props.passInCooks.bind(this)}><Link to="/inventory">{user}</Link></div>))}
        <div>or <Link to="/users">go back</Link> and select a different user.</div>
      </div>
    );
  } else {
    return (
      <div>
        <div>or <Link to="/users">go back</Link> and select a different user.</div>
      </div>
    );
  }
};

export default UserList;
