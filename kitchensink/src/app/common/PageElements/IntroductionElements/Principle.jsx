import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './principle.css';

const Principle = (props) => (
  <div className={styles.principleContainer}>
    <div className={clsx(styles.icon, styles[`${props.icon}`])} />
    <div className={styles.textArea}>
      <span className={styles.title}>{props.title}</span>
      <span className={styles.description}>{props.description}</span>
    </div>
  </div>
);

Principle.displayName = 'Principle';

Principle.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

Principle.defaultProps = {};

export default Principle;
