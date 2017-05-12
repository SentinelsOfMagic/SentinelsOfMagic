import React from 'react';
import AddItemForm from './AddItemForm.jsx';

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

  render() {
    if (this.state.showForm) {
      return (
        <div>
          <AddItemForm houseId={this.props.houseId}/>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.clickAddItem.bind(this)}>Add Item</button>
        </div>
      );
    }
  }
}

export default AddItem;
