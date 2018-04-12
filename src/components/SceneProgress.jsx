import PropTypes from 'prop-types';

import {
  ResourceProgress,
  RouteMatch,
  HistoryProp,
  LocationProp,
} from '../proptypes';

import ContainerProgress from './ContainerProgress';

const getMatchId = (source, matchParam) => {
  const { match } = source;

  if (!matchParam) {
    return undefined;
  }

  if (match && match.params && match.params[matchParam]) {
    return String(match.params[matchParam]);
  }

  return null;
};

export default class SceneProgress extends ContainerProgress {
  componentDidUpdate(prevProps) {
    const prevId = getMatchId(prevProps, this.props.matchParam);
    const currentId = getMatchId(this.props, this.props.matchParam);
    if (
      currentId !== prevId ||
      (!this.props.progress.valid && prevProps.progress.valid)
    ) {
      this.handleResourceChange();
    }
  }

  componentWillUnmount() {
    const { history, location } = this.props;
    if (history && history.location.pathname !== location.pathname && this.props.onExit) {
      this.handleResourceMethodCall(this.props.onExit);
    }
  }

  getResourceId() {
    return getMatchId(this.props, this.props.matchParam);
  }
}

SceneProgress.propTypes = {
  ErrorComponent: PropTypes.func.isRequired,
  LoaderComponent: PropTypes.func.isRequired,
  NotFoundComponent: PropTypes.func.isRequired,
  WrappedComponent: PropTypes.func.isRequired,
  history: HistoryProp,
  location: LocationProp,
  match: RouteMatch,
  matchParam: PropTypes.string,
  onExit: PropTypes.func,
  onResourceChange: PropTypes.func.isRequired,
  progress: ResourceProgress.isRequired,
};

SceneProgress.defaultProps = {
  history: null,
  location: null,
  match: null,
  matchParam: null,
  onExit: null,
};
