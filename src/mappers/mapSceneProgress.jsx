import { connect } from 'react-redux';

import SceneProgress from '../components/SceneProgress';

export default (WrappedComponent, {
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
  })(SceneProgress);
};
