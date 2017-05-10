import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import HouseInventoryList from './HouseInventoryList.jsx';
import Nav from './Nav.jsx';

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
    // will need to send the house id with this request
    axios.get('/inventory')
      .then(data => {
        console.log('Successful GET request - house inventory items retrieved');
        callback(data);
      })
      .catch(err => console.log('Unable to GET house inventory items: ', err));
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

export default HouseInventory;
// ReactDOM.render(<HouseInventory dummyData={dummyData} />, document.getElementById('inventory'));
