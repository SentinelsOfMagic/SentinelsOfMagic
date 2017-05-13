import React from 'react';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';

class HouseInventoryListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.item.id, // this houses_items primary key id
      name: this.props.item.name,
      notes: this.props.item.notes,
      needToRestock: this.props.item.needtorestock,
      username: this.props.item.username,
      userId: this.props.userId,
      hide: false
    };
  }

  clickRestock(event) {
    axios.post('/restock', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /restock');
        this.setState({
          needToRestock: true
        });
      })
      .catch(err => console.log('Bad POST request to /restock: ', err));
  }

  clickClaim(event) {
    axios.post('/claim', { itemId: this.state.id, userId: this.state.userId })
      .then(res => {
        console.log('Successful POST request to /claim');
        // response should have the username
        // update username in state
        this.setState({
          username: 'April' // something like res.username
        });
      })
      .catch(err => console.log('Bad POST request to /claim: ', err));
  }

  clickDelete(event) {
    axios.post('/delete', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /delete');
        this.setState({
          hide: true
        });
      })
      .catch(err => console.log('Bad POST request to /delete'));
  }

  render() {
    if (this.state.hide) {
      return (
        <div>
        </div>
      );
    } else if (!this.state.needToRestock) {
      return (
        <div className="item">
          <h4 className="item-name">{this.state.name}</h4>
          <h5 className="item-notes">{this.state.notes}</h5>
          <RaisedButton primary={true} label="Need to Restock" onClick={this.clickRestock.bind(this)}></RaisedButton>
        </div>
      );
    } else if (this.state.needToRestock && this.state.username === null) {
      return (
        <div className="item">
          <h4 className="item-name">{this.state.name}</h4>
          <h5 className="item-notes">{this.state.notes}</h5>
          <RaisedButton primary={true} label="Add to My Shopping List" onClick={this.clickClaim.bind(this)}></RaisedButton>
          <RaisedButton secondary={true} label="Delete" onClick={this.clickDelete.bind(this)}></RaisedButton>
        </div>
      );
    } else if (this.state.needToRestock && typeof this.state.username === 'string') {
      return (
        <div className="item">
          <h4 className="item-name">{this.state.name}</h4>
          <h5 className="item-notes">{this.state.notes}</h5>
          <RaisedButton disabled={true} label={`Claimed by ${this.state.username}`}></RaisedButton>
        </div>
      );
    }
  }
}

export default HouseInventoryListItem;
