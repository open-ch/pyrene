import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './trsStepper.css';

/**
 * Custom steppers for the TRS used for previous/next navigation.
 */
const TRSStepper = (props) => {
  const capitalisedDirection = props.direction.charAt(0).toUpperCase() + props.direction.slice(1);
  const iconName = `pyreneIcon-chevron${capitalisedDirection}`;
  return (
    <button
      type="button"
      className="unSelectable"
      styleName={
        classNames('stepper',
          { disabled: props.disabled },
          { right: props.direction === 'right' },
          { left: props.direction === 'left' })}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <span className={iconName} styleName="icon" />
    </button>
  );
};

TRSStepper.displayName = 'TRSStepper';

TRSStepper.defaultProps = {
  direction: 'left',
  disabled: false,
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
   * Javascript event handler.
   */
  onClick: PropTypes.func.isRequired,
};

export default TRSStepper;
