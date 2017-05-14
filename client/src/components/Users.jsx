import React from 'react';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';

const Users = (props) => {
  return (
  <div>
    <GridList cellHeight="auto" cols={5} padding={15}>
    {props.users
     .map((user)=>(<div key={user.id}><span className="username changeColorForUserList" key={user.id} data-key={user.id} onClick={props.redirect}><img src="https://media.giphy.com/media/FxAYkQqdw63hC/giphy.gif" height="60" width="60"/>{user.username}</span><div className="hovered">This is me. Click away!</div></div>))}
    </GridList>
  </div>
  );
};

export default Users;




