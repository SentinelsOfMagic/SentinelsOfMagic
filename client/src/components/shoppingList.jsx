import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ShoppingListItem from './ShoppingListItem.jsx';


class ShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {shoppingListItems: []};
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
      <div>
        {this.state.shoppingListItems.map((item, index) => {
          return (
            <ShoppingListItem item={item} key={index} />
          );
        })}
      </div>
    );
  }
}

export default ShoppingList;
