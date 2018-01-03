import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeView } from '../actions';
import ShadowButton from './ShadowButton';

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
        <ShadowButton text="Create" onClick={this.handleCreateClicked} />
        <ShadowButton text="Cancel" onClick={this.handleCancelClicked} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(CreateGame);
