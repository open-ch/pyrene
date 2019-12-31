import React from 'react';
import PropTypes from 'prop-types';
import { Banner, Loader } from 'pyrene';
import ChartContainer from '../ChartContainer/ChartContainer';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import Header from '../Header/Header';
import TimeSeriesLineChartSVG from './TimeSeriesLineChartSVG';
import colorSchemes from '../../styles/colorSchemes';
import './timeSeriesLineChart.css';

/**
 * A line chart for time-data series.
 */
export default class TimeSeriesLineChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
    };
  }

  toggleLegendItem = (index) => {
    this.setState((prevState) => ({
      data: prevState.data.map((d, i) => (i === index ? {
        ...d,
        deselected: !d.deselected,
      } : d)),
    }));
  }

  render() {
    const dataAvailable = this.props.data && this.props.data[0] && this.props.data[0].data && this.props.data[0].data.length > 0;

    // Render the header
    const header = (
      <Header
        title={this.props.title}
        description={this.props.description}
        legend={!this.props.loading ? this.state.data.map((d, i) => ({
          color: this.props.colorScheme.categorical[i],
          deselected: d.deselected,
          label: d.label,
        })) : []}
        legendToggleCallback={(index) => this.toggleLegendItem(index)}
      />
    );

    // Render the overlay
    const chartOverlay = (
      <ChartOverlay>
        {this.props.loading && <Loader type="inline" />}
        {!this.props.loading && !dataAvailable && (
          <div styleName="errorBanner">
            <Banner styling="inline" type="error" label={this.props.error} />
          </div>
        )}
      </ChartOverlay>
    );

    // Render the line chart
    const lineChart = (
      <TimeSeriesLineChartSVG
        data={this.state.data.map((d, i) => ({
          ...d,
          color: this.props.colorScheme.categorical[i],
        })).filter((d) => !d.deselected)}
        dataFormat={this.props.dataFormat}
        from={this.props.from}
        to={this.props.to}
        loading={this.props.loading}
        timezone={this.props.timezone}
        timeFormat={this.props.timeFormat}
      />
    );

    const showOverlay = this.props.loading || !dataAvailable;
    return (
      <ChartContainer
        header={header}
        chart={lineChart}
        chartOverlay={showOverlay && chartOverlay}
      />
    );
  }
  
}

TimeSeriesLineChart.displayName = 'Time Series Line Chart';

TimeSeriesLineChart.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  data: [],
  dataFormat: {
    tooltip: (d) => d,
    yAxis: (d) => d,
  },
  description: '',
  error: 'No data available',
  loading: false,
  timeFormat: undefined,
  title: '',
};

TimeSeriesLineChart.propTypes = {
  /**
   * Sets the color scheme of the bars.
   */
  colorScheme: PropTypes.shape({
    categorical: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the data series. A data series consists of an array of objects, which consist of a label and an array of data. Each data item contains a timestamp and a value.
   */
  data: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    deselected: PropTypes.bool,
    label: PropTypes.string.isRequired,
  })),
  /**
   * Sets the data formatting functions for the chart, consisting of format function for the y-axis and that for the tooltip.
   */
  dataFormat: PropTypes.shape({
    tooltip: PropTypes.func,
    yAxis: PropTypes.func,
  }),
  /**
   * Sets the description of the chart excluding the unit part.
   */
  description: PropTypes.string,
  /**
   * Sets the error message.
   */
  error: PropTypes.string,
  /**
   * Sets the starting time point of the time range in epoch milliseconds.
   */
  from: PropTypes.number.isRequired,
  /**
   * Sets the loading state of the chart.
   */
  loading: PropTypes.bool,
  /**
   * Sets the time formatting function for the tooltip.
   */
  timeFormat: PropTypes.func,
  /**
   * Sets the timezone for the x-axis alone.
   * The timezone for tooltip comes from the render function provided by parent page.
   */
  timezone: PropTypes.string.isRequired,
  /**
   * Sets the title of the chart.
   */
  title: PropTypes.string,
  /**
   * Sets the ending point of the time range in epoch milliseconds.
   */
  to: PropTypes.number.isRequired,
};
