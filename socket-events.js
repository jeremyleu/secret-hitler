const getPlayer = (game, name) => game.players.find(player =>
  (player.name.toUpperCase() === name.toUpperCase()));

exports.initGame = (io, socket, app) => {
  socket.on('createGame', (hostName, roomKey) => {
    const { locals: { rooms } } = app;

    if (rooms[roomKey]) {
      socket.emit('error', `Room with key '${roomKey}' already exists.`);
    } else {
      const newGame = {
        host: hostName,
        key: roomKey,
        players: [{
          name: hostName,
        }],
      };
      rooms[roomKey] = newGame;
      console.log(socket.request.sessionID);
      socket.join(roomKey);
      socket.emit('createSuccess', newGame);
    }
  });

  socket.on('joinGame', (playerName, roomKey) => {
    const { locals: { rooms } } = app;
    const game = rooms[roomKey];

    if (game) {
      if (getPlayer(game, playerName)) {
        socket.emit('error', `Player with name '${name}' in room with key '${roomKey}' already exists.`);
      } else {
        game.players.push({
          name: playerName,
        });
        console.log(socket.request.sessionID);
        socket.join(roomKey);
        socket.emit('joinSuccess', game);
      }
    } else {
      socket.emit('error', `Room with key '${roomKey}' does not exist.`);
    }
  });
};
