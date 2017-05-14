import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Base extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleToggle(event) {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    console.log('localStorage: ', typeof localStorage.getItem('loggedIn'));
    if (localStorage.getItem('loggedIn') === 'true') {
      return (
        <div>
          <AppBar
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
            title={<NavLink exact to="/" >Fridgr</NavLink>}
          />
            <Drawer
              docked={false}
              open={this.state.open}
              onRequestChange={open => this.setState({ open })}
            >
              <MenuItem onTouchTap={this.handleClose.bind(this)} primaryText="Logout" containerElement={<Link to="/"/>}/>
            </Drawer>
        </div>
      );
    } else {
      return (
        <div>
          <AppBar
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
            title={<NavLink exact to="/" >Fridgr</NavLink>}
          />
            <Drawer
              docked={false}
              open={this.state.open}
              onRequestChange={open => this.setState({ open })}
            >
              <MenuItem onTouchTap={this.handleClose.bind(this)} primaryText="Login" containerElement={<Link to="/login"/>}/>
              <MenuItem onTouchTap={this.handleClose.bind(this)} primaryText="Sign Up" containerElement={<Link to="/signup"/>}/>
            </Drawer>
        </div>
      );
    }
  }
}

export default Base;
