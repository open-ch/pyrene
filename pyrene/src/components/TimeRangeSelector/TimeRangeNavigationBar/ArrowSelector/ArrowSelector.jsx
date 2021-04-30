import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import TRSStepper from './TRSStepper/TRSStepper';
import styles from './arrowSelector.css';

const ArrowSelector = (props) => (
  <div className={styles.arrowSelector}>
    <TRSStepper
      direction="left"
      disabled={props.disabled}
      inactive={props.backInactive}
      onClick={(props.disabled || props.backInactive) ? () => {} : props.onNavigateBack}
    />
    <div className={styles.contentOuter}>
      <div className={styles.contentInner} style={{ width: props.innerWidth }}>
        <div className={clsx(styles.value, { [styles.disabled]: props.disabled })}>
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
};

ArrowSelector.propTypes = {
  backInactive: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  forwardInactive: PropTypes.bool.isRequired,
  innerWidth: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onNavigateBack: PropTypes.func.isRequired,
  onNavigateForward: PropTypes.func.isRequired,
};

export default ArrowSelector;
