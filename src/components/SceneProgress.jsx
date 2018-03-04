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
  componentWillMount() {
    this.handleResourceChange();
  }

  componentDidUpdate(prevProps) {
    const prevId = getMatchId(prevProps, this.props.matchParam);
    const currentId = getMatchId(this.props, this.props.matchParam);
    if (currentId !== prevId) {
      this.handleResourceChange();
    }
  }

  componentWillUnmount() {
    const { history, location } = this.props;
    if (history && history.location.pathname !== location.pathname && this.props.onExit) {
      this.handleMethodCall(this.props.onExit);
    }
  }

  handleMethodCall(method) {
    const resourceId = getMatchId(this.props, this.props.matchParam);
    const args = [];
    if (resourceId !== undefined) {
      args.push(resourceId);
    }
    method(...args);
  }

  handleResourceChange() {
    this.handleMethodCall(this.props.onResourceChange);
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
