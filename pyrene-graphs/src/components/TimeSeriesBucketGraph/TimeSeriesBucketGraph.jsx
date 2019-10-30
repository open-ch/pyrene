import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'pyrene';
import ChartContainer from '../ChartContainer/ChartContainer';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import Header from '../Header/Header';
import TimeSeriesBucketChart from './TimeSeriesBucketChart';
import Formats from '../../common/Formats';
import colorSchemes from '../../styles/colorSchemes';
import './timeSeriesBucketGraph.css';

/**
 * A bucket graph for time-data series.
 */
const TimeSeriesBucketGraph = (props) => {
  // Render the header
  const maxValue = Math.max(...props.dataSeries.data.map((data) => data[1]));
  const descriptionWithUnit = `${props.description} in ${Formats.getSIPrefixAndScale(maxValue).prefix}${props.yUnit}`;
  const header = (
    <Header
      title={props.title}
      description={descriptionWithUnit}
    />
  );

  // Render the overlay
  const chartOverlay = (
    <ChartOverlay>
      {props.loading && <Loader type="inline" />}
      {!props.loading && props.errorMessage.length > 0 && <div>{props.errorMessage}</div>}
      {!props.loading && props.errorMessageNoData.length > 0 && <div>{props.errorMessageNoData}</div>}
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
  const showOverlay = props.loading || props.errorMessage.length > 0 || props.errorMessageNoData.length > 0;
  return (
    <ChartContainer
      header={header}
      chart={!showOverlay && bucketChart}
      chartOverlay={showOverlay && chartOverlay}
    />
  );
};

TimeSeriesBucketGraph.displayName = 'TimeSeriesBucketGraph';

TimeSeriesBucketGraph.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  dataSeries: PropTypes.shape({
    data: [],
    label: '',
  }),
  description: '',
  errorMessage: '',
  errorMessageNoData: '',
  loading: false,
  onZoom: undefined,
  title: '',
};

TimeSeriesBucketGraph.propTypes = {
  colorScheme: PropTypes.shape({
    categorical: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  dataFormat: PropTypes.shape({
    tooltip: PropTypes.func,
    yAxis: PropTypes.func,
  }).isRequired,
  dataSeries: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    label: PropTypes.string.isRequired,
  }),
  description: PropTypes.string,
  errorMessage: PropTypes.string,
  errorMessageNoData: PropTypes.string,
  from: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onZoom: PropTypes.func,
  timeFormat: PropTypes.shape({
    tooltip: PropTypes.func.isRequired,
    zoomTooltip: PropTypes.func,
  }).isRequired,
  timezone: PropTypes.string.isRequired,
  title: PropTypes.string,
  to: PropTypes.number.isRequired,
  yUnit: PropTypes.string.isRequired,
};

export default TimeSeriesBucketGraph;
