import * as reducers from '..'

describe('fetchStart reducer', () => {
  it('sets loading flag', () => {
    const state = {
      loading: false
    }
    const result = reducers.fetchStart(state)
    expect(state).not.toBe(result)
    expect(result).toEqual({
      failed: false,
      loading: true
    })
  })
})
