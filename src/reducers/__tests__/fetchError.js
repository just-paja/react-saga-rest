import * as reducers from '..';

describe('fetchError reducer', () => {
  it('saves error and removes loading flag', () => {
    const state = {
      loading: true,
      valid: false,
    };
    const result = reducers.fetchError(state, {
      error: 'foo',
    });
    expect(state).not.toBe(result);
    expect(result).toEqual({
      error: 'foo',
      failed: true,
      loading: false,
      missing: false,
      valid: false,
    });
  });

  it('saves error and removes loading flag when error is not passed', () => {
    const state = {
      loading: true,
      valid: false,
    };
    const result = reducers.fetchError(state, {});
    expect(state).not.toBe(result);
    expect(result).toEqual({
      error: null,
      failed: true,
      loading: false,
      missing: false,
      valid: false,
    });
  });
});
