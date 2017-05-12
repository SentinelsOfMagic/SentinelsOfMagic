import React from 'react';
import axios from 'axios';

class AddItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      notes: '',
      houseId: this.props.houseId
    };
  }

  postItem(obj) {
    axios.post('/add', obj)
      .then(res => console.log('Successful POST request to /add'))
      .catch(err => console.log('Bad POST request to /add'));
  }

  clickSubmit(event) {
    this.postItem(this.state);
    // need to add this to house inventory list items
  }

  saveName(event) {
    this.setState({
      name: event.target.value
    });
  }

  saveNotes(event) {
    this.setState({
      notes: event.target.value
    });
  }

  render() {
    return (
      <form>
        Item Name:
        <input type="text" value={this.state.name} onChange={this.saveName.bind(this)}></input>
        Notes:
        <input type="text" value={this.state.notes} onChange={this.saveNotes.bind(this)}></input>
        <button onClick={this.clickSubmit.bind(this)}>Submit</button>
      </form>
    );
  }
}

export default AddItemForm;
