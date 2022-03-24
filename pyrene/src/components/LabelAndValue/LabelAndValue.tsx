import React from 'react';
import clsx from 'clsx';

import styles from './LabelAndValue.module.css';

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
    /**
   * Sets whether line breaks appear wherever the text would otherwise overflow its content box.
   */
  wordBreak?: boolean;
}

/**
 * Show a label and its value as a highlight.
 */
const LabelAndValue: React.FC<LabelAndValueProps> = ({
  label = '',
  size = 'small',
  value = '',
  type = 'neutral',
  wordBreak = false
}: LabelAndValueProps) => (
  <div className={clsx(styles['label-and-value'], styles[`label-and-value-${size}`])}>
    <div className={styles.label}>{label}</div>
    <div className={clsx(styles.value, styles[`type-${type}`], wordBreak && styles['word-break'])}>{value}</div>
  </div>
);

LabelAndValue.displayName = 'LabelAndValue';

export default LabelAndValue;

