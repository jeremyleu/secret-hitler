const express = require('express');

const router = express.Router();

const getPlayer = (game, name) => game.players.find(player =>
  (player.name.toUpperCase() === name.toUpperCase()));

router.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = 0;
  }

  // get the url pathname

  // count the views
  req.session.views += 1;

  next();
});

router.get('/foo', (req, res, next) => {
  res.send(`you viewed this page ${req.session.views} times`);
});

router.get('/bar', (req, res, next) => {
  res.send(`you viewed this page ${req.session.views} times`);
});

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
    req.session.roomKey = roomKey;
    console.log(req.sessionID);
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
      req.session.roomKey = roomKey;
      console.log(req.sessionID);
      res.send(game);
    }
  } else {
    res.status(404).send('We couldn\'t find that room.');
  }
});


module.exports = router;
