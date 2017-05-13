import React from 'react';
import { Link } from 'react-router-dom';

const UserList = (props) => {
  return (
  <div>
    {props.addUser.map((user)=>(<div key={user} onClick={props.passInCooks}><Link to="/inventory">{user}</Link></div>))}
  </div>
  );
};

export default UserList;
