import React from 'react';
import PropTypes from 'prop-types';
import { Banner, Loader } from 'pyrene';
import { format } from 'd3-format';
import ChartContainer from '../ChartContainer/ChartContainer';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import Header from '../Header/Header';
import TimeSeriesBucketChart from './TimeSeriesBucketChart';
import colorSchemes from '../../styles/colorSchemes';
import './timeSeriesBucketGraph.css';

/**
 * A bucket graph for time-data series.
 */
const TimeSeriesBucketGraph = (props) => {
  const dataAvailable = props.dataSeries && props.dataSeries.data && props.dataSeries.data.length > 1;

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
      {!props.loading && !dataAvailable && (
        <div styleName="errorBanner">
          <Banner styling="inline" type="error" label={props.error} />
        </div>
      )}
    </ChartOverlay>
  );

  // Render the bucket chart
  const bucketChart = (
    <TimeSeriesBucketChart
      colorScheme={props.colorScheme}
      dataFormat={props.dataFormat}
      dataSeries={props.dataSeries}
      from={props.from}
      to={props.to}
      loading={props.loading}
      onZoom={props.onZoom}
      timezone={props.timezone}
      timeFormat={props.timeFormat}
    />
  );

  // Render the component
  const showOverlay = props.loading || !dataAvailable;
  return (
    <ChartContainer
      header={header}
      chart={bucketChart}
      chartOverlay={showOverlay && chartOverlay}
    />
  );
};

TimeSeriesBucketGraph.displayName = 'Time Series Bucket Graph';

TimeSeriesBucketGraph.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  dataSeries: PropTypes.shape({
    data: [],
    label: '',
  }),
  description: '',
  error: 'No data available',
  loading: false,
  lowerBound: 0,
  minZoomRange: 0,
  onZoom: undefined,
  title: '',
  upperBound: 0,
};

TimeSeriesBucketGraph.propTypes = {
  /**
   * Sets the color scheme of the bars.
   */
  colorScheme: PropTypes.shape({
    categorical: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the data formatting functions for the graph, consisting of format function for the y-axis and that for the tooltip.
   */
  dataFormat: PropTypes.shape({
    tooltip: PropTypes.func,
    yAxis: PropTypes.func,
  }).isRequired,
  /**
   * Sets the data series. A data series consists of a label and an array of data. Each data item contains a timestamp and a value.
   */
  dataSeries: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    label: PropTypes.string.isRequired,
  }),
  /**
   * Sets the description of the graph excluding the unit part.
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
   * Sets the loading state of the graph.
   */
  loading: PropTypes.bool,
  /**
   * Sets the lower bound of the zoom component - provided that this graph is a zoomable one, i.e. no more zoom-out is possible when lower bound is reached.
   */
  lowerBound: PropTypes.number,
  /**
   * Sets the minimum allowed zoom range - provided that this graph is a zoomable one, i.e. no more zoom-in is possible when minZoomRange is already reached.
   */
  minZoomRange: PropTypes.number,
  /**
   * Sets the callback function when a zoom action finishes. No onZoom function means this graph does not support zoom.
   */
  onZoom: PropTypes.func,
  /**
   * Sets the time formatting functions, including the formatting function for ordinary tooltip and that for the zoom tooltip.
   */
  timeFormat: PropTypes.shape({
    tooltip: PropTypes.func.isRequired,
    zoomTooltip: PropTypes.func,
  }).isRequired,
  /**
   * Sets the timezone for the x-axis alone.
   * The timezone for tooltip comes from the render function provided by parent page.
   */
  timezone: PropTypes.string.isRequired,
  /**
   * Sets the title of the graph.
   */
  title: PropTypes.string,
  /**
   * Sets the ending point of the time range in epoch milliseconds.
   */
  to: PropTypes.number.isRequired,
  /**
   * Sets the upper bound for the zoom component - provided that the graph is a zoomable one, i.e. no zoom-out action is allowed when upper bound is reached.
   */
  upperBound: PropTypes.number,
  /**
   * Sets the unit for the data.
   */
  yUnit: PropTypes.string.isRequired,
};

export default TimeSeriesBucketGraph;
