import { createSelector } from 'reselect';

import getFlagValue from './getFlagValue';
import getStateError from './getStateError';

import { isStateRequired } from './isRequired';
import {
  FLAG_FAILED,
  FLAG_LOADING,
  FLAG_REQUIRED,
  FLAG_VALID,
  STATE_ERROR,
  STATE_ERROR_LIST,
} from '../constants';

const translateStateProgress = state => ({
  [FLAG_FAILED]: getFlagValue(state, FLAG_FAILED),
  [FLAG_LOADING]: getFlagValue(state, FLAG_LOADING),
  [FLAG_REQUIRED]: isStateRequired(state),
  [FLAG_VALID]: getFlagValue(state, FLAG_VALID),
  [STATE_ERROR]: state ? state[STATE_ERROR] || null : null,
});

export default (...selectors) => createSelector(
  selectors,
  (...states) => {
    if (states.length === 1) {
      return translateStateProgress(states[0]);
    }
    const progressMap = states.map(translateStateProgress);
    return {
      [FLAG_FAILED]: progressMap.some(state => getFlagValue(state, FLAG_FAILED)),
      [FLAG_LOADING]: progressMap.some(state => getFlagValue(state, FLAG_LOADING)),
      [FLAG_VALID]: progressMap.every(state => getFlagValue(state, FLAG_VALID)),
      [STATE_ERROR_LIST]: progressMap
        .filter(getStateError)
        .map(getStateError),
    };
  });
