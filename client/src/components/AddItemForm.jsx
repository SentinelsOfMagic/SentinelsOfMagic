import React from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AddItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      notes: '',
      houseId: this.props.houseId,
      errorName: '',
      errorText: ''
    };
  }

  postItem(obj) {
    axios.post('/add', obj)
      .then(res => {
        console.log('Successful POST request to /add');
        this.props.submitItem();
      })
      .catch(err => {
        console.log('Bad POST request to /add');
        this.setState({
          errorName: err.response.data.name,
          errorNotes: err.response.data.notes
        });
      });
  }

  clickSubmit(event) {
    this.postItem(this.state);
    this.props.toggleForm(false);
  }

  clickCancel(event) {
    this.props.toggleForm(false);
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
            <TextField
              floatingLabelText="Item Name"
              type="text"
              value={this.state.name}
              onChange={this.saveName.bind(this)}
              errorText={this.state.errorName}>
            </TextField>
          </div>
          <div className="field-line">
            <TextField
              floatingLabelText="Notes"
              type="text"
              value={this.state.notes}
              onChange={this.saveNotes.bind(this)}
              errorText={this.state.errorNotes}>
            </TextField>
          </div>
          <div className="button-line">
            <RaisedButton primary={true} label="Submit" onClick={this.clickSubmit.bind(this)}></RaisedButton>
            <RaisedButton primary={true} label="Cancel" onClick={this.clickCancel.bind(this)}></RaisedButton>
          </div>
        </form>
      </Card>
    );
  }
}

export default AddItemForm;
