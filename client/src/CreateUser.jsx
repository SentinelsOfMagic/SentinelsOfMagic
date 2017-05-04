import React from 'react';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
    this.change = this.change.bind(this);
  }

  change(e) {
    this.setState ({
      userName: e.target.value
    })
  }

  render () {
    return (
      <div>
        <div>Please create one user before proceeding</div>
        <div>Username</div>
        <input onChange={this.change} type="text">
        <button type="submit">Submit</button>
        <button type="submit">Next</button>
      </div>
    )
  }

}

ReactDOM.render(<CreateUser/>, document.getElementById('app'))



