import * as lib from '..';

describe('Library entry point', () => {
  it('provides combine reducer', () => {
    expect(lib).toHaveProperty('combine');
  });

  it('provides fetchError reducer', () => {
    expect(lib).toHaveProperty('fetchError');
  });

  it('provides fetchStart reducer', () => {
    expect(lib).toHaveProperty('fetchStart');
  });

  it('provides fetchSuccess reducer', () => {
    expect(lib).toHaveProperty('fetchSuccess');
  });

  it('provides invalidate reducer', () => {
    expect(lib).toHaveProperty('invalidate');
  });

  it('provides invalidateOnCollectionChange reducer', () => {
    expect(lib).toHaveProperty('invalidateOnCollectionChange');
  });

  it('provides invalidateOnResourceChange reducer', () => {
    expect(lib).toHaveProperty('invalidateOnResourceChange');
  });

  it('provides pageReset reducer', () => {
    expect(lib).toHaveProperty('pageReset');
  });

  it('provides pageSet reducer', () => {
    expect(lib).toHaveProperty('pageSet');
  });

  it('provides toggle reducer', () => {
    expect(lib).toHaveProperty('toggle');
  });

  it('provides turnOff reducer', () => {
    expect(lib).toHaveProperty('turnOff');
  });

  it('provides turnOn reducer', () => {
    expect(lib).toHaveProperty('turnOn');
  });

  it('provides fetchResource saga', () => {
    expect(lib).toHaveProperty('fetchResource');
  });

  it('provides fetchResourceIfRequired saga', () => {
    expect(lib).toHaveProperty('fetchResourceIfRequired');
  });

  it('provides getData selector', () => {
    expect(lib).toHaveProperty('getData');
  });

  it('provides getFlagValue selector', () => {
    expect(lib).toHaveProperty('getFlagValue');
  });

  it('provides getProgress selector', () => {
    expect(lib).toHaveProperty('getProgress');
  });

  it('provides getProp selector', () => {
    expect(lib).toHaveProperty('getProp');
  });

  it('provides getStateError selector', () => {
    expect(lib).toHaveProperty('getStateError');
  });

  it('provides isRequired selector', () => {
    expect(lib).toHaveProperty('isRequired');
  });

  it('provides transformData selector', () => {
    expect(lib).toHaveProperty('transformData');
  });

  it('provides mapSceneProgress mapper', () => {
    expect(lib).toHaveProperty('mapSceneProgress');
  });

  it('provides SceneProgress component', () => {
    expect(lib).toHaveProperty('SceneProgress');
  });
});
