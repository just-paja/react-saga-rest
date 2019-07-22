import {
  FLAG_LOADING,
  FLAG_VALID
} from '../constants'

export default state => ({
  ...state,
  [FLAG_LOADING]: false,
  [FLAG_VALID]: false
})
