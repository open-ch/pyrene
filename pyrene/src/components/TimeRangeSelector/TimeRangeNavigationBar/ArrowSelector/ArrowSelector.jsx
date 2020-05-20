import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TRSStepper from './TRSStepper/TRSStepper';
import './arrowSelector.css';

const ArrowSelector = (props) => (
  <div styleName="arrowSelector">
    <TRSStepper
      direction="left"
      disabled={props.disabled}
      inactive={props.backInactive}
      onClick={(props.disabled || props.backInactive) ? () => {} : props.onNavigateBack}
    />
    <div styleName="contentOuter">
      <div styleName="contentInner" style={{ width: props.innerWidth }}>
        <div styleName={classNames('value', { disabled: props.disabled })}>
          {props.label}
        </div>
      </div>
    </div>
    <TRSStepper
      direction="right"
      disabled={props.disabled}
      inactive={props.forwardInactive}
      onClick={(props.disabled || props.forwardInactive) ? () => {} : props.onNavigateForward}
    />
  </div>
);

ArrowSelector.displayName = 'ArrowSelector';

ArrowSelector.defaultProps = {
  disabled: false,
  innerWidth: 248,
};

ArrowSelector.propTypes = {
  backInactive: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  forwardInactive: PropTypes.bool.isRequired,
  innerWidth: PropTypes.number,
  label: PropTypes.string.isRequired,
  onNavigateBack: PropTypes.func.isRequired,
  onNavigateForward: PropTypes.func.isRequired,
};

export default ArrowSelector;
