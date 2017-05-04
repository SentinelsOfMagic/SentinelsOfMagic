import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import HouseInventoryList from './HouseInventoryList.jsx';

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

  something() {

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
      <HouseInventoryList items={this.state.items}/>
    </div>
    );
  }
}

ReactDOM.render(<Inventory />, document.getElementById('inventory'));
