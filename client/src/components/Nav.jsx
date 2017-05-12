import React from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const Nav = (props) => {
  return (
    <div>
      <FlatButton id="my-shopping-list"><Link to={'/shop'}>My Shopping List</Link></FlatButton>
      <FlatButton id="house-inventory"><Link to={'/inventory'}>House Inventory</Link></FlatButton>
    </div>
  );
};

export default Nav;
