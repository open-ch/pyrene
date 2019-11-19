import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'pyrene';
import { SparkLine, TimeXAxis, Responsive } from 'tuktuktwo';
import ChartContainer from '../ChartContainer/ChartContainer';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import colorConstants from '../../styles/colorConstants';
import colorSchemes from '../../styles/colorSchemes';

/**
 * Spark Line Charts are used to display data series.
 */
const SparkLineChart = (props) => {
  const chart = (
    <Responsive>
      {(parent) => {
        return (
          <svg width="100%" height={parent.height} shapeRendering="crispEdges">
            <TimeXAxis
              from={props.dataSeries.data[0][0]}
              to={props.dataSeries.data.slice(-1)[0].slice(-1)[0]}
              width={parent.width}
              height={parent.height}
              strokeColor={colorConstants.strokeColor}
              tickLabelColors={[colorConstants.tickLabelColor, colorConstants.tickLabelColorDark]}
              timezone={props.timezone}
              showTickLabels={false}
            />
            {!props.loading && (
              <SparkLine
                dataSeries={props.dataSeries}
                height={parent.height}
                colors={props.colorScheme.valueGround}
                width={parent.width}
              />
            )}
          </svg>
        );
      }}
    </Responsive>
  );
  const chartOverlay = (
    <ChartOverlay>
      <Loader type="inline" />
    </ChartOverlay>
  );
  return (
    <ChartContainer
      chart={chart}
      chartOverlay={props.loading && chartOverlay}
    />
  );
};

SparkLineChart.displayName = 'Spark Line Chart';

SparkLineChart.defaultProps = {
  description: '',
  colorScheme: colorSchemes.colorSchemeDefault,
  dataSeries: PropTypes.shape({
    data: [],
    label: '',
  }),
  loading: false,
};

SparkLineChart.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    valueGround: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the data series. A data series consists of a label and an array of data. Each data item contains a timestamp and a value.
   */
  dataSeries: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    label: PropTypes.string.isRequired,
  }),
  /**
   * Sets the description.
   */
  description: PropTypes.string,
  /**
    * If set, a loader is shown instead of axis tick labels, grid and bars.
    */
  loading: PropTypes.bool,
  /**
   * Sets the timezone for the x-axis.
   */
  timezone: PropTypes.string.isRequired,
  /**
   * Sets the title.
   */
  title: PropTypes.string.isRequired,
};

export default SparkLineChart;
