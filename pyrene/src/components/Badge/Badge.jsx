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
    style={{ maxWidth: props.maxWidth }}
  >
    <div styleName={(props.textOverflow) ? 'textBoxOverflow' : ''}>
      <div styleName="message" style={{
        overflow: props.textOverflow ? 'hidden' : 'visible',
        textOverflow: props.textOverflow,
        textAlign: props.textAlign,
      }}
      >
        {props.label}
      </div>
    </div>
  </div>
);


Badge.displayName = 'Badge';

Badge.defaultProps = {
  onClick: () => null,
  textOverflow: '',
  textAlign: 'left',
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
   * Sets the text alignment of the label in the badge.
   */
  textAlign: PropTypes.oneOf(['center', 'left', 'right', 'justify']),
  /**
   * Sets the max width of the badge.
   */
  textOverflow: PropTypes.string,

  /**
   * Sets the overall style according to the badge type.
   */
  type: PropTypes.oneOf(['neutral', 'info', 'warning', 'danger', 'success']).isRequired,
};

export default Badge;
