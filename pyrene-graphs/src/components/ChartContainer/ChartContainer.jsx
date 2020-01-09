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
    {props.chartUnit}
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
  chartUnit: undefined,
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
   * Unit of the chart
   */
  chartUnit: PropTypes.node,
  /**
   * Header component
   */
  header: PropTypes.node.isRequired,
};

export default ChartContainer;
