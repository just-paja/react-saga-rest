import {
  FLAG_FAILED,
  FLAG_MISSING,
  FLAG_VALID,
  STATE_ERROR,
} from '../constants';

export default (state, action) => ({
  ...state,
  [FLAG_FAILED]: true,
  [FLAG_MISSING]: action.payload ? !!action.payload[FLAG_MISSING] : false,
  [FLAG_VALID]: !!action[FLAG_VALID],
  [STATE_ERROR]: action.payload || null,
});
