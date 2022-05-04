import React from 'react';
import colors from './../../styles/colorConstants'

import styles from './ProgressBar.module.css';


export interface ProgressBarProps {
  /**
   * Color of the progress bar. Default is blue500
   */
  barColor?: string;
  /**
   * Value to display in percentage.
   */
  percent?: number;
}

const ProgressBar : React.FC<ProgressBarProps> = ({ barColor = colors.blue500, percent = 0}) => (
  <div className={styles.container}>
    <div className={styles.bar} style={{width: `${percent}%`, background: barColor,}} />
  </div>
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
