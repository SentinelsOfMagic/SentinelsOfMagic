import React from 'react';
import ListItem from 'material-ui/List';

class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListItem primaryText={this.props.item.itemname} />
    );
  }
}

export default ShoppingListItem;
