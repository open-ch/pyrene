import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'tuktuktwo';
import TooltipLegendItem from './TooltipLegendItem';
import styles from './tooltip.css';

/**
 * Timeseries Tooltip
 */
const Tooltip = ({ dataValue, dataColor, dataLabel, time, timeFormat, left, top }) => (
  <TooltipWrapper left={left} top={top}>
    <div className={styles.tooltip}>
      <div className={styles.timeTitle}>{timeFormat(time)}</div>
      <TooltipLegendItem dataColor={dataColor} dataLabel={dataLabel} dataValue={dataValue} />
    </div>
  </TooltipWrapper>
);

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
};

Tooltip.propTypes = {
  /**
   * The color of the data series
   */
  dataColor: PropTypes.string.isRequired,

  /**
   * The label of the data series
   */
  dataLabel: PropTypes.string.isRequired,

  /**
   * The actual value of the data series
   */
  dataValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /**
   * Sets the left absolute position, controlled by VX
   */
  left: PropTypes.number.isRequired,

  /**
   * The time of the data series. Either a point or a range
   */
  time: PropTypes.oneOfType([PropTypes.number], PropTypes.arrayOf(PropTypes.number)).isRequired,

  /**
   * The function that shall be used for time formatting. Must support all formats of the time property
   */
  timeFormat: PropTypes.func.isRequired,

  /**
   * Sets the top absolute position, controlled by VX
   */
  top: PropTypes.number.isRequired,
};

export default Tooltip;
