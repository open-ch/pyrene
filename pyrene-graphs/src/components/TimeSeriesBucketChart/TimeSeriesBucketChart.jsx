import React from 'react';
import PropTypes from 'prop-types';
import { Banner, Loader } from '@osag/pyrene';
import ChartContainer from '../ChartContainer/ChartContainer';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import Header from '../Header/Header';
import TimeSeriesBucketChartSVG from './TimeSeriesBucketChartSVG';
import { getMaxValueForTimeRangeBucket } from '../../common/dataUtils';
import colorSchemes from '../../styles/colorSchemes';
import './timeSeriesBucketChart.css';

/**
 * A bucket chart for time-data series.
 */
const TimeSeriesBucketChart = (props) => {
  // Get max value of the data within time range
  const maxValue = getMaxValueForTimeRangeBucket(props.data, props.from, props.to);

  // Render the header
  const header = (
    <Header
      title={props.title}
      description={props.description}
    />
  );

  // Render the overlay
  const chartOverlay = (
    <ChartOverlay>
      {props.loading && <Loader type="inline" />}
      {!props.loading && !maxValue && (
        <div styleName="errorBanner">
          <Banner styling="inline" type="error" label={props.error} />
        </div>
      )}
    </ChartOverlay>
  );

  // Render the bucket chart
  const bucketChart = (
    <TimeSeriesBucketChartSVG
      colorScheme={props.colorScheme}
      data={props.data}
      from={props.from}
      to={props.to}
      loading={props.loading}
      maxValue={maxValue}
      tickFormat={props.tickFormat}
      timezone={props.timezone}
      timeFormat={props.timeFormat}
      tooltipFormat={props.tooltipFormat}
      zoom={props.zoom}
    />
  );

  // Render the component
  const showOverlay = props.loading || !maxValue;
  return (
    <ChartContainer
      header={header}
      chart={bucketChart}
      chartOverlay={showOverlay && chartOverlay}
      chartUnit={props.unit}
    />
  );
};

TimeSeriesBucketChart.displayName = 'Time Series Bucket Chart';

TimeSeriesBucketChart.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  data: PropTypes.shape({
    data: [],
    label: '',
  }),
  description: '',
  error: 'No data available',
  loading: false,
  tickFormat: (d) => d,
  timeFormat: undefined,
  title: '',
  tooltipFormat: (d) => d,
  unit: '',
  zoom: undefined,
};

TimeSeriesBucketChart.propTypes = {
  /**
   * Sets the color scheme of the bars.
   */
  colorScheme: PropTypes.shape({
    categorical: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the data series. A data series consists of a label and an array of data. Each data item contains a timestamp and a value.
   */
  data: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    label: PropTypes.string.isRequired,
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
  /**
   * If set, this chart supports zoom.
   */
  zoom: PropTypes.shape({
    /**
     * Sets the lower bound of the zoom component - provided that this chart is a zoomable one, i.e. no more zoom-out is possible when lower bound is reached.
     */
    lowerBound: PropTypes.number.isRequired,
    /**
     * Sets the minimum allowed zoom range - provided that this chart is a zoomable one, i.e. no more zoom-in is possible when minZoomRange is already reached.
     */
    minZoomRange: PropTypes.number.isRequired,
    /**
     * Sets the callback function when a zoom action finishes. No onZoom function means this chart does not support zoom.
     */
    onZoom: PropTypes.func.isRequired,
    /**
     * Sets the upper bound for the zoom component - provided that the chart is a zoomable one, i.e. no zoom-out action is allowed when upper bound is reached.
     */
    upperBound: PropTypes.number.isRequired,
  }),
};

export default TimeSeriesBucketChart;
