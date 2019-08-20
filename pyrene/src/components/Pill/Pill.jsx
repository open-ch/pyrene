import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import IconButton from '../IconButton/IconButton';

import './pill.css';

/**
 * Pills are used to provide number or count information about a specific component.
 *
 * Pills have a numeric number and a type. Both properties are mandatory. Pills can also wrap an icon. Pills are not clickable.
 *
 */
const Pill = props => (
  <div>
    {(props.onClick && props.icon)
      && <div styleName={className('icon')}><IconButton icon={props.icon} type={props.iconType} onClick={props.onClick} /></div>}
    {(!props.onClick && props.icon) && (
      <div styleName={className('icon', { [`type-${props.iconType}`]: true })}>
        <span className={`pyreneIcon-${props.icon}`} />
      </div>
    )}
    {props.value <= props.maxValue
      ? <div styleName={className('pill', { [`type-${props.type}`]: true })}>{props.value}</div>
      : <div styleName={className('pill', { [`type-${props.type}`]: true })}>{`${props.maxValue}+`}</div>
    }
  </div>
);

Pill.displayName = 'Pill';

Pill.defaultProps = {
  icon: '',
  iconType: 'neutral',
  maxValue: 99,
  onClick: undefined,
};

Pill.propTypes = {
  /**
   * Set the icon underneath the pill.
   */
  icon: PropTypes.string,
  /**
   * Sets the color of the icon.
   */
  iconType: PropTypes.oneOf(['neutral', 'info', 'warning', 'danger', 'success']),
  /**
   * Sets the maximum displayable value.
   */
  maxValue: PropTypes.number,
  /**
   * Sets the maximum displayable value.
   */
  onClick: PropTypes.func,
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
