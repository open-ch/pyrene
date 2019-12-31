import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Loader } from 'pyrene';
import SparkLineSVG from '../SparkLine/SparkLineSVG';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import colorSchemes from '../../styles/colorSchemes';
import './sparkLineChart.css';

/**
 * Spark Line Charts are used to display data series.
 */
const SparkLineChart = (props) => (
  <div styleName="container">
    {!props.loading && (props.keyFigure !== null) && (
      <div styleName="keyFigure">
        {props.keyFigure}
      </div>
    )}
    <div styleName={classNames('chart', { noKeyFigure: props.loading || props.keyFigure === null })}>
      <SparkLineSVG
        axisLabel={props.axisLabel}
        colorScheme={props.colorScheme}
        dataFormat={props.dataFormat}
        data={props.data}
        loading={props.loading}
        sparkLineHeight={62}
        strokeWidth={2}
        enableTooltip={props.enableTooltip}
      />
    </div>
    {props.loading && (
      <div styleName="chartOverlay">
        <ChartOverlay>
          <Loader type="inline" />
        </ChartOverlay>
      </div>
    )}
  </div>
);

SparkLineChart.displayName = 'Spark Line Chart';

SparkLineChart.defaultProps = {
  axisLabel: '',
  colorScheme: colorSchemes.colorSchemeDefault,
  dataFormat: (d) => d,
  enableTooltip: false,
  keyFigure: null,
  loading: false,
};

SparkLineChart.propTypes = {
  /**
   * Sets the axis label.
   */
  axisLabel: PropTypes.string,
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    valueGroundLight: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the data series as an array of data. Each data item contains a timestamp and a value.
   */
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  /**
   * Sets the data formatting functions for the chart.
   */
  dataFormat: PropTypes.func,
  /**
   * If set, a tooltip is shown, while hovering.
   */
  enableTooltip: PropTypes.bool,
  /**
   * Sets the key figure.
   */
  keyFigure: PropTypes.string,
  /**
    * If set, a loader is shown instead of axis tick labels, grid and bars.
    */
  loading: PropTypes.bool,
};

export default SparkLineChart;
