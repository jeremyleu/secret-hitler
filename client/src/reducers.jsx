import {
  CHANGE_VIEW,
  RECEIVE_ROOM,
  RECEIVE_ERROR,
  UPDATE_PLAYERS,
  ROLE_ASSIGNED,
  CURRENT_PRESIDENT,
} from './actions';

export function players(state = null, action) {
  switch (action.type) {
    case RECEIVE_ROOM:
      return action.players;
    case UPDATE_PLAYERS:
      return action.players;
    case ROLE_ASSIGNED:
      return action.players;
    default:
      return state;
  }
}

export function name(state = null, action) {
  switch (action.type) {
    case RECEIVE_ROOM:
      return action.name;
    default:
      return state;
  }
}

export function roomKey(state = null, action) {
  switch (action.type) {
    case RECEIVE_ROOM:
      return action.roomKey;
    default:
      return state;
  }
}

export function role(state = null, action) {
  switch (action.type) {
    case ROLE_ASSIGNED:
      return action.role;
    default:
      return state;
  }
}

export function isHost(state = null, action) {
  switch (action.type) {
    case RECEIVE_ROOM:
      return action.isHost;
    default:
      return state;
  }
}

export function error(state = null, action) {
  switch (action.type) {
    case RECEIVE_ERROR:
      return action.error;
    case RECEIVE_ROOM:
      return null;
    case CHANGE_VIEW:
      return null;
    default:
      return state;
  }
}

export function view(state = 'landing', action) {
  switch (action.type) {
    case CHANGE_VIEW:
      return action.newView;
    case RECEIVE_ROOM:
      return 'waiting';
    default:
      return state;
  }
}

export function president(state = null, action) {
  switch (action.type) {
    case CURRENT_PRESIDENT:
      return action.president;
    default:
      return state;
  }
}
