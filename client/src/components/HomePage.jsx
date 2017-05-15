import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import Nav from './Nav.jsx';
import {parse} from 'cookie';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'home'
    };
  }

  componentWillMount() {
    let cookies = parse(document.cookie);
    let fridgrSesh = JSON.parse(cookies.fridgrSesh.slice(2));

    if (cookies && fridgrSesh.houseId && !fridgrSesh.userId) {
      this.props.history.goBack();
    }
  }

  render() {
    if (localStorage.getItem('loggedIn') !== null) {
      return (
        <div>
          <Nav page={this.state.page} />
          <Card className="container">
            <CardTitle title="Welcome to Fridgr" subtitle="Tracking groceries got you stressed? Chill." />
          </Card>
        </div>
      );
    } else {
      return (
        <Card className="container">
          <CardTitle title="Welcome to Fridgr" subtitle="Tracking groceries got you stressed? Chill." />
        </Card>
      );
    }
  }
}

// const HomePage = () => (
//   <Card className="container">
//     <CardTitle title="Welcome to Fridgr" subtitle="Tracking groceries got you stressed? Chill." />
//   </Card>
// );

export default HomePage;
