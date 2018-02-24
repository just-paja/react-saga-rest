import * as reducers from '..';

describe('pageSet reducer', () => {
  it(' returns invalidates state with new page', () => {
    const state = {
      valid: true,
      userId: 15,
      page: 10,
    };
    const result = reducers.pageSet(state, {
      page: 1,
    });
    expect(result).not.toBe(state);
    expect(result).toMatchObject({
      valid: false,
      page: 1,
    });
  });
});
