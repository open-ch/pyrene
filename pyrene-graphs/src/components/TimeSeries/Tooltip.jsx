import React from 'react';
import PropTypes from 'prop-types';
import { TimeSeriesTooltipLegendItem } from 'tuktuktwo';
import styles from './tooltip.css';

/**
 * Timeseries Tooltip
 */
const Tooltip = ({ data, dataColor, dataLabel, time, timeFormat }) => (
  <div className={styles.tooltip}>
    <div className={styles.timeTitle}>{timeFormat(time)}</div>
    <TimeSeriesTooltipLegendItem className={styles.dataRow} color={dataColor}
      dataLabel={dataLabel} dataLabelClassName={styles.dataLabel}
      dataValue={data} dataValueClassName={styles.data}
    />
  </div>
);

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
};

Tooltip.propTypes = {
  data: PropTypes.string.isRequired,
  dataColor: PropTypes.string.isRequired,
  dataLabel: PropTypes.string.isRequired,

  time: PropTypes.number.isRequired,
  timeFormat: PropTypes.func.isRequired,
};

export default Tooltip;
