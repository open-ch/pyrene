import React from 'react';
import PropTypes from 'prop-types';

/**
 * Tooltip for time series
 */
const TimeSeriesTooltipLegendItem = props => (
  <div className={props.className}>
    <svg height="16" width="16"><circle cx="8" cy="9" r="3.5" stroke="white" strokeWidth="1" fill={props.color} /></svg>
    <div className={props.dataLabelClassName}>{props.dataLabel}</div>
    <div className={props.dataValueClassName}>{props.dataValue}</div>
  </div>
);

TimeSeriesTooltipLegendItem.displayName = 'TimeSeriesTooltipLegendItem';

TimeSeriesTooltipLegendItem.defaultProps = {};

TimeSeriesTooltipLegendItem.propTypes = {
  /**
   * The row's styling class name
   */
  className: PropTypes.string.isRequired,

  /**
   * The color to use
   */
  color: PropTypes.string.isRequired,

  /**
   * Data label
   */
  dataLabel: PropTypes.string.isRequired,

  /**
   * Data label css class name
   */
  dataLabelClassName: PropTypes.string.isRequired,

  /**
   * Data value
   */
  dataValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /**
   * Data value css class name
   */
  dataValueClassName: PropTypes.string.isRequired,
};

export default TimeSeriesTooltipLegendItem;
