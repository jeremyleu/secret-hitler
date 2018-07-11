/* eslint-disable no-await-in-loop */

import {
  JOIN_ERROR,
  JOIN_SUCCESS,
  CREATE_SUCCESS,
  PLAYER_JOIN_SUCCESS,
  GAME_RETRIEVED,
  GAME_ID_LENGTH,
  WAITING_ROOM,
} from './constants';
import Game from './Game';

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

  function attemptReconnect() {
    if (allGames[gameId] && session.playerName) {
      const game = allGames[gameId];
      socket.emit(GAME_RETRIEVED, {
        state: game.state,
        name: session.playerName,
        players: game.players,
      });
      return true;
    }
    return false;
  }
  console.log("PLAYER NAME", session.playerName);
  attemptReconnect();

  function joinGame(game, name) {
    if (attemptReconnect()) { // attempt to reconnect if user is already in a game
      return;
    }
    session.gameId = game.id; // save game information in session
    session.playerName = name;
    session.save((err) => { console.log(err || 'session saved'); });
    socket.join(game.key); // join socket room
  }

  socket.on('createGame', (hostName, key) => {
    const roomKey = key.toUpperCase();

    if (currentGames[roomKey]) {
      socket.emit(JOIN_ERROR, `Room (key '${roomKey}') already exists.`);
    } else {
      const id = generateUniqueId(allGames, GAME_ID_LENGTH);
      const newGame = new Game(id, hostName, roomKey);
      const isHost = true;
      allGames[id] = newGame;
      currentGames[roomKey] = newGame;
      joinGame(newGame, hostName);
      socket.emit(CREATE_SUCCESS, { name: hostName, players: newGame.getPlayers(), isHost: isHost });
    }
  });

  socket.on('joinGame', (playerName, key) => {
    const roomKey = key.toUpperCase();
    const game = currentGames[roomKey];
    const isHost = false;
    if (game) {
      const result = game.addPlayer(playerName);
      if (result.ok) {
        joinGame(game, playerName);
        socket.emit(JOIN_SUCCESS, { name: playerName, players: game.getPlayers(), isHost: isHost });
        socket.broadcast.to(roomKey).emit(PLAYER_JOIN_SUCCESS, game.getPlayers());
      } else {
        socket.emit(JOIN_ERROR, result.error);
      }
    } else {
      socket.emit(JOIN_ERROR, `Room (key '${roomKey}') does not exist.`);
    }
  });
};
