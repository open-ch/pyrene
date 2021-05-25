import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './designSystemBox.css';

const DesignSystemBox = (props) => (
  <div className={styles.introDesignSystemBox}>
    <div className={styles.numberIconTitleContainer}>
      <div className={styles.number}>{props.number}</div>
      <div className={styles.iconTitle}>
        <span className={clsx(styles.icon, styles[`${props.icon}`])} />
        <span>{props.title}</span>
      </div>
    </div>
    <div className={styles.description}>
      {props.description}
    </div>
  </div>
);

DesignSystemBox.displayName = 'DesignSystemBox';

DesignSystemBox.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

DesignSystemBox.defaultProps = {};

export default DesignSystemBox;
