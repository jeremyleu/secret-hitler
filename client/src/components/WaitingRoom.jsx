import React, { Component } from 'react';
import { connect } from 'react-redux';

import './WaitingRoom.scss';

class WaitingRoom extends Component {

  render() {
    const { room, name } = this.props;
    return (
      <div className="waiting-room">
        <ul className="player-list list-group">
          {room.players.map(player => (
            <li className={`player-list-item list-group-item ${name === player.name && 'self'}`} key={`${player.name}-list-item`}>
              {player.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(WaitingRoom);
