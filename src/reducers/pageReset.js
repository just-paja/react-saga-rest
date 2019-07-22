import { STATE_PAGE } from '../constants'

import pageSet from './pageSet'

export default state => pageSet(state, { [STATE_PAGE]: 0 })
