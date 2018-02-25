import { createSelector } from 'reselect';

export default (source, prop) => createSelector(source, state => (
  state ? state[prop] : null
));
