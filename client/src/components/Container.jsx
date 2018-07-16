import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Landing from './Landing';
import CreateGame from './CreateGame';
import './Container.scss';
import JoinGame from './JoinGame';
import WaitingRoom from './WaitingRoom';
import socket from '../socket';
import { receiveRoom, receiveError, roleAssigned, currentPresident } from '../actions';

class Container extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired,
    error: PropTypes.string,
    name: PropTypes.string,
  };

  static defaultProps = {
    error: null,
    name: null,
  };

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    socket.on('createSuccess', (result) => {
      const {
        name, players, isHost, roomKey,
      } = result;
      dispatch(receiveRoom(name, players, isHost, roomKey));
    });
    socket.on('joinSuccess', (result) => {
      const {
        name, players, isHost, roomKey,
      } = result;
      dispatch(receiveRoom(name, players, isHost, roomKey));
    });
    socket.on('joinError', (error) => {
      dispatch(receiveError(error));
    });
    socket.on('gameRetrieved', (game) => {
      const {
        name, players, isHost, roomKey,
      } = game;
      dispatch(receiveRoom(name, players, isHost, roomKey));
    });
    socket.on('rolesAssigned', (players) => {
      const player = players.find(playerRole => playerRole.name === this.props.name);
      const { role } = player;
      dispatch(roleAssigned(role, players));
    });
    socket.on('current_president', (president) => {
      dispatch(currentPresident(president));
    });
  }

  chooseView = (view) => {
    switch (view) {
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
  };

  render() {
    const { view, error } = this.props;
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
  return { ...state };
}

export default connect(mapStateToProps)(Container);
