import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'pyrene';
import { NumericalAxis, SparkLine, Responsive } from 'tuktuktwo';
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
      {!props.loading && (
        <div styleName="keyFigure">
          {props.keyFigure}
        </div>
      )}
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
              <NumericalAxis
                width={parent.width}
                height={areaHeight}
                strokeColor={colorConstants.strokeColor}
                tickLabelColor={colorConstants.tickLabelColor}
                showTickLabels={false}
                showGrid={false}
                label={props.axisLabel}
                marginBottom={0}
                left={0}
                maxValue={0}
                orientation="bottom"
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
  axisLabel: '',
  colorScheme: colorSchemes.colorSchemeDefault,
  keyFigure: '',
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
    valueGround: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the data series as an array of data. Each data item contains a timestamp and a value.
   */
  dataSeries: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
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
