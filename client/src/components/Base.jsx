import React from 'react';
import { NavLink, Link } from 'react-router-dom';


const Base = () => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <NavLink exact to="/">Fridgr</NavLink>
      </div>

      <div className="top-bar-right">
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </div>

    </div>

  </div>
);

export default Base;
