import React from 'react';
import ReactDOM from 'react-dom';

class HouseInventory extends React.Component {
  constructor(props) {
    super(props);

    this.state({

    });
  }

  render() {
    return (
    <div>
      <h1>House Inventory</h1>
      <Nav />
      <HouseInventoryItem />
    </div>
    );
  }
}

ReactDOM.render(<Inventory />, document.getElementById('inventory'));
