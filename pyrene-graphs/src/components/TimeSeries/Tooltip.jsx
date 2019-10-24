import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'tuktuktwo';
import TooltipLegendItem from './TooltipLegendItem';
import styles from './tooltip.css';

/**
 * Timeseries Tooltip
 */
const Tooltip = ({ dataValue, dataColor, dataLabel, time, timeFormat, tooltipLeft, tooltipTop }) => (
  <TooltipWrapper left={tooltipLeft} top={tooltipTop}>
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
  dataColor: PropTypes.string.isRequired,
  dataLabel: PropTypes.string.isRequired,
  dataValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  time: PropTypes.oneOfType([PropTypes.number], PropTypes.arrayOf(PropTypes.number)).isRequired,
  timeFormat: PropTypes.func.isRequired,

  /**
   * Sets the left absolute position, controlled by VX
   */
  tooltipLeft: PropTypes.number.isRequired,

  /**
   * Sets the top absolute position, controlled by VX
   */
  tooltipTop: PropTypes.number.isRequired,
};

export default Tooltip;
