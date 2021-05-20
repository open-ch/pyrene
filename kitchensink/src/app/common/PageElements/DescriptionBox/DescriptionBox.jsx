import React from 'react';
import PropTypes from 'prop-types';
import styles from './descriptionBox.css';

const DescriptionBox = (props) => (
  <div className={styles.descriptionBox}>
    {props.children}
  </div>
);

DescriptionBox.displayName = 'DescriptionBox';

DescriptionBox.propTypes = {
  children: PropTypes.node.isRequired,
};

DescriptionBox.defaultProps = {
};

export default DescriptionBox;
