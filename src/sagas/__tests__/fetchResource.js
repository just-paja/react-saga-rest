import sinon from 'sinon';

import { call, put } from 'redux-saga/effects';

import fetchResource from '../fetchResource';

describe('Common saga helpers', () => {
  it('fetchResource throws error when actions are not passed', () => {
    expect(() => {
      fetchResource(() => {}, {}).next();
    }).toThrow();
  });

  it('fetchResource throws error when fail action is not passed', () => {
    expect(() => {
      fetchResource(() => {}, {
        actions: {
          start: 'ACTION_START',
          success: 'ACTION_SUCCESS',
        },
      }).next();
    }).toThrow();
  });

  it('fetchResource throws error when start action is not passed', () => {
    expect(() => {
      fetchResource(() => {}, {
        actions: {
          fail: 'ACTION_FAIL',
          success: 'ACTION_SUCCESS',
        },
      }).next();
    }).toThrow();
  });

  it('fetchResource throws error when success action is not passed', () => {
    expect(() => {
      fetchResource(() => {}, {
        actions: {
          fail: 'ACTION_FAIL',
          start: 'ACTION_START',
        },
      }).next();
    }).toThrow();
  });

  it('fetchResource dispatches start and onSuccess actions', () => {
    const fetch = () => {};
    const testFetch = fetchResource(fetch, {
      actions: {
        fail: 'fail',
        start: 'start',
        success: 'success',
      },
      code: 'code',
      actionData: { id: 500 },
      params: { foo: 'bar' },
    });

    expect(testFetch.next().value).toEqual(put({
      id: 500,
      type: 'start',
    }));
    expect(testFetch.next().value).toEqual(call(fetch, { foo: 'bar' }));
    const response = {
      status: 200,
      json: () => ({ text: 'foo' }),
    };
    expect(testFetch.next(response).value).toEqual({ text: 'foo' });
    expect(testFetch.next({ text: 'foo' }).value).toEqual(put({
      type: 'success',
      id: 500,
      data: {
        text: 'foo',
      },
    }));
  });

  it('fetchResource dispatches success action without reading response body on 204 response', () => {
    const fetch = () => {};
    const json = sinon.spy();
    const testFetch = fetchResource(fetch, {
      actions: {
        start: 'start',
        success: 'success',
        fail: 'fail',
      },
      params: {
        foo: 'bar',
      },
    });

    expect(testFetch.next().value).toEqual(put({ type: 'start' }));
    expect(testFetch.next().value).toEqual(call(fetch, {
      foo: 'bar',
    }));

    expect(testFetch.next({
      status: 204,
      json,
    }).value).toEqual(null);
    expect(json.called).toBeFalsy();
    expect(testFetch.next(null).value).toEqual(put({
      type: 'success',
      data: null,
    }));
  });

  it('fetchResource dispatches fail action without reading response body on 404 response', () => {
    const fetch = () => {};
    const json = sinon.spy();
    const testFetch = fetchResource(fetch, {
      actions: {
        start: 'start',
        success: 'success',
        fail: 'fail',
      },
      params: {
        foo: 'bar',
      },
    });

    expect(testFetch.next().value).toEqual(put({ type: 'start' }));
    expect(testFetch.next().value).toEqual(call(fetch, {
      foo: 'bar',
    }));

    expect(testFetch.next({
      status: 404,
      json,
    }).value).toEqual(null);
    expect(json.called).toBeFalsy();
    expect(testFetch.next(null).value).toEqual(put({
      type: 'fail',
      error: null,
      missing: true,
      data: null,
    }));
  });

  it('fetchResource dispatches fail action without reading response body on < 200 response', () => {
    const fetch = () => {};
    const json = sinon.spy();
    const testFetch = fetchResource(fetch, {
      actions: {
        start: 'start',
        success: 'success',
        fail: 'fail',
      },
      params: {
        foo: 'bar',
      },
    });

    expect(testFetch.next().value).toEqual(put({ type: 'start' }));
    expect(testFetch.next().value).toEqual(call(fetch, {
      foo: 'bar',
    }));

    expect(testFetch.next({
      status: 199,
      json,
    }).value).toEqual(null);
    expect(json.called).toBeFalsy();
    expect(testFetch.next(null).value).toEqual(put({
      type: 'fail',
      error: null,
      data: null,
    }));
  });

  it('fetchResource dispatches fail action on json parse error', () => {
    const fetch = () => {};
    const testFetch = fetchResource(fetch, {
      actions: {
        start: 'start',
        success: 'success',
        fail: 'fail',
      },
      params: {
        foo: 'bar',
      },
    });

    expect(testFetch.next({ access_token: 'a23' }).value)
      .toEqual(put({ type: 'start' }));
    expect(testFetch.next().value)
      .toEqual(call(fetch, { foo: 'bar' }));

    const testError = new Error('test');
    const response = {
      status: 200,
      json: () => {
        throw testError;
      },
    };

    expect(testFetch.next(response).value).toEqual(put({
      type: 'fail',
      error: testError,
    }));
  });
});
