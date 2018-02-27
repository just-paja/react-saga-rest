import configureStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import { mapSceneProgress } from '..';

const NotFoundComponent = () => <span className="not-found" />;
const ErrorComponent = () => <span className="error" />;
const LoaderComponent = () => <span className="loader" />;
const WrappedComponent = () => <span className="foo" />;
const mockStore = configureStore();

describe('mapSceneProgress mapper', () => {
  it('throws error when no component is passed to wrap', () => {
    expect(() => {
      mapSceneProgress(undefined, {
        NotFoundComponent,
        ErrorComponent,
        LoaderComponent,
        progressSelector: () => {},
        onResourceChange: () => {},
      })();
    }).toThrow();
  });

  it('throws error when no progress selector is passed', () => {
    expect(() => {
      mapSceneProgress(WrappedComponent, {
        NotFoundComponent,
        ErrorComponent,
        LoaderComponent,
        onResourceChange: () => {},
      });
    }).toThrow();
  });

  it('throws error when no onResourceChange is passed', () => {
    expect(() => {
      mapSceneProgress(WrappedComponent, {
        NotFoundComponent,
        ErrorComponent,
        LoaderComponent,
        progressSelector: () => {},
      });
    }).toThrow();
  });

  it('uses wrapped component display name in composed display name', () => {
    const WrappedItem = () => <span />;
    WrappedItem.displayName = 'foo';
    const compClass = mapSceneProgress(WrappedItem, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      progressSelector: () => {},
      onResourceChange: () => {},
    });
    expect(compClass.displayName).toBe('Connect(SceneProgress(foo))');
  });

  it('uses wrapped component name in composed display name', () => {
    const WrappedItem = () => <span />;
    const compClass = mapSceneProgress(WrappedItem, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      progressSelector: () => {},
      onResourceChange: () => {},
    });
    expect(compClass.displayName).toBe('Connect(SceneProgress(WrappedItem))');
  });

  it('uses Component when name is unavailable in composed display name', () => {
    const compClass = mapSceneProgress(() => <span />, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      progressSelector: () => {},
      onResourceChange: () => {},
    });
    expect(compClass.displayName).toBe('Connect(SceneProgress(Component))');
  });

  it('passes not found component to progress info as prop', () => {
    const CompClass = mapSceneProgress(WrappedComponent, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      onResourceChange: () => {},
      progressSelector: state => state,
    });
    const comp = shallow(<CompClass />, {
      context: {
        store: mockStore(),
      },
    });
    expect(comp.find('SceneProgress(WrappedComponent)')).toHaveProp(
      'NotFoundComponent',
      NotFoundComponent
    );
  });

  it('passes error component to progress info as prop', () => {
    const CompClass = mapSceneProgress(WrappedComponent, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      onResourceChange: () => {},
      progressSelector: state => state,
    });
    const comp = shallow(<CompClass />, {
      context: {
        store: mockStore(),
      },
    });
    expect(comp.find('SceneProgress(WrappedComponent)')).toHaveProp(
      'ErrorComponent',
      ErrorComponent
    );
  });

  it('passes loader component to progress info as prop', () => {
    const CompClass = mapSceneProgress(WrappedComponent, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      onResourceChange: () => {},
      progressSelector: state => state,
    });
    const comp = shallow(<CompClass />, {
      context: {
        store: mockStore(),
      },
    });
    expect(comp.find('SceneProgress(WrappedComponent)')).toHaveProp(
      'LoaderComponent',
      LoaderComponent
    );
  });

  it('passes wrapped component to progress info as prop', () => {
    const CompClass = mapSceneProgress(WrappedComponent, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      onResourceChange: () => {},
      progressSelector: state => state,
    });
    const comp = shallow(<CompClass />, {
      context: {
        store: mockStore(),
      },
    });
    expect(comp.find('SceneProgress(WrappedComponent)')).toHaveProp(
      'WrappedComponent',
      WrappedComponent
    );
  });

  it('passes selected progress as prop', () => {
    const CompClass = mapSceneProgress(WrappedComponent, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      onResourceChange: () => {},
      progressSelector: state => state.foo.status,
    });
    const comp = shallow(<CompClass />, {
      context: {
        store: mockStore({
          foo: {
            status: {
              valid: true,
            },
          },
        }),
      },
    });
    expect(comp.find('SceneProgress(WrappedComponent)')).toHaveProp('progress', {
      valid: true,
    });
  });

  it('passes connected onResourceChange as prop', () => {
    const CompClass = mapSceneProgress(WrappedComponent, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      onResourceChange: () => ({ type: 'RESOURCE_CHANGED' }),
      progressSelector: state => state.foo.status,
    });
    const store = mockStore({
      foo: {
        status: {
          valid: true,
        },
      },
    });
    const comp = shallow(<CompClass />, {
      context: { store },
    });
    comp.find('SceneProgress(WrappedComponent)').simulate('resourceChange');
    expect(store.getActions()).toMatchObject([
      { type: 'RESOURCE_CHANGED' },
    ]);
  });
});
