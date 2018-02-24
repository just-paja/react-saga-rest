import { isRequired } from '..';

describe('isRequired selector', () => {
  it('isRequired returns true when state is not loading and not valid', () => {
    expect(isRequired(state => state)({
      loading: false,
      valid: false,
    })).toBe(true);
  });

  it('isRequired returns false when state is loading and not valid', () => {
    expect(isRequired(state => state)({
      loading: true,
      valid: false,
    })).toBe(false);
  });

  it('isRequired returns false when state is not loading and valid', () => {
    expect(isRequired(state => state)({
      loading: false,
      valid: true,
    })).toBe(false);
  });

  it('isRequired returns false when state is loading and valid', () => {
    expect(isRequired(state => state)({
      loading: true,
      valid: true,
    })).toBe(false);
  });
});
