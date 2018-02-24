import { createSelector } from 'reselect';

export default (selector, prop) => createSelector(selector, state => (
  state ? state[prop] : null
));
