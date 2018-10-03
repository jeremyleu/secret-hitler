export default class Player {
  constructor(name, isHost, role) {
    this.name = name;
    this.isHost = isHost;
    this.role = role;
  }

  getName = () => this.name;

  getRole = () => this.role;
}