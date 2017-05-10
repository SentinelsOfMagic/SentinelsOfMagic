import React from 'react';
import ReactDom from 'react-dom';
import HouseInventory from './components/houseInventory.jsx';
import CreateUser from './components/CreateUser.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <HouseInventory />
        <CreateUser />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));


//DELETED:
// login.jsx
// LoginApp.jsx
// login.html
