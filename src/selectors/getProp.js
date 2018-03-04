import { createSelector } from 'reselect';

const getStateProp = prop => state => (
  state ? (state[prop] || null) : null
);

export default (sources, prop) => {
  const getter = getStateProp(prop);
  if (sources instanceof Function) {
    return createSelector(sources, getter);
  }
  const keys = Object.keys(sources);
  return createSelector(
    keys.map(key => sources[key]),
    (...states) => states.reduce((aggr, state, index) => ({
      ...aggr,
      [keys[index]]: getter(state),
    }), {})
  );
};
