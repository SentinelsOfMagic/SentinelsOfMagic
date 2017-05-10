import React from 'react';

class HouseInventoryListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item,
      needToRestock: this.props.item.need_to_restock,
      userId: this.props.item.user_id,
      username: ''
    };
  }

  clickRestock(event) {
    // post request to the db
    this.setState({
      needToRestock: true
    });
  }

  clickClaim(event) {
    // get request to db to see who is signed in
    // post request to the db
    this.setState({
      userId: 1,
      username: 'April'
    });
  }

  clickDelete(event) {
    // post request to the db
    console.log('deleting');
  }

  render() {
    if (!this.state.needToRestock) {
      return (
        <div>
          <div className="item-name">Name: {this.state.item.name}</div>
          <div className="item-notes">Notes: {this.state.item.notes}</div>
          <button type="button" className="restock-button" onClick={this.clickRestock.bind(this)}>Need to Restock</button>
        </div>
      );
    } else if (this.state.needToRestock && this.state.userId === null) {
      return (
        <div>
          <div className="item-name">Name: {this.state.item.name}</div>
          <div className="item-notes">Notes: {this.state.item.notes}</div>
          <button type="button" className="claim-button" onClick={this.clickClaim.bind(this)}>Add to My Shopping List</button>
          <button type="button" className="delete-button" onClick={this.clickDelete.bind(this)}>Delete</button>
        </div>
      );
    } else if (this.state.needToRestock && typeof this.state.userId === 'number') {
      return (
        <div>
          <div className="item-name">Name: {this.state.item.name}</div>
          <div className="item-notes">Notes: {this.state.item.notes}</div>
          <button type="button" className="claimed">Claimed by {this.state.username}</button>
        </div>
      );
    }
  }
}

export default HouseInventoryListItem;
