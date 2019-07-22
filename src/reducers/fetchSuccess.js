import {
  FLAG_FAILED,
  FLAG_LOADING,
  FLAG_MISSING,
  FLAG_VALID,
  STATE_DATA
} from '../constants'

export default (state, action) => ({
  ...state,
  [FLAG_FAILED]: false,
  [FLAG_LOADING]: false,
  [FLAG_MISSING]: action[FLAG_MISSING],
  [FLAG_VALID]: true,
  [STATE_DATA]: action[STATE_DATA] || action.payload
})
