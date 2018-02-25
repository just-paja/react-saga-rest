import PropTypes from 'prop-types';

import * as constants from './constants';

export const ErrorType = PropTypes.oneOfType([
  PropTypes.shape({
    message: PropTypes.string,
  }),
  PropTypes.string,
]);

export const ResourceId = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export const ResourceListProgress = PropTypes.shape({
  [constants.FLAG_FAILED]: PropTypes.bool,
  [constants.FLAG_LOADING]: PropTypes.bool,
  [constants.FLAG_VALID]: PropTypes.bool,
  [constants.STATE_ERROR_LIST]: PropTypes.arrayOf(ErrorType),
});

export const ResourceProgress = PropTypes.shape({
  [constants.FLAG_FAILED]: PropTypes.bool,
  [constants.FLAG_LOADING]: PropTypes.bool,
  [constants.FLAG_MISSING]: PropTypes.bool,
  [constants.FLAG_REQUIRED]: PropTypes.bool,
  [constants.FLAG_VALID]: PropTypes.bool,
  [constants.STATE_ERROR_LIST]: PropTypes.arrayOf(ErrorType),
});

export const RouteMatch = PropTypes.objectOf(PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
  PropTypes.bool,
]));
