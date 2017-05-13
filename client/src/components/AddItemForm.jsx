import React from 'react';
import axios from 'axios';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
      <Card className="container">
        <form>
          <h4 className="card-heading">Add New Inventory Item</h4>
          <div className="field-line">
            <TextField floatingLabelText="Item Name" type="text" value={this.state.name} onChange={this.saveName.bind(this)}></TextField>
          </div>
          <div className="field-line">
            <TextField floatingLabelText="Notes" type="text" value={this.state.notes} onChange={this.saveNotes.bind(this)}></TextField>
          </div>
          <div className="button-line">
            <RaisedButton primary={true} label="Submit" onClick={this.clickSubmit.bind(this)}></RaisedButton>
          </div>
        </form>
      </Card>
    );
  }
}

export default AddItemForm;
