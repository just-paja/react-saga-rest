import { getProp } from '..';

describe('getProp selector', () => {
  it('getProp returns state prop', () => {
    expect(getProp(state => state, 'foo')({
      foo: 'bar',
    })).toBe('bar');
  });

  it('getProp returns null when state is falsy', () => {
    expect(getProp(state => state.xxx, 'foo')({})).toBe(null);
  });

  it('getProp returns prop for multiple states when passed object', () => {
    expect(getProp({
      xxx: state => state.xxx,
      yyy: state => state.yyy,
    }, 'foo')({
      xxx: { foo: 'foo' },
      yyy: { foo: 'bar' },
    })).toEqual({
      xxx: 'foo',
      yyy: 'bar',
    });
  });

  it('getProp returns prop for multiple states when passed object and replaces missing props with null', () => {
    expect(getProp({
      xxx: state => state.xxx,
      yyy: state => state.yyy,
    }, 'foo')({
      xxx: { foo: 'foo' },
      yyy: {},
    })).toEqual({
      xxx: 'foo',
      yyy: null,
    });
  });

  it('getProp returns prop for multiple states when passed object and replaces missing states with null', () => {
    expect(getProp({
      xxx: state => state.xxx,
      yyy: state => state.yyy,
    }, 'foo')({
      xxx: { foo: 'foo' },
    })).toEqual({
      xxx: 'foo',
      yyy: null,
    });
  });
});
