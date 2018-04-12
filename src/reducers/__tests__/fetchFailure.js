import * as reducers from '..';

describe('fetchFailure reducer', () => {
  it('saves error', () => {
    const state = {
      loading: true,
      valid: false,
    };
    const result = reducers.fetchFailure(state, {
      payload: 'foo',
    });
    expect(state).not.toBe(result);
    expect(result).toMatchObject({
      error: 'foo',
      failed: true,
      missing: false,
      valid: false,
    });
  });

  it('saves error when error is not passed', () => {
    const state = {
      loading: true,
      valid: false,
    };
    const result = reducers.fetchFailure(state, {});
    expect(state).not.toBe(result);
    expect(result).toMatchObject({
      error: null,
      failed: true,
      missing: false,
      valid: false,
    });
  });
});
