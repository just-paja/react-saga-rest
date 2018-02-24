import sinon from 'sinon';

import * as reducers from '..';

describe('combine method', () => {
  it('returns previous state when called without action', () => {
    const state = {
      loading: false,
    };
    const reducer = reducers.combine(state, {});
    expect(reducer()).toBe(state);
  });

  it('returns previous state when action has no type', () => {
    const state = {
      loading: false,
    };
    const reducer = reducers.combine(state, {});
    expect(reducer(state, {})).toBe(state);
  });

  it('returns previous state when action type is not recognized', () => {
    const state = {
      loading: false,
    };
    const reducer = reducers.combine(state, {});
    expect(reducer(state, {
      type: 'REDUX_FOO',
    })).toBe(state);
  });

  it('returns new state when it recognizes known action', () => {
    const state = {
      loading: false,
    };
    const reducerStub = sinon.stub();
    const reducer = reducers.combine(state, {
      REDUX_FOO: reducerStub,
    });
    reducerStub.returns({
      loading: true,
    });
    const result = reducer(state, {
      type: 'REDUX_FOO',
    });
    expect(result).not.toBe(state);
    expect(reducerStub.calledWith(state));
    expect(result).toEqual({
      loading: true,
    });
  });
});
