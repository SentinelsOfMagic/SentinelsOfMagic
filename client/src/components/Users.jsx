import React from 'react';
import { Link } from 'react-router-dom';

const Users = (props) => {
  return (
  <div>
    {props.users
     .map((user)=>(<div key={user.id} data-key={user.id} onClick={props.redirect}><Link to="/shop">{user.username}</Link></div>))}
  </div>
  );
};



export default Users;


