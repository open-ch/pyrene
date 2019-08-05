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
    style={{ maxWidth: props.maxWidth }}
    onClick={props.onClick}
    role="badge"
  >
    <div styleName={className('labelContainer', { [`style-${props.styling}`]: true })}>
      <div styleName={className('label', { [`style-${props.styling}`]: true })}>
        {props.label}
      </div>
    </div>
  </div>
);


Badge.displayName = 'Badge';

Badge.defaultProps = {
  onClick: () => null,
  styling: 'ellipsis',
};

Badge.propTypes = {
  /**
   * Sets the label displayed to the user.
   */
  label: PropTypes.string.isRequired,
  /**
   * Sets the max width of the badge.
   */
  maxWidth: PropTypes.number.isRequired,
  /**
   * Called when the user click on the badge.
   */
  onClick: PropTypes.func,
  /**
   * Sets the text overflow style according to the badge usage.
   */
  styling: PropTypes.oneOf(['ellipsis', 'fulltext', 'clip']),
  /**
   * Sets the overall style according to the badge type.
   */
  type: PropTypes.oneOf(['neutral', 'info', 'warning', 'danger', 'success']).isRequired,
};

export default Badge;
