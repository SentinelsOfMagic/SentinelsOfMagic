import React from 'react';
import { Link } from 'react-router-dom';

const UserList = (props) => {
  if (props.clicked) {
    console.log('true click: ', props.addUser);
    return (
      <div>
        <div>Continue as: </div>
        {props.addUser.map((user)=>(<div key={user} onClick={props.passInCooks}><Link to="/inventory">{user}</Link></div>))}
        <div>or <Link to="/users">go back</Link> and select a different user.</div>
      </div>
    );
  } else {
    console.log('false click');
    return (
      <div>
        <div>or <Link to="/users">go back</Link> and select a different user.</div>
      </div>
    );
  }
};

export default UserList;
