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
    {props.number <= props.max
      ? <div styleName={className('pill', { [`type-${props.type}`]: true })}>{props.number}</div>
      : <div styleName={className('pill', { [`type-${props.type}`]: true })}>{props.max + '+'}</div>
    }
  </div>
);

Pill.displayName = 'Pill';

Pill.propTypes = {
  /**
   * Sets the maximum displayable number.
   */
  max: PropTypes.number.isRequired,
  /**
   * Sets the number displayed to the user.
   */
  number: PropTypes.number.isRequired,
  /**
   * Sets the overall style according to the pill type.
   */
  type: PropTypes.oneOf(['neutral', 'info', 'warning', 'danger', 'success']).isRequired,
};

export default Pill;
