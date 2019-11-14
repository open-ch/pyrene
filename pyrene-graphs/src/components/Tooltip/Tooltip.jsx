import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'tuktuktwo';
import TooltipLegendItem from './TooltipLegendItem';
import styles from './tooltip.css';

/**
 * Timeseries Tooltip
 */
const Tooltip = ({
  dataSeries, dataSeriesLabel, left, top,
}) => (
  <TooltipWrapper left={left} top={top}>
    <div className={styles.tooltip}>
      <div className={styles.dataSeriesLabel}>{dataSeriesLabel}</div>
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
   * The label of the data series
   */
  dataSeriesLabel: PropTypes.string.isRequired,

  /**
   * Sets the left absolute position, controlled by VX
   */
  left: PropTypes.number.isRequired,

  /**
   * Sets the top absolute position, controlled by VX
   */
  top: PropTypes.number.isRequired,
};

export default Tooltip;
