import React from 'react';
import AddItemForm from './AddItemForm.jsx';
import RaisedButton from 'material-ui/RaisedButton';

class AddItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false
    };
  }

  clickAddItem(event) {
    this.setState({
      showForm: true
    });
  }

  toggleForm(bool) {
    this.setState({
      showForm: bool
    });
  }

  render() {
    if (this.state.showForm) {
      return (
        <div>
          <AddItemForm houseId={this.props.houseId} toggleForm={this.toggleForm.bind(this)}/>
        </div>
      );
    } else {
      return (
        <div className="add-item">
          <RaisedButton secondary={true} label="Add new item" onClick={this.clickAddItem.bind(this)}></RaisedButton>
        </div>
      );
    }
  }
}

export default AddItem;
