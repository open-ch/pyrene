import React from 'react';
import clsx from 'clsx';

import styles from './Badge.module.css';

export type BadgeType = 'neutral' | 'info' | 'warning' | 'danger' | 'success' | 'outage';

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
const Badge: React.FC<BadgeProps> = ({
  label,
  maxWidth,
  onClick,
  type,
}: BadgeProps) => {
  const cursorClass = onClick ? 'cursor-pointer' : 'cursor-default';
  return (
    <div
      className={clsx(styles.badge, styles[`type-${type}`], styles[cursorClass])}
      style={{ maxWidth }}
      onClick={onClick}
    >
      <div className={clsx(styles.label)}>
        {label}
      </div>
    </div>
  );
};

Badge.displayName = 'Badge';

export default Badge;
