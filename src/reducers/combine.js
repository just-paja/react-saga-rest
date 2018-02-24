export default (defaultState, reducers) => (state = defaultState, action = {}) => {
  if (action.type && (typeof reducers[action.type] === 'function')) {
    return reducers[action.type](state, action);
  }

  return state;
};
