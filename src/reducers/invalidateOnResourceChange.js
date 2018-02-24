import { FLAG_VALID } from '../constants';

export default (identAttr, actionIdentAttr = null) => (state, action) => {
  const identAttrName = actionIdentAttr || identAttr;
  const actionValue = action[identAttrName];

  if (!identAttrName || state[identAttr] === actionValue) {
    return state;
  }

  return {
    ...state,
    [identAttr]: actionValue,
    [FLAG_VALID]: false,
  };
};
