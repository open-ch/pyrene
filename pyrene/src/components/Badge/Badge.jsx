import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import './badge.css';

/**
 * Badges are to provide status information about a specific component.
 *
 * Badges have a label and a mandatory type; they can be made clickable.
 */
const Badge = props => (
  <div
    styleName={className('badge', { [`type-${props.type}`]: true })}
    onClick={props.onClick}
    role="badge"
  >
    <div styleName="textBox">
      <div styleName="message">{props.label}</div>
    </div>
  </div>
);


Badge.displayName = 'Badge';

Badge.defaultProps = {
  onClick: () => null,
};

Badge.propTypes = {
  /**
   * Sets the label displayed to the user.
   */
  label: PropTypes.string.isRequired,
  /**
   * Called when the user click on the badge.
   */
  onClick: PropTypes.func,
  /**
   * Sets the overall style according to the badge type.
   */
  type: PropTypes.oneOf(['neutral', 'info', 'warning', 'danger', 'success']).isRequired,
};

export default Badge;