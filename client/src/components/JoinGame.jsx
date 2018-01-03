import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeView, joinRoom } from '../actions';
import ShadowButton from './ShadowButton';

class JoinGame extends Component {
  state = {
    name: '',
    roomKey: '',
  };

  handleJoinClicked = () => {
    this.props.dispatch(joinRoom(this.state.name, this.state.roomKey));
  }

  handleCancelClicked = () => {
    this.props.dispatch(changeView('landing'))
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  handleKeyChange = (event) => {
    this.setState({
      roomKey: event.target.value,
    });
  }

  render(){
    return (
      <div className ="join-game">
        <input
          type="text"
          className="host-name-input form-control"
          placeholder="Enter your name"
          maxLength="35"
          value={this.state.name}
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
        <ShadowButton text="Join" onClick={this.handleJoinClicked} />
        <ShadowButton text="Cancel" onClick={this.handleCancelClicked} />
      </div>
    )
  }
}
function mapStateToProps(state){
  return {...state};
}
export default connect(mapStateToProps)(JoinGame);
