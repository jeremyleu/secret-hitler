import { WAITING_ROOM, MAX_PLAYERS, ROLES } from './constants';
import Player from './Player';
import { shuffle, assign } from './utils';

export default class Game {
  constructor(id, hostName, roomKey) {
    this.id = id;
    this.host = new Player(hostName, true, null);
    this.key = roomKey;
    this.state = WAITING_ROOM;
    this.players = [this.host];
    this.president = null;
  }

  addPlayer = (playerName) => {
    if (this.players.find(player => player.getName().toUpperCase() === playerName.toUpperCase())) {
      return {
        ok: false,
        error: `Player with name ${playerName} already exists`,
      };
    }
    this.players.push(new Player(playerName, false, null));
    return {
      ok: true,
      error: null,
    };
  };

  getPlayers = () => this.players.map(player => player);

  isFull = () => this.players.length >= MAX_PLAYERS;

  setup = () => {
    let roles = [];
    roles = [...ROLES[this.players.length]];
    shuffle(roles);

    assign(this.players, roles);
    const player = this.players[Math.floor(Math.random() * this.players.length)];
    this.president = player;
  };
}
