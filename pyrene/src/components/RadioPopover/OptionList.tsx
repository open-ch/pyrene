import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './optionList.css';

const OptionList = (props) => (
  <div className={styles.checkboxList}>
    {props.renderHelpSection && (
      <div className={styles.listHeader}>
        {props.renderHelpSection()}
      </div>
    )}
    <div className={styles.list}>
      {props.options
        .map((item) => {
          const selected = item === props.selectedValue;
          return (
            <div
              className={clsx(styles.listItem, { [styles.selected]: selected })}
              key={item.value}
              onClick={() => props.onChange(item)}
            >
              <span className={clsx({ 'pyreneIcon-check': selected }, styles.listIcon)} aria-label="Item checked" />
              <span className={styles.listLabel}>{item.label}</span>
            </div>
          );
        })}
    </div>
  </div>
);


OptionList.displayName = 'OptionList';

OptionList.defaultProps = {
  renderHelpSection: null,
  selectedValue: null,
};

OptionList.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  })).isRequired,
  renderHelpSection: PropTypes.func,
  selectedValue: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
};

export default OptionList;
