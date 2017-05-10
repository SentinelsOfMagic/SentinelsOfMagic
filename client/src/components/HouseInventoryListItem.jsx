import React from 'react';
import axios from 'axios';

class HouseInventoryListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.item.id, // this houses_items primary key id
      name: this.props.item.name,
      notes: this.props.item.notes,
      needToRestock: this.props.item.needtorestock,
      username: this.props.item.username,
      session: '', // still unsure as to how the session hash will be accessed
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
    axios.post('/claim', {
      // send session hash
      session: this.state.session, // would this be stored on this.state? TBD
      itemId: this.state.id
    })
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
    // post request to the db
    axios.post('/delete', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /delete');
        // put in a conditional statement in the render function that "hides" the element until the page is refreshed
        // which should update the list from the database i.e. load inventory list without the deleted item
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
        <div>
          <div className="item-name">Name: {this.state.name}</div>
          <div className="item-notes">Notes: {this.state.notes}</div>
          <button type="button" className="restock-button" onClick={this.clickRestock.bind(this)}>Need to Restock</button>
        </div>
      );
    } else if (this.state.needToRestock && this.state.username === null) {
      return (
        <div>
          <div className="item-name">Name: {this.state.name}</div>
          <div className="item-notes">Notes: {this.state.notes}</div>
          <button type="button" className="claim-button" onClick={this.clickClaim.bind(this)}>Add to My Shopping List</button>
          <button type="button" className="delete-button" onClick={this.clickDelete.bind(this)}>Delete</button>
        </div>
      );
    } else if (this.state.needToRestock && typeof this.state.username === 'string') {
      return (
        <div>
          <div className="item-name">Name: {this.state.name}</div>
          <div className="item-notes">Notes: {this.state.notes}</div>
          <button type="button" className="claimed">Claimed by {this.state.username}</button>
        </div>
      );
    }
  }
}

export default HouseInventoryListItem;
