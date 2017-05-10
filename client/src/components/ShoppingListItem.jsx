import React from 'react';

class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        <li>{this.props.item.itemname}</li>
      </ul>
    );
  }
}

export default ShoppingListItem;
