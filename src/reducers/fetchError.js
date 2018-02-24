import {
  FLAG_FAILED,
  FLAG_LOADING,
  FLAG_MISSING,
  FLAG_VALID,
  STATE_ERROR,
} from '../constants';

export default (state, action) => ({
  ...state,
  [FLAG_FAILED]: true,
  [FLAG_LOADING]: false,
  [FLAG_MISSING]: !!action[FLAG_MISSING],
  [FLAG_VALID]: !!action[FLAG_VALID],
  [STATE_ERROR]: action[STATE_ERROR] || null,
});
