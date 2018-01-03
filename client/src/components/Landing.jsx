import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeView } from '../actions';

import './Landing.scss';

class Landing extends Component {
  createClicked = () => {
    this.props.dispatch(changeView('create'));
  }
  joinClicked = () => {
    this.props.dispatch(changeView('join'));
  }
  render() {
    return (
      <div className="landing">
        <div className="title">Secret Hitler</div>
        <button className="btn btn-outline-dark" onClick={this.createClicked}>Create</button>
        <button className="btn btn-outline-dark" onClick={this.joinClicked}>Join</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Landing);
