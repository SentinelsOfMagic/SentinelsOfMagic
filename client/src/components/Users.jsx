import React from 'react';

const Users = (props) => {
  return (
  <div>
    {props.users
     .map((user)=>(<div key={user.id} data-key={user.id} onClick={props.redirect}>{user.username}</div>))}
  </div>
  );
};



export default Users;


