import React from 'react';
import PropTypes from 'prop-types';
import { Banner, Loader } from 'pyrene';
import BarChartSVG from './BarChartSVG';
import ChartContainer from '../ChartContainer/ChartContainer';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import Header from '../Header/Header';
import colorSchemes from '../../styles/colorSchemes';

/**
 * Bar Charts are used to display numerical values.
 */
const BarChart = (props) => {
  const dataAvailable = props.data && props.data.length > 0 && props.data[0].data && props.data[0].data.length > 0;

  const header = (
    <Header
      title={props.title}
      description={props.description}
      colors={props.colorScheme.categorical}
      legend={props.legend.map((d, i) => ({
        color: props.colorScheme.categorical[i],
        label: d,
      }))}
    />
  );
  const chart = dataAvailable && (
    <BarChartSVG
      colorScheme={props.colorScheme}
      data={props.data}
      direction={props.direction}
      legend={props.legend}
      loading={props.loading}
      tickFormat={props.axis.format}
      tooltipFormat={props.tooltipFormat}
    />
  );
  const chartOverlay = (
    <ChartOverlay>
      {props.loading && <Loader type="inline" />}
      {!props.loading && !dataAvailable && (
        <div>
          <Banner styling="inline" type="error" label={props.error} />
        </div>
      )}
    </ChartOverlay>
  );
  const showOverlay = props.loading || !dataAvailable;
  return (
    <ChartContainer
      header={header}
      chart={chart}
      chartOverlay={showOverlay && chartOverlay}
      chartUnit={props.axis.unit}
    />
  );
};

BarChart.displayName = 'Bar Chart';

BarChart.defaultProps = {
  axis: {
    format: (d) => d,
    unit: '',
  },
  colorScheme: colorSchemes.colorSchemeDefault,
  description: '',
  direction: 'vertical',
  error: 'No data available',
  loading: false,
  tooltipFormat: (d) => d,
};

BarChart.propTypes = {
  /**
   * Sets the data formatting function fo the ticks on y axis and the unit of the chart.
   */
  axis: PropTypes.shape({
    format: PropTypes.func,
    unit: PropTypes.string,
  }),
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    categorical: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the chart data. Type: [ { label: string (required), data: [number] (required) } ]
   */
  data: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    label: PropTypes.string.isRequired,
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
   * Sets the error message.
   */
  error: PropTypes.string,
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
  /**
   * Sets the data formatting function for the tooltip.
   */
  tooltipFormat: PropTypes.func,
};

export default BarChart;
