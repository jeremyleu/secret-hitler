const express = require('express');
const path = require('path');
const redis = require('redis');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(require('./routes'));

app.listen(port, () => console.log(`Listening on port ${port}`));

const client = redis.createClient();

client.on('connect', () => {
  console.log('connected to redis');
});
