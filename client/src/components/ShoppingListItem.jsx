import React from 'react';
import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCheck() {
    this.props.addToSelected(this.props.index);
  }

  render() {
    return (
      <ListItem leftCheckbox={<Checkbox onCheck = {this.handleCheck.bind(this)} />} primaryText={this.props.item.itemname} />
    );
  }
}

export default ShoppingListItem;
