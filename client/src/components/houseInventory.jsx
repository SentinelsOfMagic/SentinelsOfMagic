import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import HouseInventoryList from './HouseInventoryList.jsx';
import Nav from './Nav.jsx';
import AddItem from './AddItem.jsx';
import {parse} from 'cookie';


class HouseInventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      page: 'inventory',
      housename: ''
    };

    var cookie = parse(document.cookie);

    var houseId = parseInt(cookie.fridgrSesh.split('"houseId":')[1]);
    console.log('Current houseId:', houseId);
    this.state.houseId = houseId;

    var userId = parseInt(cookie.fridgrSesh.split('"userId":')[1]);
    console.log('Current userId:', userId);
    this.state.userId = userId;
  }

  componentDidMount() {
    this.submitItem();
    this.getHouseName(this.updateHouseName.bind(this));
  }

  submitItem() {
    this.getItems(this.updateItems.bind(this));
  }

  getHouseName(callback) {
    axios.post('/housename', { houseId: this.state.houseId })
      .then(res => {
        console.log('Successful POST request to /housename');
        callback(res.data.housename);
      })
      .catch(err => console.log('Unsuccessful POST request to /housename - unable to retrieve housename: ', err));
  }

  updateHouseName(data) {
    this.setState({
      housename: data
    });
  }

  getItems(callback) {
    axios.post('/inventory', { houseId: this.state.houseId })
      .then(res => {
        console.log('Successful POST request to /inventory - house inventory items retrieved');
        callback(res.data);
      })
      .catch(err => console.log('Unsuccessful POST request to /inventory - unable to retrieve house inventory items: ', err));
  }

  updateItems(data) {
    var sortedData = data.sort((a, b) => a.id - b.id);
    this.setState({
      items: sortedData
    });
  }

  render() {
    return (
      <div className="item">
        <Nav page={this.state.page}/>
        <h2>{this.state.housename}</h2>
        <AddItem houseId={this.state.houseId} submitItem={this.submitItem.bind(this)}/>
        <HouseInventoryList items={this.state.items} userId={this.state.userId} submitItem={this.submitItem.bind(this)}/>
      </div>
    );
  }
}

export default HouseInventory;
