import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import './badge.css';

export type BadgeType = 'neutral' | 'info' | 'warning' | 'danger' | 'success' 

export interface BadgeProps {
  label: string;
  maxWidth: number;
  onClick?: (e: React.MouseEvent) => void;
  type: BadgeType;
}

/**
 * Badges are to provide status information about a specific component.
 *
 * Badges have a label and a mandatory type; they can be made clickable.
 */
const Badge: React.FC<BadgeProps> = (props) => (
  <div
    styleName={className('badge', { [`type-${props.type}`]: true })}
    style={{ maxWidth: props.maxWidth }}
    onClick={props.onClick}
  >
    <div styleName={className('label')}>
      {props.label}
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
   * Sets the max width of the badge.
   */
  maxWidth: PropTypes.number.isRequired,
  /**
   * Called when the user click on the badge.
   */
  onClick: PropTypes.func,
  /**
   * Sets the overall style according to the badge type.
   */
  type: PropTypes.oneOf<BadgeType>(['neutral', 'info', 'warning', 'danger', 'success']).isRequired,
};

export default Badge;
