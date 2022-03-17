import React from 'react';
import clsx from 'clsx';

import styles from './Principle.module.css';

interface PrincipleProps {
  description: string;
  icon: string;
  title: string;
}

const Principle: React.FC<PrincipleProps> = (props) => (
  <div className={styles.principleContainer}>
    <div className={clsx(styles.icon, styles[`${props.icon}`])} />
    <div className={styles.textArea}>
      <span className={styles.title}>{props.title}</span>
      <span className={styles.description}>{props.description}</span>
    </div>
  </div>
);

Principle.displayName = 'Principle';

export default Principle;
