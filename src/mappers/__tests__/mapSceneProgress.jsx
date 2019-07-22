import configureStore from 'redux-mock-store'
import React from 'react'

import { mount } from 'enzyme'
import { mapSceneProgress } from '..'
import { Provider } from 'react-redux'

const NotFoundComponent = () => <span className='not-found' />
const ErrorComponent = () => <span className='error' />
const LoaderComponent = () => <span className='loader' />
const WrappedComponent = () => <span className='foo' />
const mockStore = configureStore()

function renderWithStore (children, state) {
  const store = mockStore(state)
  const comp = mount(<Provider store={store}>{children}</Provider>)
  comp.store = store
  return comp
}

describe('mapSceneProgress mapper', () => {
  it('throws error when no component is passed to wrap', () => {
    expect(() => {
      mapSceneProgress(undefined, {
        NotFoundComponent,
        ErrorComponent,
        LoaderComponent,
        progressSelector: () => {},
        onResourceChange: () => ({ type: 'TEST' })
      })()
    }).toThrow()
  })

  it('throws error when no progress selector is passed', () => {
    expect(() => {
      mapSceneProgress(WrappedComponent, {
        NotFoundComponent,
        ErrorComponent,
        LoaderComponent,
        onResourceChange: () => ({ type: 'TEST' })
      })
    }).toThrow()
  })

  it('throws error when no onResourceChange is passed', () => {
    expect(() => {
      mapSceneProgress(WrappedComponent, {
        NotFoundComponent,
        ErrorComponent,
        LoaderComponent,
        progressSelector: () => {}
      })
    }).toThrow()
  })

  it('uses wrapped component display name in composed display name', () => {
    const WrappedItem = () => <span />
    WrappedItem.displayName = 'foo'
    const compClass = mapSceneProgress(WrappedItem, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      progressSelector: () => {},
      onResourceChange: () => ({ type: 'TEST' })
    })
    expect(compClass.displayName).toBe('Connect(SceneProgress(foo))')
  })

  it('uses wrapped component name in composed display name', () => {
    const WrappedItem = () => <span />
    const compClass = mapSceneProgress(WrappedItem, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      progressSelector: () => {},
      onResourceChange: () => ({ type: 'TEST' })
    })
    expect(compClass.displayName).toBe('Connect(SceneProgress(WrappedItem))')
  })

  it('uses Component when name is unavailable in composed display name', () => {
    const compClass = mapSceneProgress(() => <span />, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      progressSelector: () => {},
      onResourceChange: () => ({ type: 'TEST' })
    })
    expect(compClass.displayName).toBe('Connect(SceneProgress(Component))')
  })

  it('passes not found component to progress info as prop', () => {
    const CompClass = mapSceneProgress(WrappedComponent, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      onResourceChange: () => ({ type: 'TEST' }),
      progressSelector: state => state
    })
    const comp = renderWithStore(<CompClass />)
    expect(comp.find('SceneProgress(WrappedComponent)')).toHaveProp(
      'NotFoundComponent',
      NotFoundComponent
    )
  })

  it('passes error component to progress info as prop', () => {
    const CompClass = mapSceneProgress(WrappedComponent, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      onResourceChange: () => ({ type: 'TEST' }),
      progressSelector: state => state
    })
    const comp = renderWithStore(<CompClass />)
    expect(comp.find('SceneProgress(WrappedComponent)')).toHaveProp(
      'ErrorComponent',
      ErrorComponent
    )
  })

  it('passes loader component to progress info as prop', () => {
    const CompClass = mapSceneProgress(WrappedComponent, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      onResourceChange: () => ({ type: 'TEST' }),
      progressSelector: state => state
    })
    const comp = renderWithStore(<CompClass />)
    expect(comp.find('SceneProgress(WrappedComponent)')).toHaveProp(
      'LoaderComponent',
      LoaderComponent
    )
  })

  it('passes wrapped component to progress info as prop', () => {
    const CompClass = mapSceneProgress(WrappedComponent, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      onResourceChange: () => ({ type: 'TEST' }),
      progressSelector: state => state
    })
    const comp = renderWithStore(<CompClass />)
    expect(comp.find('SceneProgress(WrappedComponent)')).toHaveProp(
      'WrappedComponent',
      WrappedComponent
    )
  })

  it('passes selected progress as prop', () => {
    const CompClass = mapSceneProgress(WrappedComponent, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      onResourceChange: () => ({ type: 'TEST' }),
      progressSelector: state => state.foo.status
    })
    const comp = renderWithStore(<CompClass />, {
      foo: {
        status: {
          valid: true
        }
      }
    })
    expect(comp.find('SceneProgress(WrappedComponent)')).toHaveProp('progress', {
      valid: true
    })
  })

  it('passes connected onResourceChange as prop', () => {
    const CompClass = mapSceneProgress(WrappedComponent, {
      NotFoundComponent,
      ErrorComponent,
      LoaderComponent,
      onResourceChange: () => ({ type: 'RESOURCE_CHANGED' }),
      progressSelector: state => state.foo.status
    })
    const state = {
      foo: {
        status: {
          valid: true
        }
      }
    }
    const comp = renderWithStore(<CompClass />, state)
    comp.find('SceneProgress(WrappedComponent)').props().onResourceChange()
    expect(comp.store.getActions()).toContainEqual({ type: 'RESOURCE_CHANGED' })
  })
})
