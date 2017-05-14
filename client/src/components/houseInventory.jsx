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
      page: 'inventory'
    };

    var cookies = document.cookie.replace(/ /g, '').split(';').map(item => item.split('='));
    var cookieJar = {};

    for (var i = 0; i < cookies.length; i++) {
      cookieJar[cookies[i][0]] = cookies[i][1];
    }

    this.state.houseId = cookieJar['houseId'];
    this.state.userId = cookieJar['userId'];
  }

  componentDidMount() {
    this.submitItem();
  }

  submitItem() {
    this.getItems(this.updateItems.bind(this));
  }

  getItems(callback) {
    axios.post('/inventory', { houseId: this.state.houseId })
      .then(res => {
        console.log('Successful GET request to /inventory - house inventory items retrieved');
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
      <AddItem houseId={this.state.houseId} submitItem={this.submitItem.bind(this)}/>
      <HouseInventoryList items={this.state.items} userId={this.state.userId} submitItem={this.submitItem.bind(this)}/>
    </div>
    );
  }
}

export default HouseInventory;
