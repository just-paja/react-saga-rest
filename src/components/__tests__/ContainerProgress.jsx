import sinon from 'sinon'
import React from 'react'

import { shallow } from 'enzyme'
import { ContainerProgress } from '..'

const NotFoundComponent = () => <span className='not-found' />
const ErrorComponent = () => <span className='error' />
const LoaderComponent = () => <span className='loader' />
const WrappedComponent = () => <span className='foo' />

describe('ContainerProgress component', () => {
  it('renders loader when loading', () => {
    const comp = shallow(
      <ContainerProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        onResourceChange={() => {}}
        progress={{ loading: true }}
      />
    )
    expect(comp.find('LoaderComponent')).toHaveLength(1)
  })

  it('renders loader when not loading and not valid', () => {
    const comp = shallow(
      <ContainerProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        onResourceChange={() => {}}
        progress={{ valid: false }}
      />
    )
    expect(comp.find('LoaderComponent')).toHaveLength(1)
  })

  it('renders not found when missing', () => {
    const comp = shallow(
      <ContainerProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        onResourceChange={() => {}}
        progress={{ loading: false, missing: true }}
      />
    )
    expect(comp.find('NotFoundComponent')).toHaveLength(1)
  })

  it('renders error when failed', () => {
    const comp = shallow(
      <ContainerProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        onResourceChange={() => {}}
        progress={{ failed: true }}
      />
    )
    expect(comp.find('ErrorComponent')).toHaveLength(1)
  })

  it('renders wrapped component with passed props when not loading, not failed, valid and found', () => {
    const comp = shallow(
      <ContainerProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        bar='foo'
        foo='bar'
        onResourceChange={() => {}}
        progress={{ valid: true }}
      />
    )
    expect(comp.find('WrappedComponent').props()).toMatchObject({
      bar: 'foo',
      foo: 'bar'
    })
  })

  it('triggers onResourceChange with null resourceId on mount when not passed', () => {
    const resourceChangeSpy = sinon.spy()
    shallow(
      <ContainerProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        bar='foo'
        foo='bar'
        onResourceChange={resourceChangeSpy}
        progress={{ }}
      />
    )
    expect(resourceChangeSpy.calledOnce).toBeTruthy()
    expect(resourceChangeSpy.args).toEqual([[null]])
  })

  it('triggers onResourceChange on mount with matched param id', () => {
    const resourceChangeSpy = sinon.spy()
    shallow(
      <ContainerProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        bar='foo'
        foo='bar'
        resourceId='329'
        onResourceChange={resourceChangeSpy}
        progress={{ }}
      />
    )
    expect(resourceChangeSpy.calledOnce).toBeTruthy()
    expect(resourceChangeSpy.args).toEqual([['329']])
  })

  it('triggers onResourceChange on update when match params id changes', () => {
    const resourceChangeSpy = sinon.spy()
    const comp = shallow(
      <ContainerProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        bar='foo'
        foo='bar'
        resourceId='329'
        matchParam='someResourceId'
        onResourceChange={resourceChangeSpy}
        progress={{ }}
      />
    )
    resourceChangeSpy.resetHistory()
    comp.setProps({
      resourceId: '934'
    })
    expect(resourceChangeSpy.called).toBeTruthy()
    expect(resourceChangeSpy.args).toEqual([['934']])
    expect(resourceChangeSpy.calledOnce).toBeTruthy()
  })

  it('triggers onResourceChange with null on update when match params id changes and new id is falsy', () => {
    const resourceChangeSpy = sinon.spy()
    const comp = shallow(
      <ContainerProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        bar='foo'
        foo='bar'
        resourceId='329'
        matchParam='someResourceId'
        onResourceChange={resourceChangeSpy}
        progress={{ }}
      />
    )
    resourceChangeSpy.resetHistory()
    comp.setProps({
      resourceId: undefined
    })
    expect(resourceChangeSpy.called).toBeTruthy()
    expect(resourceChangeSpy.args).toEqual([[null]])
    expect(resourceChangeSpy.calledOnce).toBeTruthy()
  })

  it('does not trigger onResourceChange on update when match params do not change', () => {
    const resourceChangeSpy = sinon.spy()
    const comp = shallow(
      <ContainerProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        bar='foo'
        foo='bar'
        resourceId='329'
        matchParam='someResourceId'
        onResourceChange={resourceChangeSpy}
        progress={{ }}
      />
    )
    resourceChangeSpy.resetHistory()
    comp.setProps({
      resourceId: '329'
    })
    expect(resourceChangeSpy.called).toBeFalsy()
  })

  it('triggers onResourceChange with current resourceID on update when component turns invalid', () => {
    const resourceChangeSpy = sinon.spy()
    const comp = shallow(
      <ContainerProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        bar='foo'
        foo='bar'
        resourceId='329'
        matchParam='someResourceId'
        onResourceChange={resourceChangeSpy}
        progress={{ valid: true }}
      />
    )
    resourceChangeSpy.resetHistory()
    comp.setProps({
      progress: {
        valid: false
      }
    })
    expect(resourceChangeSpy.called).toBeTruthy()
    expect(resourceChangeSpy.args).toEqual([['329']])
    expect(resourceChangeSpy.calledOnce).toBeTruthy()
  })

  it('triggers onExit on unmount with passed resourceId', () => {
    const exitSpy = sinon.spy()
    const comp = shallow(
      <ContainerProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        resourceId='329'
        onResourceChange={() => {}}
        onExit={exitSpy}
        progress={{ }}
      />
    )
    comp.unmount()
    expect(exitSpy.calledOnce).toBeTruthy()
    expect(exitSpy.args).toEqual([['329']])
  })

  it('triggers onExit on unmount with null when resourceId is falsy', () => {
    const exitSpy = sinon.spy()
    const comp = shallow(
      <ContainerProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        onExit={exitSpy}
        onResourceChange={() => {}}
        progress={{ }}
        resourceId={undefined}
      />
    )
    comp.unmount()
    expect(exitSpy.calledOnce).toBeTruthy()
    expect(exitSpy.args).toEqual([[null]])
  })

  it('does not fail on unmount when onExit is not given and user exits', () => {
    const history = {
      location: {
        pathname: '/foo/bar'
      }
    }
    const comp = shallow(
      <ContainerProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        history={history}
        location={{ pathname: '/foo/bar' }}
        match={{
          params: {
            someResourceId: 329
          }
        }}
        matchParam='someResourceId'
        onResourceChange={() => {}}
        progress={{ }}
      />
    )
    comp.setProps({
      history: {
        location: {
          pathname: '/foo'
        }
      }
    })
    expect(() => {
      comp.unmount()
    }).not.toThrow()
  })
})
