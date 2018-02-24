import { FLAG_FAILED, FLAG_LOADING } from '../constants';

export default state => ({
  ...state,
  [FLAG_FAILED]: false,
  [FLAG_LOADING]: true,
});
