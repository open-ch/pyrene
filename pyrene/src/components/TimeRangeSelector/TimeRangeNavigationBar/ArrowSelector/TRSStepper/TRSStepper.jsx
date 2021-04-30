import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './trsStepper.css';

/**
 * Custom steppers for the TRS used for previous/next navigation.
 */
const TRSStepper = (props) => {
  const capitalisedDirection = props.direction.charAt(0).toUpperCase() + props.direction.slice(1);
  const iconName = `pyreneIcon-chevron${capitalisedDirection}`;
  return (
    <button
      type="button"
      className={clsx('unSelectable',
        styles.stepper,
        { [styles.disabled]: props.disabled },
        { [styles.right]: props.direction === 'right' },
        { [styles.left]: props.direction === 'left' })}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <span className={clsx(iconName,
        styles.stepperIcon,
        { [styles.disabledIcon]: props.inactive })}
      />
    </button>
  );
};

TRSStepper.displayName = 'TRSStepper';

TRSStepper.defaultProps = {
  direction: 'left',
  disabled: false,
  inactive: false,
};

TRSStepper.propTypes = {
  /**
   * Sets the direction of the arrow.
   */
  direction: PropTypes.oneOf(['right', 'left']),
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * The component is inactive due to constraints.
   */
  inactive: PropTypes.bool,
  /**
   * Javascript event handler.
   */
  onClick: PropTypes.func.isRequired,
};

export default TRSStepper;
