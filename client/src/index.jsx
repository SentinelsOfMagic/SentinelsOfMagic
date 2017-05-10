import React from 'react';
import ReactDOM from 'react-dom';
import HouseInventory from './components/houseInventory.jsx';
import CreateUser from './components/CreateUser.jsx';
import dummyData from '../../database/dummyData.js'; // moved from houseInventory.jsx

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <HouseInventory dummyData={dummyData}/>
        <CreateUser />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

/*
DELETED:
login.html
login.jsx
LoginApp.jsx
*/
