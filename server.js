const express = require('express');
const path = require('path');
const redis = require('redis');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const app = express();
const port = process.env.PORT || 5000;

const io = require('socket.io').listen(port);

console.log(io);

app.set('socket.io', io);
io.sockets.on('connection', (socket) => {
  console.log('Connected');
  socket.on('join', (data) => {
    console.log(`new connection: ${data.id}`);
  });
});

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

const client = process.env.REDIS_URL ? redis.createClient(process.env.REDIS_URL) :
  redis.createClient();

const options = {
  client,
};

app.use(session({
  store: new RedisStore(options),
  secret: 'cheerslitter',
  resave: false,
  saveUninitialized: true,
  proxy: true,
}));

client.on('connect', () => {
  console.log('connected to redis');
  app.set('redisClient', client);
});

app.use(require('./routes'));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.set('rooms', {});
