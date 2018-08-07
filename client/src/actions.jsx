import socket from './socket';

export const CHANGE_VIEW = 'CHANGE_VIEW';
export const RECEIVE_ROOM = 'RECEIVE_ROOM';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';
export const RECEIVE_HOST_ROOM = 'RECEIVE_HOST_ROOM';
export const ASSIGN_ROLES = 'ASSIGN_ROLES';
export const ROLE_ASSIGNED = 'ROLE_ASSIGNED';
export const CURRENT_PRESIDENT = 'CURRENT_PRESIDENT';
export const CURRENT_CHANCELLOR = 'CURRENT_CHANCELLOR';
export const CURRENT_VOTES = 'CURRENT_VOTES';
export const CHOOSE_POLICY = 'CHOOSE_POLICY';

export const createRoom = (hostName, roomKey) => () => socket.emit('createGame', hostName, roomKey);

export const joinRoom = (playerName, roomKey) => () => socket.emit('joinGame', playerName, roomKey);

export const receiveRoom = (name, players, isHost, roomKey, status) => ({
  type: RECEIVE_ROOM,
  name,
  players,
  isHost,
  roomKey,
  status,
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

export const currentPresident = (president, status) => ({
  type: CURRENT_PRESIDENT,
  president,
  status,
});

export const electChancellor = (chancellor, roomKey, turn) => () =>
  socket.emit('electChancellor', chancellor, roomKey, turn);

export const currentChancellor = (chancellor, status, turn) => ({
  type: CURRENT_CHANCELLOR,
  chancellor,
  status,
  turn,
});

export const votes = (vote, roomKey, president, chancellor, turn, players) => () =>
  socket.emit('votes', vote, roomKey, president, chancellor, turn, players);

export const currentVotes = (voteResult, status) => ({
  type: CURRENT_VOTES,
  voteResult,
  status,
});

export const presidentPolicy = roomKey => () => socket.emit('presidentPolicy', roomKey);

export const choosePolicy = (draw, status) => ({
  type: CHOOSE_POLICY,
  draw,
  status,
});

export const chancellorPolicy = roomKey => () => socket.emit('chancellorPolicy', roomKey);
