import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './WaitingRoom.scss';
import socket from '../socket';
import { updatePlayers, assignRoles } from '../actions';
import ShadowButton from './ShadowButton';

class WaitingRoom extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    isHost: PropTypes.bool.isRequired,
    roomKey: PropTypes.string.isRequired,
    role: PropTypes.string,
    president: PropTypes.object,
  };
  static defaultProps = { role: null, president: null };
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    socket.on('playerJoinSuccess', (players) => {
      dispatch(updatePlayers(players));
    });
  }

  handleStartClicked = () => {
    const { roomKey } = this.props;
    this.props.dispatch(assignRoles(roomKey));
  };

  render() {
    const {
      players, name, isHost, role, president,
    } = this.props;
    const playerMin = 5;
    console.log(players);
    const fascistPlayers = players.filter(player => player.role === 'fascist' && player.name !== name);
    const fascistNames = fascistPlayers.map(player => player.name);
    const hitler = players.find(player => player.role === 'hitler');
    return (
      <div className="waiting-room">
        {role && <div className="role"> Your role is {role} </div>}
        {role === 'fascist' &&
          fascistPlayers.length > 0 && (
            <div> Other fascist players: {fascistNames.join(', ')} </div>
          )}
        {role === 'fascist' && <div> Hitler is: {hitler.name} </div>}
        {president && <div> Current President: {president.name} </div>}
        {president && president.name === name && <div> Please select the Chancellor </div>}
        <ul className="player-list list-group">
          {players.map(player => (
            <li
              className={`player-list-item list-group-item ${name === player.name && 'self'}`}
              key={`${player.name}-list-item`}
            >
              {player.name}
            </li>
          ))}
        </ul>
        {players.length >= playerMin &&
          isHost && <ShadowButton text="Start" onClick={this.handleStartClicked} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(WaitingRoom);
