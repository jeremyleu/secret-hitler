import React, { Component } from 'react';
import { connect } from 'react-redux';

import Landing from './Landing';
import CreateGame from './CreateGame';
import './Container.scss';
import JoinGame from './JoinGame';
import WaitingRoom from './WaitingRoom';
import socket from '../socket';
import { receiveRoom, receiveError } from '../actions';

class Container extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    socket.on('createSuccess', (result) => {
      const { name, players } = result;
      dispatch(receiveRoom(name, players));
    });
    socket.on('joinSuccess', (result) => {
      const { name, players } = result;
      dispatch(receiveRoom(name, players));
    });
    socket.on('joinError', (error) => {
      dispatch(receiveError(error));
    });
    socket.on('gameRetrieved', (game) => {
      const { name, players } = game;
      dispatch(receiveRoom(name, players));
    });
  }

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
