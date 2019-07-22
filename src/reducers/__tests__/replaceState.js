import * as reducers from '..'

describe('replaceState reducer', () => {
  it('returns predefined state in place of current state', () => {
    const initialState = {
      valid: false,
      userId: null,
      page: 0
    }
    const state = {
      valid: true,
      userId: 15,
      page: 10
    }
    const result = reducers.replaceState(initialState)(state)
    expect(result).toBe(initialState)
  })
})
