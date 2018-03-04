import configureStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import { mapContainerProgress } from '..';

const NotFoundComponent = () => <span className="not-found" />;
const ErrorComponent = () => <span className="error" />;
const LoaderComponent = () => <span className="loader" />;
const WrappedComponent = () => <span className="foo" />;
const mockStore = configureStore();

describe('mapContainerProgress mapper', () => {
  it('throws error when no component is passed to wrap', () => {
    expect(() => {
      mapContainerProgress(undefined, {
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
      mapContainerProgress(WrappedComponent, {
        NotFoundComponent,
        ErrorComponent,
        LoaderComponent,
        onResourceChange: () => {},
      });
    }).toThrow();
  });

  it('throws error when no onResourceChange is passed', () => {
    expect(() => {
      mapContainerProgress(WrappedComponent, {
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
    const compClass = mapContainerProgress(WrappedItem, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      progressSelector: () => {},
      onResourceChange: () => {},
    });
    expect(compClass.displayName).toBe('Connect(ContainerProgress(foo))');
  });

  it('uses wrapped component name in composed display name', () => {
    const WrappedItem = () => <span />;
    const compClass = mapContainerProgress(WrappedItem, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      progressSelector: () => {},
      onResourceChange: () => {},
    });
    expect(compClass.displayName).toBe('Connect(ContainerProgress(WrappedItem))');
  });

  it('uses Component when name is unavailable in composed display name', () => {
    const compClass = mapContainerProgress(() => <span />, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      progressSelector: () => {},
      onResourceChange: () => {},
    });
    expect(compClass.displayName).toBe('Connect(ContainerProgress(Component))');
  });

  it('passes not found component to progress info as prop', () => {
    const CompClass = mapContainerProgress(WrappedComponent, {
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
    expect(comp.find('ContainerProgress(WrappedComponent)')).toHaveProp(
      'NotFoundComponent',
      NotFoundComponent
    );
  });

  it('passes error component to progress info as prop', () => {
    const CompClass = mapContainerProgress(WrappedComponent, {
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
    expect(comp.find('ContainerProgress(WrappedComponent)')).toHaveProp(
      'ErrorComponent',
      ErrorComponent
    );
  });

  it('passes loader component to progress info as prop', () => {
    const CompClass = mapContainerProgress(WrappedComponent, {
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
    expect(comp.find('ContainerProgress(WrappedComponent)')).toHaveProp(
      'LoaderComponent',
      LoaderComponent
    );
  });

  it('passes wrapped component to progress info as prop', () => {
    const CompClass = mapContainerProgress(WrappedComponent, {
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
    expect(comp.find('ContainerProgress(WrappedComponent)')).toHaveProp(
      'WrappedComponent',
      WrappedComponent
    );
  });

  it('passes selected progress as prop', () => {
    const CompClass = mapContainerProgress(WrappedComponent, {
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
    expect(comp.find('ContainerProgress(WrappedComponent)')).toHaveProp('progress', {
      valid: true,
    });
  });

  it('passes connected onResourceChange as prop', () => {
    const CompClass = mapContainerProgress(WrappedComponent, {
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
    comp.find('ContainerProgress(WrappedComponent)').simulate('resourceChange');
    expect(store.getActions()).toMatchObject([
      { type: 'RESOURCE_CHANGED' },
    ]);
  });
});
