import { getFlagValue } from '..';

describe('getFlagValue selector', () => {
  it('getFlagValue returns state flag', () => {
    expect(getFlagValue({
      foo: true,
    }, 'foo')).toBe(true);
  });

  it('getFlagValue returns false when flag is not present', () => {
    expect(getFlagValue({}, 'foo')).toBe(false);
  });
});
