import { getProgress } from '..';

describe('getProgress selector', () => {
  it('getProgress returns true loading flag when state loading flag is truthy', () => {
    expect(getProgress(state => state)({
      loading: true,
    })).toMatchObject({
      loading: true,
    });
  });

  it('getProgress returns false loading flag when state loading flag is falsy', () => {
    expect(getProgress(state => state)({
      loading: false,
    })).toMatchObject({
      loading: false,
    });
  });

  it('getProgress returns false loading flag when state loading flag is missing', () => {
    expect(getProgress(state => state)({})).toMatchObject({
      loading: false,
    });
  });

  it('getProgress returns true loading flag when at least one loading flag is truthy', () => {
    expect(getProgress(
      state => state.a,
      state => state.b,
      state => state.c
    )({
      a: { loading: false },
      b: { loading: true },
      c: { loading: false },
    })).toMatchObject({
      loading: true,
    });
  });

  it('getProgress returns false loading flag when all loading flags is truthy', () => {
    expect(getProgress(
      state => state.a,
      state => state.b,
      state => state.c
    )({
      a: { loading: false },
      b: { loading: false },
      c: { loading: false },
    })).toMatchObject({
      loading: false,
    });
  });

  it('getProgress returns true failed flag when state failed flag is truthy', () => {
    expect(getProgress(state => state)({
      failed: true,
    })).toMatchObject({
      failed: true,
    });
  });

  it('getProgress returns false failed flag when state failed flag is falsy', () => {
    expect(getProgress(state => state)({
      failed: false,
    })).toMatchObject({
      failed: false,
    });
  });

  it('getProgress returns false failed flag when state failed flag is missing', () => {
    expect(getProgress(state => state)({})).toMatchObject({
      failed: false,
    });
  });

  it('getProgress returns true failed flag when at least one failed flag is truthy', () => {
    expect(getProgress(
      state => state.a,
      state => state.b,
      state => state.c
    )({
      a: { failed: false },
      b: { failed: true },
      c: { failed: false },
    })).toMatchObject({
      failed: true,
    });
  });

  it('getProgress returns false failed flag when all failed flags is truthy', () => {
    expect(getProgress(
      state => state.a,
      state => state.b,
      state => state.c
    )({
      a: { failed: false },
      b: { failed: false },
      c: { failed: false },
    })).toMatchObject({
      failed: false,
    });
  });

  it('getProgress returns true valid flag when state valid flag is truthy', () => {
    expect(getProgress(state => state)({
      valid: true,
    })).toMatchObject({
      valid: true,
    });
  });

  it('getProgress returns false valid flag when state valid flag is falsy', () => {
    expect(getProgress(state => state)({
      valid: false,
    })).toMatchObject({
      valid: false,
    });
  });

  it('getProgress returns false valid flag when state valid flag is missing', () => {
    expect(getProgress(state => state)({})).toMatchObject({
      valid: false,
    });
  });

  it('getProgress returns true valid flag when all valid flags are truthy', () => {
    expect(getProgress(
      state => state.a,
      state => state.b,
      state => state.c
    )({
      a: { valid: true },
      b: { valid: true },
      c: { valid: true },
    })).toMatchObject({
      valid: true,
    });
  });

  it('getProgress returns false valid flag when at least one valid flag is falsy', () => {
    expect(getProgress(
      state => state.a,
      state => state.b,
      state => state.c
    )({
      a: { valid: true },
      b: { valid: false },
      c: { valid: true },
    })).toMatchObject({
      valid: false,
    });
  });

  it('getProgress returns true required flag when state is not valid and not loading', () => {
    expect(getProgress(state => state)({
      loading: false,
      valid: false,
    })).toMatchObject({
      required: true,
    });
  });

  it('getProgress returns false required flag when state is valid and not loading', () => {
    expect(getProgress(state => state)({
      loading: false,
      valid: true,
    })).toMatchObject({
      required: false,
    });
  });

  it('getProgress returns false required flag when state is not valid and loading', () => {
    expect(getProgress(state => state)({
      loading: true,
      valid: false,
    })).toMatchObject({
      required: false,
    });
  });

  it('getProgress returns false required flag when state is valid and loading', () => {
    expect(getProgress(state => state)({
      loading: true,
      valid: true,
    })).toMatchObject({
      required: false,
    });
  });

  it('getProgress returns error from state', () => {
    const error = new Error('foo!');
    expect(getProgress(state => state)({
      error,
    })).toMatchObject({
      error,
    });
  });

  it('getProgress returns null error when state is not defined', () => {
    expect(getProgress(state => state)()).toMatchObject({
      error: null,
    });
  });

  it('getProgress returns error list when given multiple states', () => {
    const error1 = new Error('foo!');
    const error2 = new Error('foo!');
    expect(getProgress(
      state => state.a,
      state => state.b,
      state => state.c,
      state => state.d
    )({
      a: {},
      b: { error: error1 },
      c: {},
      d: { error: error2 },
    })).toMatchObject({
      errors: [error1, error2],
    });
  });

  it('getProgress returns null error when state error is empty', () => {
    expect(getProgress(state => state)({})).toMatchObject({
      error: null,
    });
  });
});
