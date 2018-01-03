const express = require('express');

const router = express.Router();

router.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

router.post('/api/createRoom', (req, res) => {
  const client = req.app.get('redisClient');
  const { roomKey, hostName } = req.body;
  client.get(roomKey, (err, room) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: 'Internal server error.' });
    } else if (room) {
      res.status(409).send({ error: `Room with key ${roomKey} already exists.` });
    } else {
      const newGame = {
        host: hostName,
        key: roomKey,
        players: [{
          name: hostName,
        }],
      };
      client.set(roomKey, JSON.stringify(newGame), (error) => {
        if (error) {
          console.log(error);
          res.status(500).send({ error: 'Internal server error.' });
        } else {
          res.send(newGame);
        }
      });
    }
  });
});

router.put('/api/joinRoom', (req, res) => {
  const client = req.app.get('redisClient');
  const { name, roomKey } = req.body;
  console.log(req.body);
  client.get(roomKey, (err, resp) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: 'Internal server error.' });
    } else if (resp) {
      const game = JSON.parse(resp);
      game.players.push({
        name,
      });
      client.set(roomKey, JSON.stringify(game), (error) => {
        if (error) {
          console.log(error);
          res.status(500).send({ error: 'Internal server error.' });
        } else {
          res.send(game);
        }
      });
    } else {
      res.status(404).send({ error: 'We couldn\'t find that room.' });
    }
  });
});

module.exports = router;
