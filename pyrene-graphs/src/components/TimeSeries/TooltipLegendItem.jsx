import React from 'react';
import PropTypes from 'prop-types';
import styles from './tooltip.css';

/**
 * Timeseries Tooltip Legend Item
 */
const TooltipLegendItem = ({ dataValue, dataColor, dataLabel }) => (
  <div className={styles.dataRow}>
    <svg height="16" width="16"><circle cx="8" cy="9" r="3.5" stroke="white" strokeWidth="1" fill={dataColor} /></svg>
    <div className={styles.dataLabel}>{dataLabel}</div>
    <div className={styles.data}>{dataValue}</div>
  </div>
);

TooltipLegendItem.displayName = 'TooltipLegendItem';

TooltipLegendItem.defaultProps = {
};

TooltipLegendItem.propTypes = {
  dataColor: PropTypes.string.isRequired,
  dataLabel: PropTypes.string.isRequired,
  dataValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default TooltipLegendItem;
