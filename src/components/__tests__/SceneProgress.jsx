import sinon from 'sinon';
import React from 'react';

import { shallow } from 'enzyme';

import { SceneProgress } from '..';

const NotFoundComponent = () => <span className="not-found" />;
const ErrorComponent = () => <span className="error" />;
const LoaderComponent = () => <span className="loader" />;
const WrappedComponent = () => <span className="foo" />;

describe('SceneProgress component', () => {
  it('renders loader when loading', () => {
    const comp = shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        match={{ params: {} }}
        onResourceChange={() => {}}
        progress={{ loading: true }}
      />
    );
    expect(comp.find('LoaderComponent')).toHaveLength(1);
  });

  it('renders loader when not loading and not valid', () => {
    const comp = shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        match={{ params: { } }}
        onResourceChange={() => {}}
        progress={{ valid: false }}
      />
    );
    expect(comp.find('LoaderComponent')).toHaveLength(1);
  });

  it('renders not found when missing', () => {
    const comp = shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        match={{ params: {} }}
        onResourceChange={() => {}}
        progress={{ loading: false, missing: true }}
      />
    );
    expect(comp.find('NotFoundComponent')).toHaveLength(1);
  });

  it('renders error when failed', () => {
    const comp = shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        match={{ params: {} }}
        onResourceChange={() => {}}
        progress={{ failed: true }}
      />
    );
    expect(comp.find('ErrorComponent')).toHaveLength(1);
  });

  it('renders wrapped component with passed props when not loading, not failed, valid and found', () => {
    const comp = shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        bar="foo"
        foo="bar"
        match={{ params: {} }}
        onResourceChange={() => {}}
        progress={{ valid: true }}
      />
    );
    expect(comp.find('WrappedComponent').props()).toMatchObject({
      bar: 'foo',
      foo: 'bar',
    });
  });

  it('triggers onResourceChange on mount', () => {
    const resourceChangeSpy = sinon.spy();
    shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        bar="foo"
        foo="bar"
        match={{ params: {} }}
        onResourceChange={resourceChangeSpy}
        progress={{ }}
      />
    );
    expect(resourceChangeSpy.calledOnce).toBeTruthy();
    expect(resourceChangeSpy.args).toEqual([[]]);
  });

  it('triggers onResourceChange on mount with null resource ID when match is not provided', () => {
    const resourceChangeSpy = sinon.spy();
    shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        bar="foo"
        foo="bar"
        match={{ params: {} }}
        matchParam="id"
        onResourceChange={resourceChangeSpy}
        progress={{ }}
      />
    );
    expect(resourceChangeSpy.calledOnce).toBeTruthy();
    expect(resourceChangeSpy.args).toEqual([[null]]);
  });

  it('triggers onResourceChange on mount with matched param id', () => {
    const resourceChangeSpy = sinon.spy();
    shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        bar="foo"
        foo="bar"
        match={{
          params: {
            someResourceId: 329,
          },
        }}
        matchParam="someResourceId"
        onResourceChange={resourceChangeSpy}
        progress={{ }}
      />
    );
    expect(resourceChangeSpy.calledOnce).toBeTruthy();
    expect(resourceChangeSpy.args).toEqual([['329']]);
  });

  it('triggers onResourceChange on update when match params id changes', () => {
    const resourceChangeSpy = sinon.spy();
    const comp = shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        bar="foo"
        foo="bar"
        match={{
          params: {
            someResourceId: 329,
          },
        }}
        matchParam="someResourceId"
        onResourceChange={resourceChangeSpy}
        progress={{ }}
      />
    );
    resourceChangeSpy.resetHistory();
    comp.setProps({
      match: {
        params: {
          someResourceId: 934,
        },
      },
    });
    expect(resourceChangeSpy.called).toBeTruthy();
    expect(resourceChangeSpy.args).toEqual([['934']]);
    expect(resourceChangeSpy.calledOnce).toBeTruthy();
  });

  it('does not trigger onResourceChange on update when match params do not change', () => {
    const resourceChangeSpy = sinon.spy();
    const comp = shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        bar="foo"
        foo="bar"
        match={{
          params: {
            someResourceId: 329,
          },
        }}
        matchParam="someResourceId"
        onResourceChange={resourceChangeSpy}
        progress={{ }}
      />
    );
    resourceChangeSpy.resetHistory();
    comp.setProps({
      resourceId: 934,
    });
    expect(resourceChangeSpy.calledOnce).toBeFalsy();
  });

  it('triggers onExit on unmount when history path does not match location path without match id', () => {
    const exitSpy = sinon.spy();
    const history = {
      location: {
        pathname: '/foo/bar',
      },
    };
    const comp = shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        history={history}
        location={{ pathname: '/foo/bar' }}
        match={{
          params: {
            someResourceId: 329,
          },
        }}
        onResourceChange={() => {}}
        onExit={exitSpy}
        progress={{ }}
      />
    );
    comp.setProps({
      history: {
        location: {
          pathname: '/foo',
        },
      },
    });
    comp.unmount();
    expect(exitSpy.calledOnce).toBeTruthy();
    expect(exitSpy.args).toEqual([[]]);
  });

  it('triggers onExit on unmount when history path does not match location path with match id', () => {
    const exitSpy = sinon.spy();
    const history = {
      location: {
        pathname: '/foo/bar',
      },
    };
    const comp = shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        history={history}
        location={{ pathname: '/foo/bar' }}
        match={{
          params: {
            someResourceId: 329,
          },
        }}
        matchParam="someResourceId"
        onResourceChange={() => {}}
        onExit={exitSpy}
        progress={{ }}
      />
    );
    comp.setProps({
      history: {
        location: {
          pathname: '/foo',
        },
      },
    });
    comp.unmount();
    expect(exitSpy.calledOnce).toBeTruthy();
    expect(exitSpy.args).toEqual([['329']]);
  });

  it('does not fail on unmount when onExit is not given and user exits', () => {
    const history = {
      location: {
        pathname: '/foo/bar',
      },
    };
    const comp = shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        history={history}
        location={{ pathname: '/foo/bar' }}
        match={{
          params: {
            someResourceId: 329,
          },
        }}
        matchParam="someResourceId"
        onResourceChange={() => {}}
        progress={{ }}
      />
    );
    comp.setProps({
      history: {
        location: {
          pathname: '/foo',
        },
      },
    });
    expect(() => {
      comp.unmount();
    }).not.toThrow();
  });

  it('does trigger onExit when history is not passed', () => {
    const exitSpy = sinon.spy();
    const comp = shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        location={{ pathname: '/foo/bar' }}
        match={{
          params: {
            someResourceId: 329,
          },
        }}
        matchParam="someResourceId"
        onExit={exitSpy}
        onResourceChange={() => {}}
        progress={{ }}
      />
    );
    comp.unmount();
    expect(exitSpy.called).toBeFalsy();
  });

  it('passes route params to the child component', () => {
    const history = {
      location: {
        pathname: '/foo/bar',
      },
    };
    const comp = shallow(
      <SceneProgress
        ErrorComponent={ErrorComponent}
        LoaderComponent={LoaderComponent}
        NotFoundComponent={NotFoundComponent}
        WrappedComponent={WrappedComponent}
        history={history}
        location={{ pathname: '/foo/bar' }}
        match={{
          params: {
            someResourceId: 329,
            someUnrelatedParam: 'x23',
          },
        }}
        matchParam="someResourceId"
        onResourceChange={() => {}}
        progress={{ valid: true }}
      />
    );
    expect(comp.find('WrappedComponent')).toHaveProp('match', {
      params: {
        someResourceId: 329,
        someUnrelatedParam: 'x23',
      },
    });
  });
});
