import * as reducers from '..';

describe('fetchStop reducer', () => {
  it('sets loading flag', () => {
    const state = {
      boo: 'foo',
      loading: true,
    };
    const result = reducers.fetchStop(state);
    expect(state).not.toBe(result);
    expect(result).toEqual({
      boo: 'foo',
      loading: false,
    });
  });
});
