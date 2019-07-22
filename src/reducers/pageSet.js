import {
  FLAG_VALID,
  STATE_PAGE
} from '../constants'

export default (state, action) => {
  const actionPage = typeof action[STATE_PAGE] === 'undefined' ? action.payload : action[STATE_PAGE]
  return (state[STATE_PAGE] === actionPage ? state : ({
    ...state,
    [FLAG_VALID]: false,
    [STATE_PAGE]: actionPage
  }))
}
