import React, { Component } from 'react';
import { connect } from 'react-redux';

import Landing from './Landing';
import CreateGame from './CreateGame';
import './Container.scss';
import JoinGame from './JoinGame';
import WaitingRoom from './WaitingRoom';

class Container extends Component {
  chooseView = (view) => {
    switch(view) {
      case 'landing':
        return <Landing />;
      case 'create':
        return <CreateGame />;
      case 'join':
        return <JoinGame />;
      case 'waiting':
        return <WaitingRoom />;
      default:
        return null;
    }
  }
  render() {
    const {view, error} = this.props;
    return (
      <div className="container">
        <div className="title">Secret Hitler</div>
        {error && <div className="error">{error}</div>}
        {this.chooseView(view)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Container);
