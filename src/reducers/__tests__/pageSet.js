import * as reducers from '..'

describe('pageSet reducer', () => {
  it('returns invalidated state with new page', () => {
    const state = {
      valid: true,
      userId: 15,
      page: 10
    }
    const result = reducers.pageSet(state, {
      page: 1
    })
    expect(result).not.toBe(state)
    expect(result).toMatchObject({
      valid: false,
      page: 1
    })
  })

  it('returns invalidated state with new page passed as payload', () => {
    const state = {
      valid: true,
      userId: 15,
      page: 10
    }
    const result = reducers.pageSet(state, {
      payload: 1
    })
    expect(result).not.toBe(state)
    expect(result).toMatchObject({
      valid: false,
      page: 1
    })
  })

  it('returns same state when page did not change', () => {
    const state = {
      valid: true,
      userId: 15,
      page: 10
    }
    const result = reducers.pageSet(state, {
      page: 10
    })
    expect(result).toBe(state)
  })
})
