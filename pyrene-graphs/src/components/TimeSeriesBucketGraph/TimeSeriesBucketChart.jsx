import React from 'react';
import PropTypes from 'prop-types';
import { colorConstants } from 'pyrene';
import {
  Bar,
  chartConstants,
  localPoint,
  NumericalAxis,
  Responsive,
  scaleUtils,
  TimeSeriesZoomable,
  TimeXAxis,
  withTooltip,
} from 'tuktuktwo';
import ChartArea from '../ChartArea/ChartArea';
import TimeZoomControls from '../TimeZoomControls/TimeZoomControls';
import Tooltip from '../TimeSeries/Tooltip';
import Formats from '../../common/Formats';
import colorSchemes from '../../styles/colorSchemes';
import './timeSeriesBucketGraph.css';

let zoomStartX = null;

/**
 * Get tooltip position and data when mouse is moving over the graph.
 * @param {object}event - The mouseMove event
 * @param {array}data - The data series with timestamp and value
 * @param {function}xScale - The scale function that linearly maps x-coordinate to timestamp in epoch milliseconds
 * @param {function}showTooltip - The function that passes tooltip position and data to the tooltip component
 */
const onMouseMove = (event, data, xScale, showTooltip) => {
  const { x, y } = localPoint(event.target.ownerSVGElement, event);
  const currentTS = xScale(x);

  // Show zoom tooltip
  if (zoomStartX) {
    const startTS = xScale(zoomStartX);
    showTooltip({
      tooltipLeft: x,
      tooltipTop: y - chartConstants.tooltipOffset - chartConstants.zoomTooltipHeight / 2 - 4,
      tooltipData: [startTS, currentTS],
    });
    return;
  }

  // Show normal tooltip
  const foundIndex = data.findIndex((d) => d[0] > currentTS) - 1;
  const index = foundIndex >= 0 ? foundIndex : data.length - 1;
  const timeFrame = index === data.length - 1 ? (data[index][0] - data[index - 1][0]) : (data[index + 1][0] - data[index][0]);
  showTooltip({
    tooltipLeft: x,
    tooltipTop: y,
    tooltipData: [[data[index][0], data[index][0] + timeFrame], data[index][1]],
  });
};

const onMouseDown = (event) => {
  const { x } = localPoint(event.target.ownerSVGElement, event);
  zoomStartX = x;
};

const onMouseUp = (hideTooltip) => {
  zoomStartX = null;
  hideTooltip();
};

/**
 * The pure SVG chart part of the time series bucket graph.
 */
const TimeSeriesBucketChart = (props) => {
  const {
    hideTooltip,
    showTooltip,
    tooltipData,
    tooltipLeft,
    tooltipOpen,
    tooltipTop,
  } = props;

  const dataAvailable = props.dataSeries && props.dataSeries.data && props.dataSeries.data.length > 1;

  if (!dataAvailable) {
    return (
      <Responsive>
        {(parent) => (
          <svg width="100%" height={parent.height} shapeRendering="crispEdges">
            <TimeXAxis
              from={props.from}
              to={props.to}
              width={parent.width}
              height={parent.height}
              strokeColor={colorConstants.neutral050}
              tickLabelColors={[colorConstants.neutral200, colorConstants.neutral300]}
              timezone={props.timezone}
              showTickLabels={false}
            />
            <NumericalAxis
              maxValue={0}
              orientation="left"
              width={parent.width}
              height={parent.height}
              tickFormat={props.dataFormat.yAxis}
              strokeColor={colorConstants.neutral050}
              tickLabelColor={colorConstants.neutral200}
              showTickLabels={false}
              showGrid={false}
            />
          </svg>
        )}
      </Responsive>
    );
  }

  return (
    <div styleName="graphContainer">
      {props.zoom && (
        <div styleName="actionBarContainer">
          <TimeZoomControls
            from={props.from}
            to={props.to}
            lowerBound={props.zoom.lowerBound}
            upperBound={props.zoom.upperBound}
            minZoomRange={props.zoom.minZoomRange}
            onZoom={props.zoom.onZoom}
          />
        </div>
      )}
      <Responsive>
        {(parent) => {
          // Get scale function, time frame, number of bars, max data value, maximum bar height and bar weight
          const xScale = scaleUtils.scaleCustomLinear(chartConstants.marginLeftNumerical, parent.width, props.from, props.to, 'horizontal');
          const numBars = props.dataSeries.data.length;
          const maxValue = Math.max(...props.dataSeries.data.map((data) => data[1]));
          const maxBarSize = Math.max(0, parent.height - chartConstants.marginBottom - chartConstants.marginMaxValueToBorder);
          const barWeight = parent.width > 0 ? ((parent.width - chartConstants.marginLeftNumerical) / numBars - chartConstants.barSpacing) : 0;

          // Get time formatting function for tooltip
          let timeFormat;
          if (zoomStartX) {
            timeFormat = (time) => Formats.explicitTimeRangeFormat(time[0], time[1], props.timezone);
          } else {
            timeFormat = props.timeFormat ? props.timeFormat : (time) => Formats.timeRangeFormat(time[0], time[1], props.timezone, false);
          }

          return (
            <>
              <svg width="100%" height={parent.height} shapeRendering="crispEdges">
                <TimeXAxis
                  from={props.from}
                  to={props.to}
                  width={parent.width}
                  height={parent.height}
                  strokeColor={colorConstants.neutral050}
                  tickLabelColors={[colorConstants.neutral200, colorConstants.neutral300]}
                  showTickLabels={!props.loading}
                  timezone={props.timezone}
                />
                <NumericalAxis
                  maxValue={maxValue}
                  orientation="left"
                  width={parent.width}
                  height={parent.height}
                  tickFormat={props.dataFormat.yAxis}
                  strokeColor={colorConstants.neutral050}
                  tickLabelColor={colorConstants.neutral200}
                  showTickLabels={!props.loading}
                  showGrid={false}
                />
                <g
                  className="hoverArea"
                  onMouseMove={(e) => onMouseMove(e, props.dataSeries.data, xScale, showTooltip)}
                  onMouseOut={hideTooltip}
                  onMouseDown={props.zoom ? (e) => onMouseDown(e) : () => {}}
                  onMouseUp={props.zoom ? () => onMouseUp(hideTooltip) : () => {}}
                  onTouchStart={props.zoom ? (e) => onMouseDown(e) : () => {}}
                  onTouchEnd={props.zoom ? () => onMouseUp(hideTooltip) : () => {}}
                  onTouchMove={(e) => onMouseMove(e, props.dataSeries.data, xScale, showTooltip)}
                >
                  {!props.loading && props.dataSeries.data.length > 0 && (
                    <g transform={`translate(${chartConstants.marginLeftNumerical}, 0)`}>
                      {props.dataSeries.data.map((data, index) => (
                        <Bar key={Math.random()}
                          barWeight={barWeight}
                          color={props.colorScheme.categorical[0]}
                          direction="vertical"
                          value={data[1]}
                          maxValue={maxValue}
                          size={maxBarSize}
                          x={index * (barWeight + chartConstants.barSpacing)}
                          y={chartConstants.marginMaxValueToBorder}
                        />
                      ))}
                    </g>
                  )}
                  {/* ChartArea makes sure the outer <g> element where all mouse event listeners are attached always covers the whole chart area so that there is no tooltip flickering issue */}
                  <ChartArea width={parent.width} height={parent.height} />
                  {props.zoom
                    && (
                      <TimeSeriesZoomable
                        from={props.from}
                        to={props.to}
                        lowerBound={props.zoom.lowerBound}
                        upperBound={props.zoom.upperBound}
                        minZoomRange={props.zoom.minZoomRange}
                        onZoom={props.zoom.onZoom}
                        width={parent.width}
                        height={parent.height}
                        color={colorConstants.neutral500}
                      />
                    )}
                </g>
              </svg>
              {
                tooltipOpen && (
                  <Tooltip
                    dataSeries={zoomStartX ? [] : [{ dataColor: props.colorScheme.categorical[0], dataLabel: props.dataSeries.label, dataValue: props.dataFormat.tooltip(tooltipData[1]) }]}
                    timeFormat={timeFormat} time={zoomStartX ? tooltipData : tooltipData[0]}
                    left={tooltipLeft} top={tooltipTop}
                  />
                )
              }
            </>
          );
        }}
      </Responsive>
    </div>
  );
};

TimeSeriesBucketChart.displayName = 'Time Series Bucket Chart';

TimeSeriesBucketChart.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  dataSeries: {
    data: [],
    label: '',
  },
  loading: false,
  timeFormat: undefined,
  tooltipData: [[0, 0], 0],
  tooltipLeft: 0,
  tooltipTop: 0,
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
   * Sets the starting time point of the time range in epoch milliseconds.
   */
  from: PropTypes.number.isRequired,
  /**
   * The function to hide tooltip provided by the withTooltip enhancer.
   */
  hideTooltip: PropTypes.func.isRequired,
  /**
   * Sets the loading state of the graph.
   */
  loading: PropTypes.bool,
  /**
   * The function to render the proper tooltip provided by the withTooltip enhancer.
   */
  showTooltip: PropTypes.func.isRequired,
  /**
   * Sets the time formatting for the tooltip.
   */
  timeFormat: PropTypes.func,
  /**
   * Sets the timezone for the x-axis.
   */
  timezone: PropTypes.string.isRequired,
  /**
   * Sets the ending point of the time range in epoch milliseconds.
   */
  to: PropTypes.number.isRequired,
  /**
   * The tooltip data prop provided by the withTooltip enhancer.
   */
  tooltipData: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]).isRequired),
  /**
   * The tooltip x-position prop provided by the withTooltip enhancer.
   */
  tooltipLeft: PropTypes.number,
  /**
   * The prop provided by the withTooltip enhancer to decide whether to show the tooltip or not.
   */
  tooltipOpen: PropTypes.bool.isRequired,
  /**
   * The tooltip y-position prop provided by the withTooltip enhancer.
   */
  tooltipTop: PropTypes.number,
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
     * Sets the upper bound for the zoom component - provided that the graph is a zoomable one, i.e. no zoom-out action is allowed when upper bound is reached.
     */
    upperBound: PropTypes.number.isRequired,
  }),
};

export default withTooltip(TimeSeriesBucketChart);
