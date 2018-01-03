import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeView } from '../actions';

class JoinGame extends Component {
  handleSubmitClicked = () => {

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
        <button className="btn btn-outline-dark" onClick={this.handleSubmitClicked}>Join</button>
        <button className="btn btn-outline-dark" onClick={this.handleCancelClicked}>Cancel</button>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {...state};
}
export default connect(mapStateToProps)(JoinGame);
