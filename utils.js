export function shuffle(array) {
  let m = array.length;
  let t = 0;
  let i = 0;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export function assign(players, roles) {
  let i = 0;
  while (i < players.length) {
    players[i].role = roles[i];
    i++;
  }

  return players;
}
