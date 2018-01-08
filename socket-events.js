/* eslint-disable no-await-in-loop */

const getPlayer = (game, name) => game.players.find(player =>
  (player.name.toUpperCase() === name.toUpperCase()));

const MAX_PLAYERS = 10;
const JOIN_ERROR = 'joinError';
const JOIN_SUCCESS = 'joinSuccess';
const CREATE_SUCCESS = 'createSuccess';
const PLAYER_JOIN_SUCCESS = 'playerJoinSuccess';
const GAME_RETRIEVED = 'gameRetrieved';
const GAME_ID_LENGTH = 10;
const WAITING_ROOM = 'waitingRoom';

function generateId(length) {
  let id = '';
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    id += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  return id;
}

function generateUniqueId(allGames, length) {
  let id = generateId(length);
  let existingGame = allGames[id];
  while (existingGame) {
    id = generateId(length);
    existingGame = allGames[id];
  }
  return id;
}

exports.initGame = (io, socket, app) => {
  const { locals: { currentGames, allGames } } = app;
  const { handshake: { session, session: { gameId } } } = socket;

  console.log('38', session);

  if (allGames[gameId] && session.playerName) {
    const game = allGames[gameId];
    socket.emit(GAME_RETRIEVED, {
      state: game.state,
      name: session.playerName,
      players: game.players,
    });
  }

  function joinGame(game, name) {
    session.gameId = game.id;
    session.playerName = name;
    session.save((err) => { console.log(err || 'session saved'); });
    console.log('53', session);
    socket.join(game.key);
  }

  socket.on('createGame', (hostName, key) => {
    const roomKey = key.toUpperCase();

    if (currentGames[roomKey]) {
      socket.emit(JOIN_ERROR, `Room (key '${roomKey}') already exists.`);
    } else {
      const id = generateUniqueId(allGames, GAME_ID_LENGTH);
      const newGame = {
        id,
        host: hostName,
        key: roomKey,
        state: WAITING_ROOM,
        players: [{
          name: hostName,
        }],
      };
      allGames[id] = newGame;
      currentGames[roomKey] = newGame;
      joinGame(newGame, hostName);
      socket.emit(CREATE_SUCCESS, { name: hostName, players: newGame.players });
    }
  });

  socket.on('joinGame', (playerName, key) => {
    const roomKey = key.toUpperCase();
    const game = currentGames[roomKey];

    if (game) {
      if (getPlayer(game, playerName)) {
        socket.emit(JOIN_ERROR, `Player with name '${playerName}' in room (key '${roomKey}') already exists.`);
      } else if (game.players.length >= MAX_PLAYERS) {
        socket.emit(JOIN_ERROR, `Room (key ${roomKey}) is full.`);
      } else {
        game.players.push({
          name: playerName,
        });
        joinGame(game, playerName);
        socket.emit(JOIN_SUCCESS, { name: playerName, players: game.players });
        socket.broadcast.to(roomKey).emit(PLAYER_JOIN_SUCCESS, game.players);
      }
    } else {
      socket.emit(JOIN_ERROR, `Room (key '${roomKey}') does not exist.`);
    }
  });
};
