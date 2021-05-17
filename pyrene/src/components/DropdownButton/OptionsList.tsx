import React, { FunctionComponent } from 'react';

import OptionsItem, { OptionsItemProps } from './OptionsItem';

import styles from './optionsList.css';

export interface OptionsListProps {
  actions: Array<OptionsItemProps>,
  onClick: () => void,
}

const OptionsList: FunctionComponent<OptionsListProps> = ({ actions, onClick }: OptionsListProps) => (
  <div className={styles.actionContainer}>
    {actions.map((action) => (
      <OptionsItem
        key={action.label}
        label={action.label}
        onClick={() => {
          action.onClick();
          onClick();
        }}
      />
    ))}
  </div>
);

export default OptionsList;
