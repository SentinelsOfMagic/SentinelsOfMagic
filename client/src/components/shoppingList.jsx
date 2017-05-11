import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ShoppingListItem from './ShoppingListItem.jsx';
import {List, ListItem} from 'material-ui/List';


class ShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {shoppingListItems: [], selectedItems: []};
  }

  componentWillMount() {
    axios.get('/api/shop')
      .then((res) => {
        console.log('server response', res);
        this.setState({shoppingListItems: res.data});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <List>
        {this.state.shoppingListItems.map((item, index) => {
          return (
            <ListItem primaryText={item.itemname} key={index} />
          );
        })}
      </List>
    );
  }
}

export default ShoppingList;
