const express = require('express');
const path = require('path');
const redis = require('redis');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const sharedsession = require("express-socket.io-session");

const app = express();
const server = require('http').createServer(app);

const client = process.env.REDIS_URL ? redis.createClient(process.env.REDIS_URL) :
  redis.createClient();

const options = {
  client,
};

const sessionMiddleware = session({
  name: 'server-session-cookie-id',
  store: new RedisStore(options),
  secret: 'cheerslitter',
  resave: true,
  saveUninitialized: true,
  proxy: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
  },
});

app.use(sessionMiddleware);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Listening on port ${port}`));

const io = require('socket.io').listen(server);

io.use(sharedsession(sessionMiddleware));

const events = require('./socket-events');

io.sockets.on('connection', (socket) => {
  console.log('connected to socket.io');
  const { handshake: { session } } = socket;

  session.connected = true;
  session.save((err) => { /* handle error */
    console.log("error: " + err);
  });

  events.initGame(io, socket, app);

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  console.log(req.sessionID);
});

client.on('connect', () => {
  console.log('connected to redis');
  app.locals.redisClient = client;
});

app.locals.currentGames = {};
app.locals.allGames = {};
