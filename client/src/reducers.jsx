import {
  CHANGE_VIEW
} from './actions';

export function view(state = 'landing', action) {
  switch(action.type) {
    case CHANGE_VIEW:
      return action.newView;
    default:
      return state;
  }
}
