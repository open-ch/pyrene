import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'pyrene';
import {
  Bar, NumericalAxis, Responsive, TimeXAxis,
} from 'tuktuktwo';
import colorConstants from 'pyrene/src/styles/colorConstants';
import ChartContainer from '../ChartContainer/ChartContainer';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import Header from '../Header/Header';
import './timeSeriesBucketGraph.css';
import colorSchemes from '../../styles/colorSchemes';


const MARGIN_LEFT = 36;
const MARGIN_BOTTOM = 24;
const MARGIN_TOP = 16;
const BAR_SPACING = 3;

/**
 * A bucket graph for time-based data series.
 */
const TimeSeriesBucketGraph = (props) => {
  const maxValue = Math.max(...props.dataSeries.map(data => data[1]));

  // Render the header
  const header = (
    <Header
      header={props.title}
      description={props.description}
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

  // Render the bar chart
  const bucketChart = (
    <Responsive>
      {(parent) => {
        const numBars = props.dataSeries.length;
        const barWeight = parent.width > 0 ? ((parent.width - MARGIN_LEFT) / numBars - BAR_SPACING) : 0;

        return (
          <svg width="100%" height={parent.height} shapeRendering="crispEdges">
            <TimeXAxis
              from={props.from}
              to={props.to}
              width={parent.width}
              height={parent.height}
              showTickLabels={!props.loading}
              timezone={props.timezone}
              strokeColor={colorConstants.neutral050}
              tickLabelColors={[colorConstants.neutral200, colorConstants.neutral300]}
            />
            <NumericalAxis
              maxValue={maxValue}
              orientation="left"
              parentSize={parent}
              showGrid={false}
              showTickLabels={!props.loading}
              strokeColor={colorConstants.neutral050}
              tickLabelColor={colorConstants.neutral200}
              tickFormat={props.dataFormat}
            />
            {!props.loading && props.dataSeries.length > 0 && (
              <g>
                {props.dataSeries.map((data, index) => (
                  <Bar key={Math.random()}
                    barWeight={barWeight}
                    color={props.colorScheme.categorical[0]}
                    direction="vertical"
                    value={data[1]}
                    maxValue={maxValue}
                    size={parent.height > 0 ? (parent.height - MARGIN_BOTTOM - MARGIN_TOP) : 0}
                    x={MARGIN_LEFT + index * (barWeight + BAR_SPACING)}
                    y={MARGIN_TOP}
                  />
                ))}
              </g>
            )}
          </svg>
        );
      }}
    </Responsive>
  );

  // Render the component
  const showOverlay = props.loading || props.errorMessage.length > 0 || props.errorMessageNoData.length > 0;
  return (
    <ChartContainer
      header={header}
      chart={bucketChart}
      chartOverlay={showOverlay && chartOverlay}
    />
  );
};

TimeSeriesBucketGraph.displayName = 'TimeSeriesBucketGraph';

TimeSeriesBucketGraph.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  dataFormat: d => d,
  description: '',
  errorMessage: '',
  errorMessageNoData: '',
  loading: false,
  onZoom: () => {},
  title: '',
};

TimeSeriesBucketGraph.propTypes = {
  colorScheme: PropTypes.shape({
    categorical: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  dataFormat: PropTypes.func,
  dataSeries: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  description: PropTypes.string,
  errorMessage: PropTypes.string,
  errorMessageNoData: PropTypes.string,
  from: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onZoom: PropTypes.func,
  timezone: PropTypes.string.isRequired,
  title: PropTypes.string,
  to: PropTypes.number.isRequired,
  yUnit: PropTypes.string.isRequired,
};

export default TimeSeriesBucketGraph;
