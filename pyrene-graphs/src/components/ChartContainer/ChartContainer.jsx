import React from 'react';
import PropTypes from 'prop-types';
import './chartContainer.css';

/**
 * Chart containers are used to standardize chart layouts.
 * They take care of the correct positioning of headers, charts and chart overlays.
 */
const ChartContainer = (props) => (
  <div styleName="chartContainer">
    {props.header}
    <div styleName="unitContainer">
      {props.chartUnit}
    </div>
    {props.chartOverlay && (
      <div styleName="chartOverlay">
        {props.chartOverlay}
      </div>
    )}
    <div styleName="chart">
      {props.chart}
    </div>
  </div>
);

ChartContainer.displayName = 'Chart Container';

ChartContainer.defaultProps = {
  chartOverlay: null,
  chartUnit: '',
};

ChartContainer.propTypes = {
  /**
   * Chart component
   */
  chart: PropTypes.node.isRequired,
  /**
   * ChartOverlay component
   */
  chartOverlay: PropTypes.node,
  /**
   * Sets the unit of the chart, if there is any
   */
  chartUnit: PropTypes.string,
  /**
   * Header component
   */
  header: PropTypes.node.isRequired,
};

export default ChartContainer;
