import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './filterButton.css';

const FilterButton = (props) => (
  <div className={clsx(styles.filterButton, { [styles.noBorder]: props.noBorder }, { [styles.popoverOpen]: props.displayPopover }, { [styles.disabled]: props.disabled })} onClick={props.onClick}>
    <div className={styles.buttonLabel}>
      {props.label}
    </div>
    <div className={clsx(styles.arrowIcon, { 'pyreneIcon-chevronUp': props.displayPopover, 'pyreneIcon-chevronDown': !props.displayPopover })} />
  </div>
);


FilterButton.displayName = 'FilterButton';

FilterButton.defaultProps = {
  disabled: false,
  displayPopover: false,
  noBorder: false,
  onClick: () => null,
};

FilterButton.propTypes = {
  disabled: PropTypes.bool,
  displayPopover: PropTypes.bool,
  label: PropTypes.string.isRequired,
  noBorder: PropTypes.bool,
  onClick: PropTypes.func,
};

export default FilterButton;
