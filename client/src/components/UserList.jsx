import React from 'react';
import { Link } from 'react-router-dom';

const UserList = (props) => {
  return (
  <div>
    {props.addUser.map((user)=>(<div className="user" key={user} onClick={props.passInCooks}>Continue as <Link to="/inventory">{user}</Link></div>))}
    <div>or <Link to="/users">go back</Link> and select a different user.</div>
  </div>
  );
};

export default UserList;
