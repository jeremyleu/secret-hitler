import {
  CHANGE_VIEW,
  RECEIVE_ROOM,
  RECEIVE_ERROR,
  UPDATE_PLAYERS,
  ROLE_ASSIGNED,
  CURRENT_PRESIDENT,
  CURRENT_CHANCELLOR,
  CURRENT_VOTES,
  CHOOSE_POLICY,
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

export function status(state = null, action) {
  switch (action.type) {
    case RECEIVE_ROOM:
      return action.status;
    case CURRENT_PRESIDENT:
      return action.status;
    case CURRENT_CHANCELLOR:
      return action.status;
    case CURRENT_VOTES:
      return action.status;
    case CHOOSE_POLICY:
      return action.status;
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

export function chancellor(state = null, action) {
  switch (action.type) {
    case CURRENT_CHANCELLOR:
      return action.chancellor;
    default:
      return state;
  }
}

export function turn(state = null, action) {
  switch (action.type) {
    case CURRENT_CHANCELLOR:
      return action.turn;
    default:
      return state;
  }
}

export function voteResult(state = null, action) {
  switch (action.type) {
    case CURRENT_VOTES:
      return action.voteResult;
    default:
      return state;
  }
}

export function policies(state = null, action) {
  switch (action.type) {
    case CHOOSE_POLICY:
      return action.draw;
    default:
      return state;
  }
}
