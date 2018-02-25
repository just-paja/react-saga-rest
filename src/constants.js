export const ACTION_FAIL = 'fail';
export const ACTION_START = 'start';
export const ACTION_SUCCESS = 'success';
export const FLAG_FAILED = 'failed';
export const FLAG_LOADING = 'loading';
export const FLAG_MISSING = 'missing';
export const FLAG_REQUIRED = 'required';
export const FLAG_VALID = 'valid';
export const STATE_DATA = 'data';
export const STATE_ERROR = 'error';
export const STATE_ERROR_LIST = 'errors';
export const STATE_PAGE = 'page';
export const STATE_SIZE = 'size';
export const STATE_TOTAL = 'total';

export const defaultResourceState = {
  [FLAG_FAILED]: false,
  [FLAG_LOADING]: false,
  [FLAG_VALID]: false,
  [STATE_DATA]: null,
  [STATE_ERROR]: null,
};

export const defaultCollectionState = {
  [FLAG_FAILED]: false,
  [FLAG_LOADING]: false,
  [FLAG_VALID]: false,
  [STATE_DATA]: [],
  [STATE_ERROR]: null,
  [STATE_PAGE]: 0,
  [STATE_SIZE]: 20,
  [STATE_TOTAL]: 0,
};
