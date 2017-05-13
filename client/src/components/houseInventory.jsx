import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import HouseInventoryList from './HouseInventoryList.jsx';
import Nav from './Nav.jsx';
import AddItem from './AddItem.jsx';

class HouseInventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      houseId: 1, // dummy value for now, will use cookies in future
      userId: 4,
      page: 'inventory'
    };
  }

  componentDidMount() {
    this.getItems(this.updateItems.bind(this));
  }

  getItems(callback) {
    axios.post('/inventory', { houseId: this.state.houseId })
      .then(res => {
        console.log('Successful GET request - house inventory items retrieved: ', res.data);
        callback(res.data);
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
      <Nav page={this.state.page}/>
      <AddItem houseId={this.state.houseId}/>
      <HouseInventoryList items={this.state.items} userId={this.state.userId} />
    </div>
    );
  }
}

export default HouseInventory;
