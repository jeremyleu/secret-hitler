export default class Proposal {
  constructor(president, chancellor) {
    this.president = president;
    this.chancellor = chancellor;
    this.votes = [];
  }

  receiveVotes = (vote) => {
    this.votes.push(vote);
  }
}
