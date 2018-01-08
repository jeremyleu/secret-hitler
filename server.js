const express = require('express');
const path = require('path');
const redis = require('redis');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const sharedsession = require('express-socket.io-session');

const app = express();
const server = require('http').createServer(app);

const client = process.env.REDIS_URL ? redis.createClient(process.env.REDIS_URL) :
  redis.createClient();

const options = {
  client,
};

const sessionMiddleware = session({
  store: new RedisStore(options),
  secret: 'cheerslitter',
  resave: true,
  saveUninitialized: true,
  proxy: true,
  rolling: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
  },
});

const io = require('socket.io')(server);

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

const events = require('./socket-events');

io.sockets.on('connection', (socket) => {
  console.log('connected to socket.io');

  events.initGame(io, socket, app);

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(sessionMiddleware);

client.on('connect', () => {
  console.log('connected to redis');
  app.locals.redisClient = client;
});

server.listen(port, () => console.log(`Listening on port ${port}`));

app.locals.currentGames = {};
app.locals.allGames = {};
