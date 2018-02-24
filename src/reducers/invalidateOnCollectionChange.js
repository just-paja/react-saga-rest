import { STATE_PAGE } from '../constants';

import invalidateOnResourceChange from './invalidateOnResourceChange';

export default (identAttr, actionIdentAttr = null) => (state, action) => {
  const result = invalidateOnResourceChange(identAttr, actionIdentAttr)(state, action);
  return result === state ? state : {
    ...result,
    [STATE_PAGE]: 0,
  };
};
