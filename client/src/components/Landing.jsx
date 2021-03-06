import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeView } from '../actions';

import ShadowButton from './ShadowButton';
import './Landing.scss';

class Landing extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  handleCreateClicked = () => {
    this.props.dispatch(changeView('create'));
  };
  handleJoinClicked = () => {
    this.props.dispatch(changeView('join'));
  };
  render() {
    return (
      <div className="landing">
        <ShadowButton text="Create" onClick={this.handleCreateClicked} />
        <ShadowButton text="Join" onClick={this.handleJoinClicked} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(Landing);
