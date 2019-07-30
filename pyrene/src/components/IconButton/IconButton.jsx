import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './iconbutton.css';

/**
 * An Icon that acts like a Button
 */
const IconButton = props => (
  <a styleName={classNames('iconbutton', { disabled: props.disabled }, { [`type-${props.type}`]: true })}
    href={props.path}
    onClick={props.onClick ? ((event) => {
      event.preventDefault();
      props.onClick(event);
    }) : (event) => {
      event.stopPropagation();
    }}
  >
    <span className={`pyreneIcon-${props.icon}`} />
  </a>
);

IconButton.displayName = 'IconButton';

IconButton.defaultProps = {
  disabled: false,
  onClick: undefined,
  path: '#',
  type: 'neutral',
};

IconButton.propTypes = {
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Sets the icon shown
   */
  icon: PropTypes.string.isRequired,
  /**
   * Javascript event handler. Overrides the redirect functionality (path prop ignored).
   */
  onClick: PropTypes.func,
  /**
   * Sets the path the user is redirected to.
   */
  path: PropTypes.string,
  /**
   * Sets the overall style
   */
  type: PropTypes.oneOf(['neutral', 'info', 'warning', 'danger', 'success']),
};

export default IconButton;
