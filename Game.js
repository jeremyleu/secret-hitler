import { WAITING_ROOM, MAX_PLAYERS, ROLES, DECK } from './constants';
import Player from './Player';
import { shuffle, assign } from './utils';
import Proposal from './Proposal';

export default class Game {
  constructor(id, hostName, roomKey) {
    this.id = id;
    this.host = new Player(hostName, true, null);
    this.key = roomKey;
    this.state = WAITING_ROOM;
    this.players = [this.host];
    this.president = null;
    this.proposals = [];
    this.turnNum = 0;
    this.deck = DECK;
    this.draw = [];
    this.discard = [];
    this.liberalScore = 0;
    this.fascistScore = 0;
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
    this.president = player.name;
  };

  voting = (turn, president, chancellor) => {
    if (turn !== this.turnNum) {
      this.proposals.push(new Proposal(president, chancellor));
      this.turnNum++;
    }
  };

  policies = () => {
    if (this.turnNum === 1) {
      shuffle(this.deck);
    }
    let i = 0;
    while (i < 3) {
      if (this.deck.length <= 3) {
        shuffle(this.discard);
        for(let j = 0; j < this.deck.length; j++){
          this.discard.unshift(this.deck.pop());
        }
        console.log(this.discard.length + "discard");
        this.deck = this.discard;
        console.log(this.deck.length + "deck1");
        this.discard = [];
        console.log('deck reshuffled');
      }
      this.draw[i] = this.deck.pop();
      i++;
    }
    console.log(this.deck.length + "deck");
  };

  discardPolicy = (policyIdx) => {
    this.discard.push(this.draw[policyIdx]);
    this.draw.splice(policyIdx, 1);
    console.log(this.draw.length + "draw pile after spliced");
  };

  playPolicy = () => {
    if (this.draw[0] === 'fascist') {
      this.fascistScore++;
    } else if (this.draw[0] === 'liberal') {
      this.liberalScore++;
    }
    this.discard.push(this.draw.pop());
  };

  presidentNext = (index) => {
    const nextIndex = index + 1;
    if (nextIndex < this.players.length) {
      this.president = this.players[nextIndex].name;
    } else {
      this.president = this.players[0].name;
    }
  };
}
