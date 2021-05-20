import React from 'react';
import PropTypes from 'prop-types';
import styles from './displayBox.css';

const DisplayBox = (props) => (
  <div className={styles.displayBox}>
    <div className={styles.positioningBox} style={{ width: props.width }}>
      {props.children}
    </div>
  </div>
);

DisplayBox.displayName = 'DisplayBox';

DisplayBox.defaultProps = {
  width: '100%',
};

DisplayBox.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DisplayBox;
