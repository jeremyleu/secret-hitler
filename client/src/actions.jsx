import socket from './socket';

export const CHANGE_VIEW = 'CHANGE_VIEW';
export const RECEIVE_ROOM = 'RECEIVE_ROOM';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';
export const RECEIVE_HOST_ROOM = 'RECEIVE_HOST_ROOM';

export const createRoom = (hostName, roomKey) => () => socket.emit('createGame', hostName, roomKey);

export const joinRoom = (playerName, roomKey) => () => socket.emit('joinGame', playerName, roomKey);

export const receiveRoom = (name, players, isHost) => ({
  type: RECEIVE_ROOM,
  name,
  players,
  isHost,
});

export const receiveError = error => ({
  type: RECEIVE_ERROR,
  error,
});

export const changeView = newView => ({
  type: CHANGE_VIEW,
  newView,
});

export const updatePlayers = players => ({
  type: UPDATE_PLAYERS,
  players,
});
