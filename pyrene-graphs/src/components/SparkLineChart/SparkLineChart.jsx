import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'pyrene';
import { SparkLine, TimeXAxis, Responsive } from 'tuktuktwo';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import colorConstants from '../../styles/colorConstants';
import colorSchemes from '../../styles/colorSchemes';
import './sparkLineChart.css';

/**
 * Spark Line Charts are used to display data series.
 */
const SparkLineChart = (props) => {
  const areaHeight = 62;
  return (
    <div styleName="container">
      <div styleName="total">
        {!props.loading && props.dataFormat(props.bigNumber)}
      </div>
      <div styleName="chart">
        <Responsive>
          {(parent) => (
            <svg width="100%" height={parent.height} shapeRendering="crispEdges">
              {!props.loading && (
                <SparkLine
                  colors={props.colorScheme.valueGround}
                  dataSeries={props.dataSeries}
                  height={areaHeight}
                  strokeWidth={2}
                  width={parent.width}
                />
              )}
              <TimeXAxis
                from={props.dataSeries.data[0][0]}
                to={props.dataSeries.data.slice(-1)[0].slice(-1)[0]}
                width={parent.width}
                height={areaHeight}
                strokeColor={colorConstants.strokeColor}
                tickLabelColors={[colorConstants.tickLabelColor, colorConstants.tickLabelColorDark]}
                timezone={props.timezone}
                showLabel={!props.loading}
                showTickLabels={false}
                label={props.axisLabel}
                marginBottom={0}
                marginLeft={0}
              />
            </svg>
          )}
        </Responsive>
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
};

SparkLineChart.displayName = 'Spark Line Chart';

SparkLineChart.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  dataSeries: PropTypes.shape({
    data: [],
    label: '',
  }),
  axisLabel: '',
  loading: false,
};

SparkLineChart.propTypes = {
  /**
   * Sets the axis label.
   */
  axisLabel: PropTypes.string,
  /**
   * Sets the big number.
   */
  bigNumber: PropTypes.number.isRequired,
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    valueGround: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the data formatting functions for the graph, consisting of format function for the y-axis and that for the tooltip.
   */
  dataFormat: PropTypes.func.isRequired,
  /**
   * Sets the data series. A data series consists of a label and an array of data. Each data item contains a timestamp and a value.
   */
  dataSeries: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    label: PropTypes.string.isRequired,
  }),
  /**
    * If set, a loader is shown instead of axis tick labels, grid and bars.
    */
  loading: PropTypes.bool,
  /**
   * Sets the timezone for the x-axis.
   */
  timezone: PropTypes.string.isRequired,
};

export default SparkLineChart;
