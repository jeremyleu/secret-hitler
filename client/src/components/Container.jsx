import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Landing from './Landing';
import CreateGame from './CreateGame';
import './Container.scss';
import JoinGame from './JoinGame';
import WaitingRoom from './WaitingRoom';
import socket from '../socket';
import {
  receiveRoom,
  receiveError,
  roleAssigned,
  currentPresident,
  currentChancellor,
  currentVotes,
  choosePolicy,
  updateScore,
  prevPresident,
  prevChancellor,
} from '../actions';

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
        name, players, isHost, roomKey, status,
      } = result;
      dispatch(receiveRoom(name, players, isHost, roomKey, status));
    });
    socket.on('joinSuccess', (result) => {
      const {
        name, players, isHost, roomKey, status,
      } = result;
      dispatch(receiveRoom(name, players, isHost, roomKey, status));
    });
    socket.on('joinError', (error) => {
      dispatch(receiveError(error));
    });
    socket.on('gameRetrieved', (game) => {
      const {
        name, players, isHost, roomKey, status,
      } = game;
      dispatch(receiveRoom(name, players, isHost, roomKey, status));
    });
    socket.on('rolesAssigned', (players) => {
      const player = players.find(playerRole => playerRole.name === this.props.name);
      const { role } = player;
      dispatch(roleAssigned(role, players));
    });
    socket.on('current_president', (selectPresident) => {
      const { president, status } = selectPresident;
      dispatch(currentPresident(president, status));
    });
    socket.on('score', (scores) => {
      const { liberalScore, fascistScore } = scores;
      const status = '';
      dispatch(updateScore(liberalScore, fascistScore, status));
    });
    socket.on('elect_chancellor', (electChancellor) => {
      const { chancellor, status, turn } = electChancellor;
      dispatch(currentChancellor(chancellor, status, turn));
    });
    socket.on('voteRecord', (proposal) => {
      const { currentProposal, players, status } = proposal;
      const currentVote = currentProposal.votes;
      if (currentVote.length === players.length) {
        const approves = currentVote.filter(vote => vote.voteChoice === true);
        const declines = currentVote.filter(vote => vote.voteChoice === false);
        const voteResult = approves.length > declines.length;
        dispatch(currentVotes(voteResult, status));
      }
    });
    socket.on('presidentDiscard', (policies) => {
      const { draw, status, president } = policies;
      dispatch(prevPresident(president));
      dispatch(choosePolicy(draw, status));
    });
    socket.on('chancellorDiscard', (policies) => {
      const { draw, status, chancellor } = policies;
      dispatch(prevChancellor(chancellor));
      dispatch(choosePolicy(draw, status));
    });
    socket.on('playPolicy', (scores) => {
      const { liberalScore, fascistScore, status } = scores;
      dispatch(updateScore(liberalScore, fascistScore, status));
    });
    socket.on('nextPresident', (presidentName) => {
      const { president, status } = presidentName;
      dispatch(currentPresident(president, status));
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
