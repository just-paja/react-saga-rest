import getFlagValue from './getFlagValue'
import getStateProperty from './getStateProperty'

export default getStateProperty(flag => state => getFlagValue(state, flag))
