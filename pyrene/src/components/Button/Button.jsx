import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button.css';

const Button = props => (
  <button
    className={'unSelectable'}
    styleName={
      classNames('button',
        { [`type-${props.type}`]: true },
        { hasIcon: props.icon },
        { disabled: props.disabled })}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.icon && <span className={`icon-${props.icon}`} />}
    {props.label}
  </button>
);

Button.displayName = 'Button';

Button.defaultProps = {
  icon: '',
  label: '',
  type: 'primary',
  disabled: false,
  onClick: () => null
};

Button.propTypes = {
  /**
   *  Adds an icon in front of the label. Uses the icon-font.
   */
  icon: PropTypes.string,
  /**
   *  Changes what the button says.
   */
  label: PropTypes.string.isRequired,
  /**
   * Changes the overall button style.
   */
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost', 'action', 'admin']),
  /**
   *  Disables any interaction with the button.
   */
  disabled: PropTypes.bool,
  /**
   *  onClick function
   */
  onClick: PropTypes.func
};

export default Button;
