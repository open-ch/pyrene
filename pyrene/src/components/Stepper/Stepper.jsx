import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './stepper.css';

/**
 * Steppers are used for previous/next navigation.
 *
 * Steppers are often used in the detail view of a data table entry (modal view) to navigate through the table entries without leaving the modal view.
 */
const Stepper = (props) => {
  const capitalisedDirection = props.direction.charAt(0).toUpperCase() + props.direction.slice(1);
  const iconName = `pyreneIcon-chevron${capitalisedDirection}`;
  return (
    <button
      type="button"
      className="unSelectable"
      styleName={
        classNames('stepper',
          { disabled: props.disabled },
          { [`type-${props.type}`]: true })
      }
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <span className={iconName} styleName="icon" />
    </button>
  );
};

Stepper.displayName = 'Stepper';

Stepper.defaultProps = {
  direction: 'right',
  type: 'bordered',
  disabled: false,
  onClick: () => null,
};

Stepper.propTypes = {
  /**
   * Sets the direction of the arrow.
   */
  direction: PropTypes.oneOf(['up', 'down', 'right', 'left']),
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Javascript event handler.
   */
  onClick: PropTypes.func,
  /**
   * Sets the overall style.
   */
  type: PropTypes.oneOf(['bordered', 'minimal']),
};

export default Stepper;
