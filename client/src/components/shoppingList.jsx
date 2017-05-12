import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ShoppingListItem from './ShoppingListItem.jsx';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';


class ShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {shoppingListItems: [], selectedItems: []};
  }

  componentWillMount() {
    axios.get('/api/shop')
      .then((res) => {
        this.setState({shoppingListItems: res.data});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitShopping() {
    axios.post('/api/shop', {
      data: this.state.shoppingListItems.filter((item, index) => {
        return !!this.state.selectedItems[index];
      })
    })
    .then((res) => {
      this.setState({shoppingListItems: res.data, selectedItems: []});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  addItemToSelected(index) {
    // ugly way to do this
    let updated = this.state.selectedItems;
    updated[index] = !updated[index];
    this.setState({selectedItems: updated});
  }

  render() {
    return (
      <div>
        <FlatButton label="Mark as Purchased" onClick={this.submitShopping.bind(this)} />
        <List>
          {this.state.shoppingListItems.map((item, index) => {
            return (
              <ShoppingListItem addToSelected={this.addItemToSelected.bind(this)} item={item} key={index} index={index} />
            );
          })}
        </List>
      </div>
    );
  }
}

export default ShoppingList;
