import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './WaitingRoom.scss';
import socket from '../socket';
import {
  updatePlayers,
  assignRoles,
  electChancellor,
  votes,
  presidentPolicy,
  chancellorPolicy,
} from '../actions';
import ShadowButton from './ShadowButton';

class WaitingRoom extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    isHost: PropTypes.bool.isRequired,
    roomKey: PropTypes.string.isRequired,
    role: PropTypes.string,
    president: PropTypes.string,
    status: PropTypes.string,
    chancellor: PropTypes.string,
    voteResult: PropTypes.bool,
    turn: PropTypes.number,
    policies: PropTypes.array,
  };
  static defaultProps = {
    role: null,
    president: null,
    status: null,
    chancellor: null,
    voteResult: null,
    turn: null,
    policies: null,
  };
  constructor(props) {
    super(props);
    this.state = { selectedPlayer: null, turn: 0 };
    const { dispatch } = this.props;
    socket.on('playerJoinSuccess', (players) => {
      dispatch(updatePlayers(players));
    });
  }

  handleStartClicked = () => {
    const { roomKey } = this.props;
    this.props.dispatch(assignRoles(roomKey));
  };

  handleSubmitClicked = () => {
    const { roomKey } = this.props;
    this.setState(
      prevState => ({
        turn: prevState.turn + 1,
      }),
      () => {
        this.props.dispatch(electChancellor(this.state.selectedPlayer, roomKey, this.state.turn));
      },
    );
  };

  handleChange = (playerName, checked) => {
    if (checked) {
      this.setState({ selectedPlayer: playerName });
    }
  };

  handleApproveClicked = () => {
    const {
      name, roomKey, president, chancellor, turn, players,
    } = this.props;
    const vote = { voteChoice: true, playerName: name };
    this.props.dispatch(votes(vote, roomKey, president, chancellor, turn, players));
  };

  handleDeclineClicked = () => {
    const {
      name, roomKey, president, chancellor, turn, players,
    } = this.props;
    const vote = { voteChoice: false, playerName: name };
    this.props.dispatch(votes(vote, roomKey, president, chancellor, turn, players));
  };

  handlePolicyClicked = () => {
    const { roomKey } = this.props;
    this.props.dispatch(chancellorPolicy(roomKey));
  };
  render() {
    const {
      players,
      name,
      isHost,
      role,
      president,
      status,
      chancellor,
      voteResult,
      roomKey,
      policies,
    } = this.props;
    const playerMin = 5;
    console.log(players);

    const fascistPlayers = players.filter(player => player.role === 'fascist' && player.name !== name);
    const fascistNames = fascistPlayers.map(player => player.name);
    const hitler = players.find(player => player.role === 'hitler');
    const isPresident = president && president === name;
    const checkStatus = status === 'presidentNominate';
    if (voteResult && status === 'voteRecord' && president === name) {
      this.props.dispatch(presidentPolicy(roomKey));
    }

    return (
      <div className="waiting-room">
        {role && <div className="role"> Your role is {role} </div>}
        {role === 'fascist' &&
          fascistPlayers.length > 0 && (
            <div> Other fascist players: {fascistNames.join(', ')} </div>
          )}
        {role === 'fascist' && <div> Hitler is: {hitler.name} </div>}
        {president && <div> Current President: {president} </div>}
        {status === 'presidentNominate' && isPresident && <div> Please select the Chancellor </div>}
        {status === 'vote_nomination' && <div> Proposed Chancellor: {chancellor} </div>}
        {chancellor && voteResult && <div> Current Chancellor: {chancellor} </div>}
        <ul className="player-list list-group">
          {players.map(player => (
            <li
              className={`player-list-item list-group-item ${name === player.name && 'self'}`}
              key={`${player.name}-list-item`}
            >
              {checkStatus &&
                isPresident && (
                  <input
                    disabled={president === player.name}
                    type="radio"
                    checked={this.state.selectedPlayer === player.name}
                    onChange={(e) => {
                      this.handleChange(player.name, e.target.checked);
                    }}
                  />
                )}
              {player.name}
            </li>
          ))}
        </ul>
        {players.length >= playerMin &&
          isHost &&
          status === 'waitingRoom' && (
            <ShadowButton text="Start" onClick={this.handleStartClicked} />
          )}
        {status === 'presidentNominate' &&
          president === name && <ShadowButton text="Submit" onClick={this.handleSubmitClicked} />}
        {status === 'vote_nomination' && (
          <ShadowButton text="Ja" onClick={this.handleApproveClicked} />
        )}
        {status === 'vote_nomination' && (
          <ShadowButton text="Nein" onClick={this.handleDeclineClicked} />
        )}
        {status === 'presidentDiscard' &&
          name === president && <div> Please choose one policy to discard </div>}
        {status === 'chancellorDiscard' &&
          name === chancellor && <div> Please choose one policy to discard </div>}
        {status === 'presidentDiscard' &&
          name === president &&
          policies.length === 3 && (
            <ShadowButton text={policies[0]} onClick={this.handlePolicyClicked} />
          )}
        {status === 'presidentDiscard' &&
          name === president &&
          policies.length === 3 && (
            <ShadowButton text={policies[1]} onClick={this.handlePolicyClicked} />
          )}
        {status === 'presidentDiscard' &&
          name === president &&
          policies.length === 3 && (
            <ShadowButton text={policies[2]} onClick={this.handlePolicyClicked} />
          )}
        {status === 'chancellorDiscard' &&
          name === chancellor &&
          policies.length === 2 && (
            <ShadowButton text={policies[0]} onClick={this.handlePolicyClicked} />
          )}
        {status === 'chancellorDiscard' &&
          name === chancellor &&
          policies.length === 2 && (
            <ShadowButton text={policies[1]} onClick={this.handlePolicyClicked} />
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(WaitingRoom);
