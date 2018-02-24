import { call, put } from 'redux-saga/effects';

import {
  ACTION_START,
  ACTION_FAIL,
  ACTION_SUCCESS,
} from '../constants';

const shouldParseBody = response => (
  response &&
  response.status >= 200 &&
  response.status !== 204 &&
  response.status !== 404
);

const assertActionsPresent = (actions) => {
  if (!actions) {
    throw Error('When calling fetchResource, actions object must be passed');
  }
  if (!actions[ACTION_FAIL] || !actions[ACTION_START] || !actions[ACTION_SUCCESS]) {
    throw Error(`When calling fetchResource, actions must contain keys ${ACTION_FAIL}, ${ACTION_START}, ${ACTION_SUCCESS}`);
  }
};

export default function* fetchResource(resource, {
  actionData,
  actions,
  params,
}) {
  assertActionsPresent(actions);
  yield put({ type: actions[ACTION_START], ...actionData });
  try {
    const res = yield call(resource, params);
    const data = yield shouldParseBody(res) ? res.json() : null;

    if (res.status >= 200 && res.status < 300) {
      yield put({ type: actions[ACTION_SUCCESS], data, ...actionData });
    } else {
      const resultAction = {
        type: actions[ACTION_FAIL],
        error: res.error || null,
        data,
        ...actionData,
      };
      if (res.status === 404) {
        resultAction.missing = true;
      }
      yield put(resultAction);
    }
  } catch (error) {
    yield put({ type: actions[ACTION_FAIL], error, ...actionData });
  }
}
