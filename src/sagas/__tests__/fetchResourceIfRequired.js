import { call, select } from 'redux-saga/effects';

import fetchResource from '../fetchResource';
import fetchResourceIfRequired from '../fetchResourceIfRequired';

describe('Common saga helpers', () => {
  it('fetchResourceIfRequired does not fetch when isRequired selector returns false', () => {
    const fetch = () => {};
    const isRequired = () => false;
    const gen = fetchResourceIfRequired(fetch, {
      isRequired,
      actionTypes: {
        start: 'started',
        success: 'succeeded',
        fail: 'failed',
      },
      code: 'code',
      actionData: {
        type: 'REDUX_ACTION',
        code: 'code',
      },
    });

    expect(gen.next().value).toEqual(select(isRequired));
    expect(gen.next(false).done).toBeTruthy();
  });

  it('fetchResourceIfRequired calls fetchResource when isRequired selector returns true', () => {
    const isRequired = () => true;
    const fetch = () => {};
    const gen = fetchResourceIfRequired(fetch, {
      isRequired,
      actionData: { type: 'REDUX_ACTION' },
      actionTypes: {
        fail: 'failed',
        start: 'started',
        success: 'succeeded',
      },
      code: 'code',
    });

    expect(gen.next().value).toEqual(select(isRequired));
    expect(gen.next(true).value).toEqual(
      call(fetchResource, fetch, {
        actionTypes: {
          fail: 'failed',
          start: 'started',
          success: 'succeeded',
        },
        code: 'code',
        actionData: { type: 'REDUX_ACTION' },
      })
    );
    expect(gen.next().done).toBeTruthy();
  });
});
