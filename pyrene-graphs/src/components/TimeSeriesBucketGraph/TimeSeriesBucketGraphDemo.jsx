import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';
import TimeSeriesBucketGraph from './TimeSeriesBucketGraph';
import colorSchemes from '../../styles/colorSchemes';

/**
 * A Demo graph for TimeSeriesBucketGraph. Only for demon use in kitchensink.
 */
class TimeSeriesBucketGraphDemo extends React.Component {

  static yUnit = 'B';

  render() {
    const {
      colorScheme,
      dataSeries,
      description,
      error,
      initialFrom,
      loading,
      timezone,
      title,
      initialTo,
      zoom,
    } = this.props;

    const dataFormat = {
      tooltip: (num) => {
        const formattedNum = `${format('~s')(num)}`;
        if (num > 0.001 && num < 1000) {
          return `${parseFloat(formattedNum).toFixed(2)} ${TimeSeriesBucketGraphDemo.yUnit}`;
        }
        return `${parseFloat(formattedNum.substring(0, formattedNum.length - 2)).toFixed(2)} ${formattedNum.substring(formattedNum.length - 1, formattedNum.length)}${TimeSeriesBucketGraphDemo.yUnit}`;
      },
      yAxis: (num) => parseFloat(Math.round(num * 100) / 100).toFixed(0),
    };

    return (
      <TimeSeriesBucketGraph
        colorScheme={colorScheme}
        dataFormat={dataFormat}
        dataSeries={dataSeries}
        description={description}
        error={error}
        from={initialFrom}
        loading={loading}
        timezone={timezone}
        title={title}
        to={initialTo}
        zoom={zoom}
      />
    );

  }
}

TimeSeriesBucketGraphDemo.displayName = 'Time Series Bucket Graph Demo';

TimeSeriesBucketGraphDemo.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  dataSeries: PropTypes.shape({
    data: [],
    label: '',
  }),
  description: '',
  error: 'No data available',
  loading: false,
  title: '',
  zoom: undefined,
};

TimeSeriesBucketGraphDemo.propTypes = {
  /**
   * Sets the color scheme of the bars.
   */
  colorScheme: PropTypes.shape({
    categorical: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
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
  initialFrom: PropTypes.number.isRequired,
  /**
   * Sets the ending point of the time range in epoch milliseconds.
   */
  initialTo: PropTypes.number.isRequired,
  /**
   * Sets the loading state of the graph.
   */
  loading: PropTypes.bool,
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
   * If set, this graph supports zoom.
   */
  zoom: PropTypes.shape({
    /**
     * Sets the lower bound of the zoom component - provided that this graph is a zoomable one, i.e. no more zoom-out is possible when lower bound is reached.
     */
    lowerBound: PropTypes.number.isRequired,
    /**
     * Sets the minimum allowed zoom range - provided that this graph is a zoomable one, i.e. no more zoom-in is possible when minZoomRange is already reached.
     */
    minZoomRange: PropTypes.number.isRequired,
    /**
     * Sets the callback function when a zoom action finishes. No onZoom function means this graph does not support zoom.
     */
    onZoom: PropTypes.func.isRequired,
    /**
     * Sets the time formatting function for the zoom range.
     */
    timeFormat: PropTypes.func,
    /**
     * Sets the upper bound for the zoom component - provided that the graph is a zoomable one, i.e. no zoom-out action is allowed when upper bound is reached.
     */
    upperBound: PropTypes.number.isRequired,
  }),
};

export default TimeSeriesBucketGraphDemo;
