import {
  WAITING_ROOM,
  MAX_PLAYERS,
} from './constants';
import Player from './Player';

export default class Game {
  constructor(id, hostName, roomKey) {
    this.id = id;
    this.host = new Player(hostName, true);
    this.key = roomKey;
    this.state = WAITING_ROOM;
    this.players = [this.host];
  }

  addPlayer = (playerName) => {
    if (this.players.find(player => player.getName.toUpperCase() === playerName.toUpperCase())) {
      return {
        ok: false,
        error: `Player with name ${playerName} already exists`,
      };
    }
    this.players.push(new Player(playerName, false));
    return {
      ok: true,
      error: null,
    };
  }

  getPlayers = () => this.players.map(player => player.getName());

  isFull = () => this.players.length >= MAX_PLAYERS;
}
