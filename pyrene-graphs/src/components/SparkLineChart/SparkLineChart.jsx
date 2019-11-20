import React from 'react';
import PropTypes from 'prop-types';
import { SparkLine, TimeXAxis, Responsive } from 'tuktuktwo';
import colorConstants from '../../styles/colorConstants';
import colorSchemes from '../../styles/colorSchemes';
import './sparkLineChart.css';

/**
 * Spark Line Charts are used to display data series.
 */
const SparkLineChart = (props) => {
  const chartHeight = 26;
  return (
    <div styleName="container">
      <div styleName="total">
        {!props.loading && props.dataFormat(props.dataSeries.data.map((d) => d[1]).reduce((a, b) => a + b))}
      </div>
      <div styleName="chart">
        <Responsive>
          {(parent) => (
            <svg width="100%" height={parent.height} shapeRendering="crispEdges">
              <TimeXAxis
                from={props.dataSeries.data[0][0]}
                to={props.dataSeries.data.slice(-1)[0].slice(-1)[0]}
                width={parent.width}
                height={chartHeight}
                strokeColor={colorConstants.strokeColor}
                tickLabelColors={[colorConstants.tickLabelColor, colorConstants.tickLabelColorDark]}
                timezone={props.timezone}
                showLabel={!props.loading}
                showTickLabels={false}
                label={props.label}
                marginBottom={0}
                marginLeft={0}
              />
              {!props.loading && (
                <SparkLine
                  dataSeries={props.dataSeries}
                  height={chartHeight}
                  gradient={{
                    fromOpacity: 0.58,
                    toOpacity: 0.1,
                    fromColor: props.colorScheme.gradient[0],
                    toColor: props.colorScheme.gradient[1],
                  }}
                  width={parent.width}
                />
              )}
            </svg>
          )}
        </Responsive>
      </div>
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
  label: '',
  loading: false,
};

SparkLineChart.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    gradient: PropTypes.arrayOf(PropTypes.string).isRequired,
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
   * Sets the axis label.
   */
  label: PropTypes.string,
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
