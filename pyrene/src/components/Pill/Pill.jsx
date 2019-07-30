import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import './pill.css';

/**
 * Pills are used to provide number or count information about a specific component.
 *
 * Pills have a numeric number and a type. Both properties are mandatory. Pills are not clickable.
 *
 */
const Pill = props => (
  <div>
    {props.icon && <div styleName="icon" className={`pyreneIcon-${props.icon}`} />}
    {props.value <= props.maxValue
      ? <div styleName={className('pill', { [`type-${props.type}`]: true })}>{props.value}</div>
      : <div styleName={className('pill', { [`type-${props.type}`]: true })}>{props.maxValue + '+'}</div>
    }
  </div>
);

Pill.displayName = 'Pill';

Pill.defaultProps = {
  icon: '',
};

Pill.propTypes = {
  /**
   * Set the icon underneath the pill.
   */
  icon: PropTypes.string,
  /**
   * Sets the maximum displayable value.
   */
  maxValue: PropTypes.number.isRequired,
  /**
   * Sets the overall style according to the pill type.
   */
  type: PropTypes.oneOf(['neutral', 'info', 'warning', 'danger', 'success']).isRequired,
  /**
   * Sets the value displayed to the user.
   */
  value: PropTypes.number.isRequired,
};

export default Pill;
