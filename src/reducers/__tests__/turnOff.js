import * as reducers from '..';

describe('turnOff reducer', () => {
  it('returns attribute set to false', () => {
    const state = {
      valid: true,
    };
    const result = reducers.turnOff('valid')(state);
    expect(result).not.toBe(state);
    expect(result).toEqual({
      valid: false,
    });
  });
});
