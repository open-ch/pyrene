import React, { FunctionComponent } from 'react';

import styles from './optionsItem.css';


export interface OptionsItemProps {
  label: string,
  onClick: () => void,
}

const OptionsItem: FunctionComponent<OptionsItemProps> = ({ label, onClick }: OptionsItemProps) => (
  <button
    className={styles.container}
    onClick={onClick}
    type="button"
  >
    <span className={styles.optionLabel}>
      {label}
    </span>
  </button>
);

export default OptionsItem;
