import * as reducers from '..'

describe('Common reducer action', () => {
  it('toggle turns attribute set to true when falsy', () => {
    const state = {
      isValid: false
    }
    const result = reducers.toggle('isValid')(state)
    expect(state).not.toBe(result)
    expect(result).toEqual({
      isValid: true
    })
  })

  it('toggle turns attribute set to false when truthy', () => {
    const state = {
      isValid: true
    }
    const result = reducers.toggle('isValid')(state)
    expect(state).not.toBe(result)
    expect(result).toEqual({
      isValid: false
    })
  })
})
