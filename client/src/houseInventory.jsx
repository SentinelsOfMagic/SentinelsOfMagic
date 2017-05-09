import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import HouseInventoryList from './HouseInventoryList.jsx';
import Nav from './Nav.jsx';
import dummyData from '../../database/dummyData.js';

class HouseInventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.dummyData
    };
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
      <HouseInventoryList items={this.state.items}/>
    </div>
    );
  }
}

ReactDOM.render(<HouseInventory dummyData={dummyData} />, document.getElementById('inventory'));
