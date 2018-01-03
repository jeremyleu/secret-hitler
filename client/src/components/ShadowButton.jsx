import React, { Component } from 'react';

import './ShadowButton.scss';

class ShadowButton extends Component {
  render() {
    return (
      <span className="shadow-btn-container">
        <button className="shadow-btn btn btn-outline-dark" onClick={this.props.onClick}>
          {this.props.text}
        </button>
      </span>
    )
  }
}

export default ShadowButton;
