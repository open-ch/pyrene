/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';

import styles from './optionList.css';
import { Option } from './types';

export interface OptionListProps {
  /**
   * Sets the selected choice of the user.
   */
  onChange: (option: Option) => void,
  /**
   * Set the values that the user can choose from.
   */
  options: Array<Option>,
  /**
   * Render callback for the help section above the options
   */
  renderHelpSection?: () => JSX.Element,
  selectedValue?: Option,
}

const OptionList: FunctionComponent<OptionListProps> = ({
  onChange,
  options,
  renderHelpSection,
  selectedValue,
}) => (
  <div className={styles.checkboxList}>
    {renderHelpSection && (
      <div className={styles.listHeader}>
        {renderHelpSection()}
      </div>
    )}
    <div className={styles.list}>
      {options.map((item) => {
        const selected = item === selectedValue;
        return (
          <div
            className={clsx(styles.listItem, { [styles.selected]: selected })}
            key={item.value}
            onClick={() => onChange(item)}
          >
            <span className={clsx({ 'pyreneIcon-check': selected }, styles.listIcon)} aria-label="Item checked" />
            <span className={styles.listLabel}>{item.label}</span>
          </div>
        );
      })}
    </div>
  </div>
);

export default OptionList;
