import { getData } from '..';

describe('Common selectors', () => {
  it('getData returns state data attribute', () => {
    expect(getData(state => state)({
      data: 'foo',
    })).toEqual('foo');
  });
});
