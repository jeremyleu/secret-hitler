import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createRoom, changeView } from '../actions';
import ShadowButton from './ShadowButton';

class CreateGame extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    hostName: '',
    roomKey: '',
  };

  handleCreateClicked = () => {
    this.props.dispatch(createRoom(this.state.hostName, this.state.roomKey));
  };

  handleCancelClicked = () => {
    this.props.dispatch(changeView('landing'));
  };

  handleNameChange = (event) => {
    this.setState({
      hostName: event.target.value,
    });
  };

  handleKeyChange = (event) => {
    this.setState({
      roomKey: event.target.value,
    });
  };

  render() {
    return (
      <div className="create-game">
        <input
          type="text"
          className="host-name-input form-control"
          placeholder="Enter your name"
          maxLength="35"
          value={this.state.hostName}
          onChange={this.handleNameChange}
        />
        <input
          type="text"
          className="host-name-input form-control"
          placeholder="Enter room key"
          maxLength="10"
          value={this.state.roomKey}
          onChange={this.handleKeyChange}
        />
        <br />
        <ShadowButton text="Create" onClick={this.handleCreateClicked} />
        <ShadowButton text="Cancel" onClick={this.handleCancelClicked} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(CreateGame);
