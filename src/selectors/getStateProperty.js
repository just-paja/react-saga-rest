import { createSelector } from 'reselect';

export default getterFunc => (sources, prop) => {
  const getter = getterFunc(prop);
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
