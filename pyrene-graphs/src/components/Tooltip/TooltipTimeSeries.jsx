import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'tuktuktwo';
import TooltipLegendItem from './TooltipLegendItem';
import styles from './tooltip.css';

/**
 * Timeseries Tooltip
 */
const Tooltip = ({
  dataSeries, time, timeFormat, left, top,
}) => (
  <TooltipWrapper left={left} top={top}>
    <div className={styles.tooltip}>
      <div className={styles.timeTitle}>{timeFormat(time)}</div>
      {
        dataSeries.map((e) => <TooltipLegendItem key={e.dataLabel} dataColor={e.dataColor} dataLabel={e.dataLabel} dataValue={e.dataValue} />)
      }
    </div>
  </TooltipWrapper>
);

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
  dataSeries: [],
};

Tooltip.propTypes = {

  dataSeries: PropTypes.arrayOf(PropTypes.shape({
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
  })),

  /**
   * Sets the left absolute position, controlled by VX
   */
  left: PropTypes.number.isRequired,

  /**
   * The time of the data series. Either a point or a range
   */
  time: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]).isRequired,

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
