import React, { Component } from 'react';
import './Landing.scss';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="title">Secret Hitler</div>
        <button className="btn btn-outline-dark">Create</button>
        <button className="btn btn-outline-dark">Join</button>
      </div>
    )
  }
}

export default Landing;
