import socket from './socket';

export const CHANGE_VIEW = 'CHANGE_VIEW';
export const RECEIVE_ROOM = 'RECEIVE_ROOM';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';

export const createRoom = (hostName, roomKey) => {
  return dispatch => {
    return socket.emit('createGame', hostName, roomKey);
    // return fetch('/api/createRoom', {
    //   method: 'post',
    //   credentials: 'same-origin',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ hostName, roomKey }),
    // }).then((response) => {
    //   if (response.status !== 200) {
    //     throw new Error(response.statusText);
    //   } else {
    //     return response.json();
    //   }
    // }).then((room) => {
    //   dispatch(receiveRoom(hostName, room));
    // }).catch((err) => {
    //   dispatch(receiveError(err.message));
    // });
  }
}

export const joinRoom = (playerName, roomKey) => {
  return dispatch => {
    return socket.emit('joinGame', playerName, roomKey);
    // return fetch('/api/joinRoom', {
    //   method: 'put',
    //   credentials: 'same-origin',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ name, roomKey }),
    // }).then((response) => {
    //   if (response.status !== 200) {
    //     throw new Error(response.statusText);
    //   } else {
    //     return response.json();
    //   }
    // }).then((room) => {
    //   dispatch(receiveRoom(name, room));
    // }).catch((err) => {
    //   dispatch(receiveError(err.message));
    // });
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
