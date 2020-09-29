import React from 'react';
// import PropTypes from 'prop-types';
import className from 'classnames';

import './badge.css';

export type BadgeType = 'neutral' | 'info' | 'warning' | 'danger' | 'success';

export interface BadgeProps {
  /**
   * Sets the label displayed to the user AND WHOEVER
   */
  label: string;
  /**
   * Sets the max width of the badge.
   */
  maxWidth: number;
  /**
   * Called when the user click on the badge.
   */
  onClick?: (e: React.MouseEvent) => void;
  /**
   * Sets the overall style according to the badge type.
   */
  type: BadgeType;
}

/**
 * Badges are to provide status information about a specific component.
 *
 * Badges have a label and a mandatory type; they can be made clickable.
 */
const Badge: React.FC<BadgeProps> = (props: BadgeProps) => (
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

// Badge.propTypes = {
//   label: PropTypes.string.isRequired,
//   maxWidth: PropTypes.number.isRequired,
//   onClick: PropTypes.func,
//   type: PropTypes.oneOf<BadgeType>(['neutral', 'info', 'warning', 'danger', 'success']).isRequired,
// };

export default Badge;
