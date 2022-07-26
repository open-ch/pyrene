import React from 'react';
import colors from '../../styles/colorConstants';

import styles from './PercentageBar.module.css';

export interface PercentageBarProps {
  /**
   * Color of the percentage bar. Default is blue800
   */
  barColor?: string;
  /**
   * Value to display in percentage.
   */
  percent?: number;
  /**
   * Actual value, if provided displayed next to the bar
   */
  value?: number;
}

const PercentageBar: React.FC<PercentageBarProps> = ({
  barColor = colors.blue800,
  percent = 0,
  value,
}) => (
  <div className={styles.container}>
    <div className={styles.barContainer}>
      <div className={styles.bar} style={{ width: `${percent}%`, background: barColor }} />
    </div>
    {value && <div>{value}</div>}
  </div>
);

PercentageBar.displayName = 'PercentageBar';

export default PercentageBar;
