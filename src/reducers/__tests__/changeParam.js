import * as reducers from '..';

describe('changeParam reducer', () => {
  it('returns attribute set to true', () => {
    const state = {
      filter: 'foo',
      page: 5,
      valid: true,
    };
    const result = reducers.changeParam('filter')(state, {
      filter: 'bar',
    });
    expect(state).not.toBe(result);
    expect(result).toEqual({
      filter: 'bar',
      page: 5,
      valid: true,
    });
  });

  it('returns attribute set to true when passed as another attribute of action', () => {
    const state = {
      filter: 'foo',
      page: 5,
      valid: true,
    };
    const result = reducers.changeParam('filter', 'payload')(state, {
      payload: 'bar',
    });
    expect(state).not.toBe(result);
    expect(result).toEqual({
      filter: 'bar',
      page: 5,
      valid: true,
    });
  });
});
