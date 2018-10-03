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
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const HAS_VOTED = 'HAS_VOTED';
export const PREVIOUS_PRESIDENT = 'PREVIOUS_PRESIDENT';
export const PREVIOUS_CHANCELLOR = 'PREVIOUS_CHANCELLOR';

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

export const voteStatus = () => ({
  type: HAS_VOTED,
});

export const votes = (vote, roomKey, president, chancellor, turn, players) => (dispatch) => {
  socket.emit('votes', vote, roomKey, president, chancellor, turn, players);
  dispatch(voteStatus());
};

export const currentVotes = (voteResult, status) => ({
  type: CURRENT_VOTES,
  voteResult,
  status,
});

export const presidentPolicy = (roomKey, president) => () =>
  socket.emit('presidentPolicy', roomKey, president);

export const choosePolicy = (draw, status) => ({
  type: CHOOSE_POLICY,
  draw,
  status,
});

export const chancellorPolicy = (roomKey, policyIdx, chancellor) => () =>
  socket.emit('chancellorPolicy', roomKey, policyIdx, chancellor);

export const playPolicy = (roomKey, policyIdx) => () =>
  socket.emit('playPolicy', roomKey, policyIdx);

export const updateScore = (liberalScore, fascistScore, status) => ({
  type: UPDATE_SCORE,
  liberalScore,
  fascistScore,
  status,
});

export const nextPresident = (roomKey, index) => () => socket.emit('nextPresident', roomKey, index);

export const prevPresident = president => ({
  type: PREVIOUS_PRESIDENT,
  president,
});

export const prevChancellor = chancellor => ({
  type: PREVIOUS_CHANCELLOR,
  chancellor,
});
