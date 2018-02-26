import { createSelector } from 'reselect';

import getFlagValue from './getFlagValue';

import {
  FLAG_VALID,
  FLAG_LOADING,
} from '../constants';

export const isStateRequired = state => !state || (
  !getFlagValue(state, FLAG_VALID) &&
  !getFlagValue(state, FLAG_LOADING)
);

export default source => createSelector(source, isStateRequired);
