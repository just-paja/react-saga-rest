import * as reducers from '..';

describe('changeCollectionParam reducer', () => {
  it('returns attribute set to true', () => {
    const state = {
      filter: 'foo',
      page: 5,
    };
    const result = reducers.changeCollectionParam('filter')(state, {
      filter: 'bar',
    });
    expect(state).not.toBe(result);
    expect(result).toEqual({
      filter: 'bar',
      page: 0,
      valid: false,
    });
  });

  it('returns attribute set to true when passed as another attribute of action', () => {
    const state = {
      filter: 'foo',
      page: 5,
    };
    const result = reducers.changeCollectionParam('filter', 'payload')(state, {
      payload: 'bar',
    });
    expect(state).not.toBe(result);
    expect(result).toEqual({
      filter: 'bar',
      page: 0,
      valid: false,
    });
  });
});
