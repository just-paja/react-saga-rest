import * as reducers from '..'

describe('invalidateOnCollectionChange reducer', () => {
  it('returns valid state when idents match', () => {
    const state = {
      valid: true,
      userId: 15
    }
    const result = reducers.invalidateOnCollectionChange('userId')(state, {
      userId: 15,
      page: 0
    })
    expect(result).toBe(state)
  })

  it('returns invalidated state when idents do not match', () => {
    const state = {
      valid: true,
      userId: 15
    }
    const result = reducers.invalidateOnCollectionChange('userId')(state, {
      userId: 19,
      page: 0
    })
    expect(result).not.toBe(state)
    expect(result.userId).toBe(19)
    expect(result.valid).toBe(false)
  })

  it('returns invalidated state when idents do not match using action alternative identifier', () => {
    const state = {
      valid: true,
      userId: 15
    }
    const result = reducers.invalidateOnCollectionChange('userId', 'accountId')(state, {
      accountId: 19,
      page: 0
    })
    expect(result).not.toBe(state)
    expect(result.userId).toBe(19)
    expect(result.valid).toBe(false)
  })
})
