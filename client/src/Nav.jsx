import React from 'react';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }



  render() {
    return (
      <div>
        <button id="my-shopping-list">My Shopping List</button>
        <button id="house-inventory">House Inventory</button>
      </div>
    );
  }
}

export default Nav;
