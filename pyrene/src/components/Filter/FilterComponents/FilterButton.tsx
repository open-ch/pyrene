import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import styles from './filterButton.css';

export interface FilterButtonProps {
  disabled?: boolean,
  displayPopover?: boolean,
  label: string,
  noBorder?: boolean,
  onClick?: () => null,
}

const FilterButton: FunctionComponent<FilterButtonProps> = ({
  disabled = false,
  displayPopover = false,
  label,
  noBorder = false,
  onClick = () => null,
}) => (
  <div
    className={clsx(styles.filterButton, {
      [styles.noBorder]: noBorder,
      [styles.popoverOpen]: displayPopover,
      [styles.disabled]: disabled,
    })}
    onClick={onClick}
  >
    <div className={styles.buttonLabel}>
      {label}
    </div>
    <div className={clsx(styles.arrowIcon, { 'pyreneIcon-chevronUp': displayPopover, 'pyreneIcon-chevronDown': !displayPopover })} />
  </div>
);


FilterButton.displayName = 'FilterButton';

export default FilterButton;
