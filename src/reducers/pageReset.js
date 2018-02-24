import {
  FLAG_VALID,
  STATE_PAGE,
} from '../constants';

export default state => (
  state[STATE_PAGE] === 0 ? state : ({
    ...state,
    [FLAG_VALID]: false,
    [STATE_PAGE]: 0,
  })
);
