import sinon from 'sinon';
import React from 'react';

import { shallow } from 'enzyme';

import ResourceProgressInfo from '../ResourceProgressInfo';

const NotFound = () => <span className="not-found" />;
const ResourceError = () => <span className="error" />;
const ResourceLoader = () => <span className="loader" />;
const WrappedComponent = () => <span className="foo" />;
const MockComponent = ResourceProgressInfo(
  NotFound,
  ResourceError,
  ResourceLoader,
  WrappedComponent
);

describe('ResourceProgressInfo component', () => {
  it('renders loader when loading', () => {
    const comp = shallow(
      <MockComponent
        match={{ params: {} }}
        onResourceChange={() => {}}
        progress={{ loading: true }}
      />
    );
    expect(comp.find('ResourceLoader')).toHaveLength(1);
  });

  it('renders loader when not loading and not valid', () => {
    const comp = shallow(
      <MockComponent
        match={{ params: { } }}
        onResourceChange={() => {}}
        progress={{ valid: false }}
      />
    );
    expect(comp.find('ResourceLoader')).toHaveLength(1);
  });

  it('renders not found when missing', () => {
    const comp = shallow(
      <MockComponent
        match={{ params: {} }}
        onResourceChange={() => {}}
        progress={{ loading: false, missing: true }}
      />
    );
    expect(comp.find('NotFound')).toHaveLength(1);
  });

  it('renders error when failed', () => {
    const comp = shallow(
      <MockComponent
        match={{ params: {} }}
        onResourceChange={() => {}}
        progress={{ failed: true }}
      />
    );
    expect(comp.find('ResourceError')).toHaveLength(1);
  });

  it('renders wrapped component with passed props when not loading, not failed, valid and found', () => {
    const comp = shallow(
      <MockComponent
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

  it('uses display name of the wrapped component', () => {
    expect(MockComponent.displayName).toBe('Progress(WrappedComponent)');
  });

  it('uses default display name when the wrapped compnent has no display name', () => {
    const MockComponentWithoutName = ResourceProgressInfo(
      NotFound,
      ResourceError,
      ResourceLoader,
      () => {}
    );
    expect(MockComponentWithoutName.displayName).toBe('Progress(Component)');
  });

  it('triggers onResourceChange on mount', () => {
    const resourceChangeSpy = sinon.spy();
    shallow(
      <MockComponent
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
      <MockComponent
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
      <MockComponent
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
      <MockComponent
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
    expect(resourceChangeSpy.calledOnce).toBeTruthy();
    expect(resourceChangeSpy.args).toEqual([['934']]);
  });

  it('does not trigger onResourceChange on update when match params do not change', () => {
    const resourceChangeSpy = sinon.spy();
    const comp = shallow(
      <MockComponent
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
});
