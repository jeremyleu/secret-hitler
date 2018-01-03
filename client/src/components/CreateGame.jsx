import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeView } from '../actions';

class CreateGame extends Component {
  handleCreateClicked = () => {
    // this.props.dispatch(createRoom());
  }
  handleCancelClicked = () => {
    this.props.dispatch(changeView('landing'));
  }
  render() {
    return (
      <div className="create-game">
        <div className="title">Secret Hitler</div>
        <input type="text" className="host-name-input form-control" placeholder="Enter your name" />
        <br />
        <button className="btn btn-outline-dark" onClick={this.handleCreateClicked}>Create</button>
        <button className="btn btn-outline-dark" onClick={this.handleCancelClicked}>Cancel</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(CreateGame);
