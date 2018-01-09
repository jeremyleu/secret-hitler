import socket from './socket';

export const CHANGE_VIEW = 'CHANGE_VIEW';
export const RECEIVE_ROOM = 'RECEIVE_ROOM';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';

export const createRoom = (hostName, roomKey) => {
  return dispatch => {
    return socket.emit('createGame', hostName, roomKey);
  }
}

export const joinRoom = (playerName, roomKey) => {
  return dispatch => {
    return socket.emit('joinGame', playerName, roomKey);
  }
}

export const receiveRoom = (name, players) => ({
  type: RECEIVE_ROOM,
  name,
  players,
});

export const receiveError = (error) => ({
  type: RECEIVE_ERROR,
  error,
});

export const changeView = (newView) => ({
  type: CHANGE_VIEW,
  newView,
});

export const updatePlayers = (players) => ({
  type: UPDATE_PLAYERS,
  players,
})
