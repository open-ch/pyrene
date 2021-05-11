import React from 'react';
import clsx from 'clsx';

import styles from './labelAndValue.css';

export interface LabelAndValueProps {
  /**
   * The label
   */
  label?: string;
  /**
   * The font size of the value (small or large)
   */
  size?: 'tiny' | 'small' | 'large';
  /**
   * Sets the overall style according to the value type.
   */
  type?: 'neutral' | 'info' | 'warning' | 'danger' | 'success';
  /**
   * The value.
   */
  value?: string;
}

/**
 * Show a label and its value as a highlight.
 */
const LabelAndValue: React.FC<LabelAndValueProps> = ({
  label = '', size = 'small', value = '', type = 'neutral',
}: LabelAndValueProps) => (
  <div className={clsx(styles['label-and-value'], styles[`label-and-value-${size}`])}>
    <div className={styles.label}>{label}</div>
    <div className={clsx(styles.value, styles[`type-${type}`])}>{value}</div>
  </div>
);

LabelAndValue.displayName = 'Label And Value';

export default LabelAndValue;
