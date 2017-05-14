import React from 'react';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';

class HouseInventoryListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.item.id,
      name: this.props.item.name,
      notes: this.props.item.notes,
      needToRestock: this.props.item.needtorestock,
      username: this.props.item.username,
      userId: this.props.userId,
      itemUserId: this.props.item.userid
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
        this.setState({
          username: res.data.username
        });
      })
      .catch(err => console.log('Bad POST request to /claim: ', err));
  }

  clickDelete(event) {
    axios.post('/delete', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /delete');
        this.props.submitItem();
      })
      .catch(err => console.log('Bad POST request to /delete'));
  }

  render() {
    if (!this.state.needToRestock) {
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
    } else if (this.state.needToRestock && typeof this.state.username === 'string' && Number(this.state.userId) !== Number(this.state.itemUserId)) {
      return (
        <div className="item">
          <h4 className="item-name">{this.state.name}</h4>
          <h5 className="item-notes">{this.state.notes}</h5>
          <RaisedButton disabled={true} label={`Claimed by ${this.state.username}`}></RaisedButton>
        </div>
      );
    } else if (this.state.needToRestock && typeof this.state.username === 'string' && Number(this.state.userId) === Number(this.state.itemUserId)) {
      return (
        <div className="item">
          <h4 className="item-name">{this.state.name}</h4>
          <h5 className="item-notes">{this.state.notes}</h5>
          <RaisedButton disabled={true} label={'Claimed by me'}></RaisedButton>
        </div>
      );
    }
  }
}

export default HouseInventoryListItem;
