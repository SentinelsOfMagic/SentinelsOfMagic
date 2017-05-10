import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ShoppingListItem from './components/ShoppingListItem.jsx';


class ShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {shoppingListItems: []};
  }

  componentWillMount() {
    axios.get('/api/shop')
      .then((req, res) => {
        console.log(res);
        this.setState({shoppingListItems: res});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.state.shoppingListItems.map((item) => {
          return (
            <ShoppingListItem item={item} />
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<ShoppingList />, document.getElementById('shopping-list'));
