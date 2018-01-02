import React, { Component } from 'react';
import './Landing.scss';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <h2>Secret Hitler</h2>
        <button className="btn btn-outline-dark">Create</button>
        <button className="btn btn-outline-dark">Join</button>
      </div>
    )
  }
}

export default Landing;
