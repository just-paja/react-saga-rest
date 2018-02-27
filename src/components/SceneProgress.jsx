import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  FLAG_FAILED,
  FLAG_LOADING,
  FLAG_MISSING,
  FLAG_VALID,
  STATE_ERROR_LIST,
} from '../constants';

import {
  ResourceProgress,
  RouteMatch,
  HistoryProp,
  LocationProp,
} from '../proptypes';

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

export default class SceneProgress extends Component {
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

  render() {
    const {
      ErrorComponent,
      LoaderComponent,
      NotFoundComponent,
      WrappedComponent,
      progress,
      ...otherProps
    } = this.props;
    let result;

    if (progress[FLAG_LOADING]) {
      result = <LoaderComponent />;
    } else if (progress[FLAG_MISSING]) {
      result = <NotFoundComponent />;
    } else if (progress[FLAG_FAILED]) {
      result = <ErrorComponent errors={progress[STATE_ERROR_LIST] || []} />;
    } else if (!progress[FLAG_VALID]) {
      result = <LoaderComponent />;
    } else {
      result = <WrappedComponent {...otherProps} />;
    }
    return result;
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
