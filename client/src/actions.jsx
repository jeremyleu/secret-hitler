import socket from './socket';

export const CHANGE_VIEW = 'CHANGE_VIEW';
export const RECEIVE_ROOM = 'RECEIVE_ROOM';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';
export const RECEIVE_HOST_ROOM = 'RECEIVE_HOST_ROOM';
export const ASSIGN_ROLES = 'ASSIGN_ROLES';
export const ROLE_ASSIGNED = 'ROLE_ASSIGNED';
export const CURRENT_PRESIDENT = 'CURRENT_PRESIDENT';

export const createRoom = (hostName, roomKey) => () => socket.emit('createGame', hostName, roomKey);

export const joinRoom = (playerName, roomKey) => () => socket.emit('joinGame', playerName, roomKey);

export const receiveRoom = (name, players, isHost, roomKey) => ({
  type: RECEIVE_ROOM,
  name,
  players,
  isHost,
  roomKey,
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

export const assignRoles = roomKey => () => socket.emit('assignRoles', roomKey);

export const roleAssigned = (role, players) => ({
  type: ROLE_ASSIGNED,
  role,
  players,
});

export const currentPresident = president => ({
  type: CURRENT_PRESIDENT,
  president,
});
