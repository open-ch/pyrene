import React from 'react';
import PropTypes from 'prop-types';

import styles from './optionsItem.css';

const OptionsItem = (props) => (
  <button
    className={styles.container}
    onClick={props.onClick}
    type="button"
  >
    <span className={styles.optionLabel}>
      {props.label}
    </span>
  </button>
);

OptionsItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OptionsItem;
