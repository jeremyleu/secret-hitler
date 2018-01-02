import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeView } from '../actions';

import './Landing.scss';

class Landing extends Component {
  handleCreateClicked = () => {
    this.props.dispatch(changeView('create'));
  }
  render() {
    return (
      <div className="landing">
        <div className="title">Secret Hitler</div>
        <button className="btn btn-outline-dark" onClick={this.handleCreateClicked}>Create</button>
        <button className="btn btn-outline-dark">Join</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Landing);
