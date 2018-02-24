import getProp from '../getProp';

describe('getProp selector', () => {
  it('getProp returns state prop', () => {
    expect(getProp(state => state, 'foo')({
      foo: 'bar',
    })).toBe('bar');
  });

  it('getProp returns null when state is falsy', () => {
    expect(getProp(state => state.xxx, 'foo')({})).toBe(null);
  });
});
