import * as reducers from '..';

describe('toggle reducer', () => {
  it('toggle turns attribute set to true when falsy', () => {
    const state = {
      valid: false,
    };
    const result = reducers.toggle('valid')(state);
    expect(state).not.toBe(result);
    expect(result).toEqual({
      valid: true,
    });
  });

  it('toggle turns attribute set to false when truthy', () => {
    const state = {
      valid: true,
    };
    const result = reducers.toggle('valid')(state);
    expect(state).not.toBe(result);
    expect(result).toEqual({
      valid: false,
    });
  });
});
