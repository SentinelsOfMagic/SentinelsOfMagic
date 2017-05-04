import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class HouseInventory extends React.Component {
  constructor(props) {
    super(props);

    this.state({
      items: []
    });
  }

  componentDidMount() {
    this.getItems(this.updateItems.bind(this));
  }

  getItems(callback) {
    $.ajax({
      type: 'GET',
      url: '/inventory',
      success: function(data) {
        console.log('Successful GET request - house inventory items retrieved');
        callback(data);
      },
      error: function() {
        console.log('Unable to GET house inventory items');
      }
    });
  }

  updateItems(data) {
    this.setState({
      items: data
    });
  }

  render() {
    return (
    <div>
      <h1>House Inventory</h1>
      <Nav />
      <HouseInventoryItem />
    </div>
    );
  }
}

ReactDOM.render(<Inventory />, document.getElementById('inventory'));
