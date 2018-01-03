const express = require('express');

const router = express.Router();

router.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

router.get('/api/createRoom', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

module.exports = router;
