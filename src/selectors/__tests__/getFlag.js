import { getFlag } from '..';

describe('getFlag selector', () => {
  it('getFlag returns true when state is truthy', () => {
    expect(getFlag(state => state, 'foo')({
      foo: 'bar',
    })).toBe(true);
  });

  it('getFlag returns false when state is falsy', () => {
    expect(getFlag(state => state.xxx, 'foo')({})).toBe(false);
  });

  it('getFlag returns flag for multiple states when passed object', () => {
    expect(getFlag({
      xxx: state => state.xxx,
      yyy: state => state.yyy,
    }, 'foo')({
      xxx: { foo: 'foo' },
      yyy: { foo: 'bar' },
    })).toEqual({
      xxx: true,
      yyy: true,
    });
  });

  it('getFlag returns prop for multiple states when passed object and replaces missing props with null', () => {
    expect(getFlag({
      xxx: state => state.xxx,
      yyy: state => state.yyy,
    }, 'foo')({
      xxx: { foo: 'foo' },
      yyy: {},
    })).toEqual({
      xxx: true,
      yyy: false,
    });
  });

  it('getFlag returns prop for multiple states when passed object and replaces missing states with null', () => {
    expect(getFlag({
      xxx: state => state.xxx,
      yyy: state => state.yyy,
    }, 'foo')({
      xxx: { foo: 'foo' },
    })).toEqual({
      xxx: true,
      yyy: false,
    });
  });
});
