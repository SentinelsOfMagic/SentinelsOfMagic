import React from 'react';

const Users = (props) => {
  return (
  <div>
    {props.users
     .filter(user=>user['house_id'] === props.houseId)
     .map((user)=>(<div data-key={user.id} onClick={props.redirect}>{user.username}</div>))}
  </div>
  );
};



export default Users;


