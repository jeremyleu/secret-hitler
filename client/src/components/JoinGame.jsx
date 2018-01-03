import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeView } from '../actions';
import ShadowButton from './ShadowButton';

class JoinGame extends Component {
  handleJoinClicked = () => {

  }
  handleCancelClicked = () => {
    this.props.dispatch(changeView('landing'))
  }
  render(){
    return (
      <div className ="join-game">
        <div className="title">Secret Hitler</div>
        <input type="text" className="host-key-input form-control" placeholder="Enter the room key" />
        <input type="text" className="host-name-input form-control" placeholder="Enter your name" />
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
