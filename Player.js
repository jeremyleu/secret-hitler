export default class Player {
  constructor(name, isHost) {
    this.name = name;
    this.isHost = isHost;
  }

  getName = () => this.name;
}