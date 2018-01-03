export const CHANGE_VIEW = 'CHANGE_VIEW';
export const RECEIVE_ROOM = 'RECEIVE_ROOM';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export const createRoom = (hostName, roomKey) => {
  return dispatch => {
    return fetch('/api/createRoom', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hostName, roomKey }),
    }).then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    }).then((room) => {
      dispatch(receiveRoom(hostName, room));
    }).catch((err) => {
      dispatch(receiveError(err));
    });
  }
}

export const joinRoom = (name, roomKey) => {
  console.log({name, roomKey});
  return dispatch => {
    return fetch('/api/joinRoom', {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, roomKey }),
    }).then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    }).then((room) => {
      dispatch(receiveRoom(name, room));
    }).catch((err) => {
      dispatch(receiveError(err));
    });
  }
}

export const receiveRoom = (name, room) => ({
  type: RECEIVE_ROOM,
  name,
  room,
});

export const receiveError = (error) => ({
  type: RECEIVE_ERROR,
  error,
});

export const changeView = (newView) => ({
  type: CHANGE_VIEW,
  newView,
});
