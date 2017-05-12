import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <div>
      <button id="my-shopping-list"><Link to={'/shop'}>My Shopping List</Link></button>
      <button id="house-inventory"><Link to={'/inventory'}>House Inventory</Link></button>
    </div>
  );
};

export default Nav;
