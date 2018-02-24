import { call, select } from 'redux-saga/effects';

import fetchResource from './fetchResource';

export default function* fetchResourceIfRequired(resource, {
  isRequired,
  ...other
}) {
  const shouldFetch = yield select(isRequired);

  if (shouldFetch) {
    yield call(fetchResource, resource, {
      ...other,
    });
  }
}
