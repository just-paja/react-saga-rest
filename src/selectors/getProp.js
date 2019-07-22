import getStateProperty from './getStateProperty'

export default getStateProperty(prop => state => (
  state ? (state[prop] || null) : null
))
