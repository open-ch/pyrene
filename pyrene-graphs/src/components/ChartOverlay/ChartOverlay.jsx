import React from 'react';
import PropTypes from 'prop-types';
import styles from './chartOverlay.css';

/**
 * Chart overlays are used to display loaders, warnings, errors, etc.
 */
const ChartOverlay = (props) => (
  <div className={styles.container}>
    {props.children}
  </div>
);

ChartOverlay.displayName = 'ChartOverlay';

ChartOverlay.propTypes = {
  /**
   * Wrapped component(s).
   */
  children: PropTypes.node.isRequired,
};

export default ChartOverlay;
