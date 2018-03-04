import { connect } from 'react-redux';

const getComponentName = (component, defaultName) => (
  component.displayName ||
  component.name ||
  defaultName
);


export default ProgressSwitch => (WrappedComponent, {
  NotFoundComponent,
  ErrorComponent,
  LoaderComponent,
  progressSelector,
  onResourceChange,
  onExit,
  matchParam,
}) => {
  if (!WrappedComponent) {
    throw new Error('You must pass a Component.');
  }
  if (!onResourceChange) {
    throw new Error('You must pass onResourceChange.');
  }
  if (!progressSelector) {
    throw new Error('You must pass progressSelector.');
  }

  class ProgressSwitchNamed extends ProgressSwitch {
  }

  const wrappedName = getComponentName(WrappedComponent, 'Component');
  const outerName = getComponentName(ProgressSwitch, 'ProgressSwitch');
  ProgressSwitchNamed.displayName = `${outerName}(${wrappedName})`;

  const mapStateToProps = state => ({
    progress: progressSelector(state),
    WrappedComponent,
    NotFoundComponent,
    ErrorComponent,
    LoaderComponent,
    matchParam,
  });

  return connect(mapStateToProps, {
    onResourceChange,
    onExit,
  })(ProgressSwitchNamed);
};
