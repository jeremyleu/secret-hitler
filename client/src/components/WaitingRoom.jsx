import React, { Component } from "react";
import { connect } from "react-redux";

import "./WaitingRoom.scss";
import socket from "../socket";
import { updatePlayers, changeView } from "../actions";
import ShadowButton from './ShadowButton';

class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    socket.on("playerJoinSuccess", players => {
      dispatch(updatePlayers(players));
    });
  }

  handleStartClicked = () => {
    this.props.dispatch(changeView('landing'))
  }

  render() {
    const { players, name } = this.props;
    console.log(players);
    let button;
    if(players.length >= 5 && name === players[0]){
      button = <ShadowButton text="Start" onClick={this.handleStartClicked} />;
    }else{
      button = "";
    }
    return (
      <div className="waiting-room">
        <ul className="player-list list-group">
          {players.map(playerName => (
            <li
              className={`player-list-item list-group-item ${name ===
                playerName && "self"}`}
              key={`${playerName}-list-item`}
            >
              {playerName}
            </li>
          ))}
        </ul>
        {button}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(WaitingRoom);
