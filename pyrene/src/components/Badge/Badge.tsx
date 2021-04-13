import React, { FunctionComponent } from 'react';
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
  maxWidth?: number | string;
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
const Badge: FunctionComponent<BadgeProps> = ({
  label, maxWidth, onClick = () => null, type,
}) => (
  <div
    styleName={className('badge', { [`type-${type}`]: true })}
    style={{ maxWidth: maxWidth }}
    onClick={onClick}
  >
    <div styleName={className('label')}>
      {label}
    </div>
  </div>
);

export default Badge;
