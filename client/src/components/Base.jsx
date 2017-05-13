import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Router, hashHistory, Route, IndexRoute, withRouter } from 'react-router'; // here in attempt to make the title clickable


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
    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
          title="Fridgr"
        />
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            <MenuItem onTouchTap={this.handleClose.bind(this)} primaryText="Login" containerElement={<Link to="/login"/>}/>
            <MenuItem onTouchTap={this.handleClose.bind(this)} primaryText="Sign Up" containerElement={<Link to="/signup"/>}/>
            <MenuItem onTouchTap={this.handleClose.bind(this)} primaryText="Logout" containerElement={<Link to="/"/>}/>
          </Drawer>
      </div>
    );
  }
}

export default Base;
