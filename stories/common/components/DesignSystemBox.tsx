import React from 'react';
import clsx from 'clsx';

import styles from './DesignSystemBox.module.css';

interface DesignSystemProps {
  description: string;
  icon: string;
  number: number;
  title: string;
}

const DesignSystemBox: React.FC<DesignSystemProps> = ({ number, icon, title, description }) => (
  <div className={styles.introDesignSystemBox}>
    <div className={styles.numberIconTitleContainer}>
      <div className={styles.number}>{number}</div>
      <div className={styles.iconTitle}>
        <span className={clsx(styles.icon, styles[`${icon}`])} />
        <span>{title}</span>
      </div>
    </div>
    <div className={styles.description}>{description}</div>
  </div>
);

DesignSystemBox.displayName = 'DesignSystemBox';

export default DesignSystemBox;
