import * as reducers from '..'

describe('turnOn reducer', () => {
  it('returns attribute set to true', () => {
    const state = {
      valid: false
    }
    const result = reducers.turnOn('valid')(state)
    expect(state).not.toBe(result)
    expect(result).toEqual({
      valid: true
    })
  })
})
