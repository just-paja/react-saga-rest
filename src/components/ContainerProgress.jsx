import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  FLAG_FAILED,
  FLAG_LOADING,
  FLAG_MISSING,
  FLAG_VALID,
  STATE_ERROR_LIST,
} from '../constants';

import {
  ResourceId,
  ResourceProgress,
} from '../proptypes';

import { isOnServer } from '../utils';

export default class ContainerProgress extends Component {
  componentWillMount() {
    if (isOnServer()) {
      this.handleResourceChange();
    }
  }

  componentDidMount() {
    if (!isOnServer()) {
      this.handleResourceChange();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.resourceId !== prevProps.resourceId) {
      this.handleResourceChange();
    }
  }

  componentWillUnmount() {
    if (this.props.onExit) {
      this.props.onExit(this.props.resourceId || null);
    }
  }

  handleResourceChange() {
    this.props.onResourceChange(this.props.resourceId || null);
  }

  renderWrappedComponent(componentProps) {
    const { WrappedComponent } = this.props;
    return <WrappedComponent {...componentProps} />;
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
      result = this.renderWrappedComponent(otherProps);
    }
    return result;
  }
}

ContainerProgress.propTypes = {
  ErrorComponent: PropTypes.func.isRequired,
  LoaderComponent: PropTypes.func.isRequired,
  matchParam: PropTypes.string,
  NotFoundComponent: PropTypes.func.isRequired,
  onExit: PropTypes.func,
  onResourceChange: PropTypes.func.isRequired,
  progress: ResourceProgress.isRequired,
  resourceId: ResourceId,
  WrappedComponent: PropTypes.func.isRequired,
};

ContainerProgress.defaultProps = {
  matchParam: null,
  onExit: null,
  resourceId: null,
};
