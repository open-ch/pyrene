import React from 'react';
import clsx from 'clsx';

import IconButton from '../IconButton/IconButton';

import styles from './pill.css';

export type Type = 'neutral' | 'info' | 'warning' | 'danger' | 'success';

export interface PillProps {
  /**
   * Set the icon underneath the pill.
   */
  icon?: string;
  /**
   * Sets the color of the icon.
   */
  iconType?: Type;
  /**
   * Sets the maximum displayable value.
   */
  maxValue?: number,
  /**
   * Sets the maximum displayable value.
   */
  onClick?: (e: React.MouseEvent) => void;
  /**
   * Sets the overall style according to the pill type.
   */
  type: Type;
  /**
   * Sets the value displayed to the user.
   */
  value: number,
}

/**
 * Pills are used to provide number or count information about a specific component.
 *
 * Pills have a numeric number and a type. Both properties are mandatory. Pills can also wrap an icon. Pills are not clickable.
 *
 */
const Pill: React.FC<PillProps> = ({
  icon = '',
  iconType = 'neutral',
  maxValue = 99,
  onClick,
  type,
  value,
}: PillProps) => (
  <div>
    {(onClick && icon)
      && <div className={styles.icon}><IconButton icon={icon} type={iconType} onClick={onClick} /></div>}
    {(!onClick && icon) && (
      <div className={clsx(styles.icon, styles[`type-${iconType}`])}>
        <span className={`pyreneIcon-${icon}`} />
      </div>
    )}
    {!maxValue || (value <= maxValue)
      ? <div className={clsx(styles.pill, styles[`type-${type}`])}>{value}</div>
      : <div className={clsx(styles.pill, styles[`type-${type}`])}>{`${maxValue}+`}</div>}
  </div>
);

Pill.displayName = 'Pill';

export default Pill;
