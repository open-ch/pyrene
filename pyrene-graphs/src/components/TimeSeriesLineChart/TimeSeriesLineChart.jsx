import React from 'react';
import PropTypes from 'prop-types';
import { Banner, Loader } from 'pyrene';
import ChartContainer from '../ChartContainer/ChartContainer';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import Header from '../Header/Header';
import TimeSeriesLineChartSVG from './TimeSeriesLineChartSVG';
import colorSchemes from '../../styles/colorSchemes';
import './timeSeriesLineChart.css';
import { getDataInTimeRange } from '../../common/dataUtils';

/**
 * A line chart for time-data series.
 */
export default class TimeSeriesLineChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataDeselected: this.props.data.map((d) => (d.deselected)),
    };
  }

  toggleLegendItem = (index) => {
    this.setState((prevState) => ({
      dataDeselected: prevState.dataDeselected.map((d, i) => (i === index ? !d : d)),
    }));
  };

  render() {
    const dataInRange = getDataInTimeRange(this.props.data, this.props.from, this.props.to);
    const hasDataInRange = dataInRange.find((ds) => ds.data.length > 0);

    // Render the header
    const header = (
      <Header
        title={this.props.title}
        description={this.props.description}
        legend={!this.props.loading ? this.state.dataDeselected.map((d, i) => ({
          color: this.props.colorScheme.categorical[i],
          deselected: d,
          label: this.props.data[i].label,
        })) : []}
        legendToggleCallback={(index) => this.toggleLegendItem(index)}
      />
    );

    // Render the overlay
    const chartOverlay = (
      <ChartOverlay>
        {this.props.loading && <Loader type="inline" />}
        {!this.props.loading && !hasDataInRange && (
          <div styleName="errorBanner">
            <Banner styling="inline" type="error" label={this.props.error} />
          </div>
        )}
      </ChartOverlay>
    );

    // Render the line chart
    const lineChart = (
      <TimeSeriesLineChartSVG
        data={dataInRange.map((d, i) => ({
          color: this.props.colorScheme.categorical[i],
          data: d.data,
          label: d.label,
        })).filter((_, i) => !this.state.dataDeselected[i])}
        from={this.props.from}
        to={this.props.to}
        loading={this.props.loading}
        tickFormat={this.props.tickFormat}
        timezone={this.props.timezone}
        timeFormat={this.props.timeFormat}
        tooltipFormat={this.props.tooltipFormat}
      />
    );

    const showOverlay = this.props.loading || !hasDataInRange;
    return (
      <ChartContainer
        header={header}
        chart={lineChart}
        chartOverlay={showOverlay && chartOverlay}
        chartUnit={this.props.unit}
      />
    );
  }

}

TimeSeriesLineChart.displayName = 'Time Series Line Chart';

TimeSeriesLineChart.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  data: [],
  description: '',
  error: 'No data available',
  loading: false,
  tickFormat: (d) => d,
  timeFormat: undefined,
  title: '',
  tooltipFormat: (d) => d,
  unit: '',
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
   * Sets the formatting function for the ticks on the y axis.
   */
  tickFormat: PropTypes.func,
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
  /**
   * Sets the data formatting function for the tooltip.
   */
  tooltipFormat: PropTypes.func,
  /**
   * Sets the unit of the chart, if there is any.
   */
  unit: PropTypes.string,
};
