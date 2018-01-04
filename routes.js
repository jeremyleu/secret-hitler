const express = require('express');

const router = express.Router();

const getPlayer = (game, name) => game.players.find(player =>
  (player.name.toUpperCase() === name.toUpperCase()));

router.post('/api/createRoom', (req, res) => {
  const rooms = req.app.get('rooms');
  const { roomKey, hostName } = req.body;

  if (rooms[roomKey]) {
    res.status(409).send(`Room with key '${roomKey}' already exists.`);
  } else {
    const newGame = {
      host: hostName,
      key: roomKey,
      players: [{
        name: hostName,
      }],
    };
    rooms[roomKey] = newGame;
    res.send(newGame);
  }
});

router.put('/api/joinRoom', (req, res) => {
  const rooms = req.app.get('rooms');
  const { name, roomKey } = req.body;
  const game = rooms[roomKey];

  if (game) {
    if (getPlayer(game, name)) {
      res.status(409).send(`Player with name '${name}' in room with key '${roomKey}' already exists.`);
    } else {
      game.players.push({
        name,
      });
      rooms[roomKey] = game;
      res.send(game);
    }
  } else {
    res.status(404).send('We couldn\'t find that room.');
  }
});


module.exports = router;
