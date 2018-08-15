/* eslint-disable no-await-in-loop */

import {
  JOIN_ERROR,
  JOIN_SUCCESS,
  CREATE_SUCCESS,
  PLAYER_JOIN_SUCCESS,
  GAME_RETRIEVED,
  GAME_ID_LENGTH,
  ROLES_ASSIGNED,
  CURRENT_PRESIDENT,
  WAITING_ROOM,
  PRESIDENT_NOMINATE,
  ELECT_CHANCELLOR,
  VOTE_NOMINATION,
  VOTE_RECORD,
  PRESIDENT_DISCARD,
  CHANCELLOR_DISCARD,
  PLAY_POLICY,
  SCORE,
  NEXT_PRESIDENT,
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
  const {
    locals: { currentGames, allGames },
  } = app;
  const {
    handshake: {
      session,
      session: { gameId },
    },
  } = socket;

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
  console.log('PLAYER NAME', session.playerName);
  attemptReconnect();

  function joinGame(game, name) {
    if (attemptReconnect()) {
      // attempt to reconnect if user is already in a game
      return;
    }
    session.gameId = game.id; // save game information in session
    session.playerName = name;
    session.save((err) => {
      console.log(err || 'session saved');
    });
    socket.join(game.key); // join socket room
  }

  socket.on('createGame', (hostName, key) => {
    const roomKey = key.toUpperCase();
    const status = WAITING_ROOM;
    if (currentGames[roomKey]) {
      socket.emit(JOIN_ERROR, `Room (key '${roomKey}') already exists.`);
    } else {
      const id = generateUniqueId(allGames, GAME_ID_LENGTH);
      const newGame = new Game(id, hostName, roomKey);
      const isHost = true;
      allGames[id] = newGame;
      currentGames[roomKey] = newGame;
      joinGame(newGame, hostName);
      socket.emit(CREATE_SUCCESS, {
        name: hostName,
        players: newGame.getPlayers(),
        isHost,
        roomKey,
        status,
      });
    }
  });

  socket.on('joinGame', (playerName, key) => {
    const roomKey = key.toUpperCase();
    const game = currentGames[roomKey];
    const isHost = false;
    const status = WAITING_ROOM;
    if (game) {
      const result = game.addPlayer(playerName);
      if (result.ok) {
        joinGame(game, playerName);
        socket.emit(JOIN_SUCCESS, {
          name: playerName,
          players: game.getPlayers(),
          isHost,
          roomKey,
          status,
        });
        socket.broadcast.to(roomKey).emit(PLAYER_JOIN_SUCCESS, game.getPlayers());
      } else {
        socket.emit(JOIN_ERROR, result.error);
      }
    } else {
      socket.emit(JOIN_ERROR, `Room (key '${roomKey}') does not exist.`);
    }
  });

  socket.on('assignRoles', (roomKey) => {
    const game = currentGames[roomKey];
    const status = PRESIDENT_NOMINATE;
    game.setup();
    const {
      players, president, liberalScore, fascistScore,
    } = game;
    io.in(roomKey).emit(SCORE, { liberalScore, fascistScore });
    io.in(roomKey).emit(ROLES_ASSIGNED, players);
    io.in(roomKey).emit(CURRENT_PRESIDENT, { president, status });
  });

  socket.on('electChancellor', (chancellor, roomKey, turn, president) => {
    const status = VOTE_NOMINATION;
    io.in(roomKey).emit(ELECT_CHANCELLOR, { chancellor, status, turn });
  });

  socket.on('votes', (vote, roomKey, president, chancellor, turn, players) => {
    const game = currentGames[roomKey];
    const status = 'voteRecord';

    game.voting(turn, president, chancellor);

    const { proposals } = game;
    const currentProposal = proposals[proposals.length - 1];

    currentProposal.receiveVotes(vote);
    io.in(roomKey).emit(VOTE_RECORD, { currentProposal, players, status });
  });

  socket.on('presidentPolicy', (roomKey, president) => {
    const game = currentGames[roomKey];
    const status = 'presidentDiscard';

    game.policies();

    const { draw } = game;

    io.in(roomKey).emit(PRESIDENT_DISCARD, { draw, status, president });
  });

  socket.on('chancellorPolicy', (roomKey, policyIdx, chancellor) => {
    const game = currentGames[roomKey];
    const status = 'chancellorDiscard';

    game.discardPolicy(policyIdx);

    const { draw } = game;

    io.in(roomKey).emit(CHANCELLOR_DISCARD, { draw, status, chancellor });
  });
  socket.on('playPolicy', (roomKey, policyIdx) => {
    const game = currentGames[roomKey];
    const status = 'playDiscard';

    game.discardPolicy(policyIdx);
    game.playPolicy();

    const { liberalScore, fascistScore } = game;

    io.in(roomKey).emit(PLAY_POLICY, { liberalScore, fascistScore, status });
  });
  socket.on('nextPresident', (roomKey, index) => {
    const game = currentGames[roomKey];
    const status = 'presidentNominate';

    game.presidentNext(index);

    const { president } = game;

    io.in(roomKey).emit(NEXT_PRESIDENT, { president, status });
  });
};
