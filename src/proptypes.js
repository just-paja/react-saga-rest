import PropTypes from 'prop-types'

import * as constants from './constants'

export const ErrorType = PropTypes.oneOfType([
  PropTypes.shape({
    message: PropTypes.string
  }),
  PropTypes.string
])

export const LocationProp = PropTypes.shape({
  pathname: PropTypes.string
})

export const HistoryProp = PropTypes.shape({
  action: PropTypes.string,
  block: PropTypes.func,
  createHref: PropTypes.func,
  go: PropTypes.func,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  length: PropTypes.number,
  listen: PropTypes.func,
  location: LocationProp.isRequired,
  push: PropTypes.func,
  replace: PropTypes.func
})

export const ResourceId = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
])

export const ResourceProgress = PropTypes.shape({
  [constants.FLAG_FAILED]: PropTypes.bool,
  [constants.FLAG_LOADING]: PropTypes.bool,
  [constants.FLAG_MISSING]: PropTypes.bool,
  [constants.FLAG_REQUIRED]: PropTypes.bool,
  [constants.FLAG_VALID]: PropTypes.bool,
  [constants.STATE_ERROR_LIST]: PropTypes.arrayOf(ErrorType)
})

export const RouteMatch = PropTypes.objectOf(PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
  PropTypes.bool
]))
