import * as reducers from '..'

describe('fetchSuccess reducer', () => {
  it('saves data and removes fetching flag', () => {
    const state = {
      loading: true,
      valid: false
    }
    const result = reducers.fetchSuccess(state, {
      data: {
        userId: 987
      }
    })
    expect(state).not.toBe(result)
    expect(result).toEqual({
      loading: false,
      valid: true,
      failed: false,
      data: {
        userId: 987
      }
    })
  })

  it('saves payload and removes fetching flag', () => {
    const state = {
      loading: true,
      valid: false
    }
    const result = reducers.fetchSuccess(state, {
      payload: {
        userId: 987
      }
    })
    expect(state).not.toBe(result)
    expect(result).toEqual({
      loading: false,
      valid: true,
      failed: false,
      data: {
        userId: 987
      }
    })
  })
})
