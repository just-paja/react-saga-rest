import * as reducers from '..';

describe('invalidate reducer', () => {
  it('removes valid flag', () => {
    const state = {
      valid: true,
    };
    const result = reducers.invalidate(state);
    expect(state).not.toBe(result);
    expect(result).toEqual({
      loading: false,
      valid: false,
    });
  });
});
