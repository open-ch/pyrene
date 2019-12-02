import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'pyrene';
import BarChartSVG from './BarChartSVG';
import ChartContainer from '../ChartContainer/ChartContainer';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import Header from '../Header/Header';
import colorSchemes from '../../styles/colorSchemes';

/**
 * Bar Charts are used to display numerical values.
 */
const BarChart = (props) => {
  const header = (
    <Header
      title={props.title}
      description={props.description}
      colors={props.colorScheme.categorical}
      legend={props.legend}
    />
  );
  const chart = (
    <BarChartSVG
      colorScheme={props.colorScheme}
      data={props.data}
      direction={props.direction}
      legend={props.legend}
      loading={props.loading}
      formatter={props.formatter}
    />
  );
  const chartOverlay = (
    <ChartOverlay>
      <Loader type="inline" />
    </ChartOverlay>
  );
  return (
    <ChartContainer
      header={header}
      chart={chart}
      chartOverlay={props.loading && chartOverlay}
    />
  );
};

BarChart.displayName = 'Bar Chart';

BarChart.defaultProps = {
  description: '',
  colorScheme: colorSchemes.colorSchemeDefault,
  direction: 'vertical',
  loading: false,
  formatter: (d) => d,
};

BarChart.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    categorical: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the chart data. Type: [ { label: string (required), values: [number] (required) } ]
   */
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  /**
   * Sets the description.
   */
  description: PropTypes.string,
  /**
   * Sets the bar direction.
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Set function to format the displayed values.
   */
  formatter: PropTypes.func,
  /**
    * Sets the legend. Type: [ string ]
    */
  legend: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
    * If set, a loader is shown instead of axis tick labels, grid and bars.
    */
  loading: PropTypes.bool,
  /**
   * Sets the title.
   */
  title: PropTypes.string.isRequired,
};

export default BarChart;
