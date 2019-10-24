import React from 'react';
import PropTypes from 'prop-types';
import TooltipLegendItem from './TooltipLegendItem';
import styles from './tooltip.css';

/**
 * Timeseries Tooltip
 */
const Tooltip = ({ dataValue, dataColor, dataLabel, time, timeFormat }) => (
  <div className={styles.tooltip}>
    <div className={styles.timeTitle}>{timeFormat(time)}</div>
    <TooltipLegendItem dataColor={dataColor} dataLabel={dataLabel} dataValue={dataValue} />
  </div>
);

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
};

Tooltip.propTypes = {
  dataColor: PropTypes.string.isRequired,
  dataLabel: PropTypes.string.isRequired,
  dataValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  time: PropTypes.number.isRequired,
  timeFormat: PropTypes.func.isRequired,
};

export default Tooltip;
