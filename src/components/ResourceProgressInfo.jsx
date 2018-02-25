import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ResourceListProgress, ResourceProgress, RouteMatch } from '../proptypes';

const getComponentName = component => component.displayName || component.name || 'Component';

const getMatchId = (source) => {
  const { match, matchParam } = source;

  if (!matchParam) {
    return undefined;
  }

  if (match && match.params && match.params[matchParam]) {
    return String(match.params[matchParam], 10);
  }

  return null;
};

export default (
  NotFound,
  ResourceError,
  ResourceLoader,
  WrappedComponent
) => {
  class ResourceProgressInfo extends Component {
    componentDidMount() {
      this.handleResourceChange();
    }

    componentDidUpdate(prevProps) {
      if (getMatchId(this.props) !== getMatchId(prevProps)) {
        this.handleResourceChange();
      }
    }

    handleResourceChange() {
      const resourceId = getMatchId(this.props);
      const args = [];
      if (resourceId !== undefined) {
        args.push(resourceId);
      }
      this.props.onResourceChange(...args);
    }

    render() {
      const { progress, ...otherProps } = this.props;
      if (progress.loading) {
        return <ResourceLoader />;
      }
      if (progress.missing) {
        return <NotFound />;
      }
      if (progress.failed) {
        return <ResourceError errors={progress.errors || [progress.error]} />;
      }
      return <WrappedComponent {...otherProps} />;
    }
  }

  ResourceProgressInfo.displayName = `Progress(${getComponentName(WrappedComponent)})`;

  ResourceProgressInfo.propTypes = {
    match: RouteMatch,
    matchParam: PropTypes.string,
    onResourceChange: PropTypes.func.isRequired,
    progress: PropTypes.oneOfType([
      ResourceProgress,
      ResourceListProgress,
    ]).isRequired,
  };

  ResourceProgressInfo.defaultProps = {
    match: null,
    matchParam: null,
  };

  return ResourceProgressInfo;
};
