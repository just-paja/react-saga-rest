import getStateError from '../getStateError';

describe('getStateError selector', () => {
  it('getStateError returns state error', () => {
    const error = new Error('foo');
    expect(getStateError({
      error,
    })).toBe(error);
  });
});
