import {
  FLAG_VALID,
  STATE_PAGE,
} from '../constants';

export default (state, action) => ({
  ...state,
  [FLAG_VALID]: false,
  [STATE_PAGE]: action[STATE_PAGE],
});
