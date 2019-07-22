import * as reducers from '..'

describe('pageReset reducer', () => {
  it('returns invalidates state with first page', () => {
    const state = {
      valid: true,
      userId: 15,
      page: 10
    }
    const result = reducers.pageReset(state, {
      page: 1
    })
    expect(result).not.toBe(state)
    expect(result).toMatchObject({
      valid: false,
      page: 0
    })
  })

  it('returns same state when already on first page', () => {
    const state = {
      valid: true,
      userId: 15,
      page: 0
    }
    const result = reducers.pageReset(state, {
      page: 1
    })
    expect(result).toBe(state)
  })
})
