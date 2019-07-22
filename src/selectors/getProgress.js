import { createSelector } from 'reselect'

import getFlagValue from './getFlagValue'

import { isStateRequired } from './isRequired'
import {
  FLAG_FAILED,
  FLAG_LOADING,
  FLAG_MISSING,
  FLAG_REQUIRED,
  FLAG_VALID,
  STATE_ERROR,
  STATE_ERROR_LIST
} from '../constants'

const translateStateProgress = state => ({
  [FLAG_FAILED]: getFlagValue(state, FLAG_FAILED),
  [FLAG_LOADING]: getFlagValue(state, FLAG_LOADING),
  [FLAG_MISSING]: getFlagValue(state, FLAG_MISSING),
  [FLAG_REQUIRED]: isStateRequired(state),
  [FLAG_VALID]: getFlagValue(state, FLAG_VALID),
  [STATE_ERROR_LIST]: state && state[STATE_ERROR] ? [state[STATE_ERROR]] : []
})

export default (...selectors) => createSelector(
  selectors,
  (...states) => {
    if (states.length === 1) {
      return translateStateProgress(states[0])
    }
    const progressMap = states.map(translateStateProgress)
    return {
      [FLAG_FAILED]: progressMap.some(state => getFlagValue(state, FLAG_FAILED)),
      [FLAG_LOADING]: progressMap.some(state => getFlagValue(state, FLAG_LOADING)),
      [FLAG_MISSING]: progressMap.some(state => getFlagValue(state, FLAG_MISSING)),
      [FLAG_REQUIRED]: progressMap.some(state => getFlagValue(state, FLAG_REQUIRED)),
      [FLAG_VALID]: progressMap.every(state => getFlagValue(state, FLAG_VALID)),
      [STATE_ERROR_LIST]: progressMap
        .filter(progress => progress.errors.length > 0)
        .map(progress => progress[STATE_ERROR_LIST])
        .reduce((aggr, errors) => aggr.concat(errors), [])
    }
  })
