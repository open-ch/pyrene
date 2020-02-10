import React from 'react';
import PropTypes from 'prop-types';
import {
  Bars,
  chartConstants,
  localPoint,
  NumericalAxis,
  Responsive,
  scaleTime,
  scaleValueAxis,
  scaleValueInBounds,
  TimeSeriesZoomable,
  TimeXAxis,
  withTooltip,
} from 'tuktuktwo';
import ChartArea from '../ChartArea/ChartArea';
import TimeZoomControls from '../TimeZoomControls/TimeZoomControls';
import Tooltip from '../Tooltip/Tooltip';
import { explicitTimeRangeFormat, timeRangeFormat } from '../../common/Formats';
import { INDEX_VALUE, INDEX_START_TS } from '../../common/chartConstants';
import colorSchemes from '../../styles/colorSchemes';
import colorConstants from '../../styles/colorConstants';
import './timeSeriesBucketChart.css';

let zoomStartX = null;

const getTimeFrameOfLastBucket = (data, xScale) => {
  if (data.length === 0) {
    return 0;
  }
  if (data.length === 1) {
    return xScale.invert(chartConstants.marginLeftNumerical + chartConstants.barWeight + chartConstants.barSpacing) - xScale.domain()[0];
  }
  return data[data.length - 1][INDEX_START_TS] - data[data.length - 2][INDEX_START_TS];
};

const getCurrentBucketIndex = (currentTS, lastBucketEndTS, data) => {
  if (data.length === 1) {
    return currentTS <= lastBucketEndTS;
  }
  // localPoint enables us to have the real-time x-coordinate of the mouse; by using the scale function on the x-coordinate we get a corresponding timestamp;
  // then, we go through the data series to find the first element with a startTS that's bigger than that timestamp, the element before it is the one that is being hovered on
  const foundIndex = data.findIndex((d) => d[INDEX_START_TS] > currentTS) - 1;
  return foundIndex >= 0 ? foundIndex : data.length - 1;
};

const getCurrentBucketEndTS = (index, lastBucketEndTS, data) => {
  if (data.length === 1) {
    return lastBucketEndTS;
  }
  // For the last bucket, we assume the time frame is the same as the previous bucket
  return (index !== data.length - 1)
    ? data[index + 1][INDEX_START_TS]
    : (data[index][INDEX_START_TS] - data[index - 1][INDEX_START_TS] + data[index][INDEX_START_TS]);
};

/**
 * Get tooltip position and data when mouse is moving over the chart.
 * @param {object}event - The mouseMove event
 * @param {array}data - The data series with timestamp and value
 * @param {function}xScale - The scale function that linearly maps x-coordinate to timestamp in epoch milliseconds
 * @param {function}showTooltip - The function that passes tooltip position and data to the tooltip component
 * @param {function}hideTooltip - The function that hides the tooltip
 */
const onMouseMove = (event, data, xScale, showTooltip, hideTooltip) => {
  // Immediately hide tooltip and return when there's no data
  if (!data || data.length === 0) {
    hideTooltip();
    return;
  }

  const { x, y } = localPoint(event.target.ownerSVGElement, event);
  const currentTS = xScale.invert(x).valueOf();

  // Show zoom tooltip
  if (zoomStartX) {
    const startTS = xScale.invert(zoomStartX).valueOf();
    showTooltip({
      tooltipLeft: x,
      tooltipTop: y - chartConstants.tooltipOffset - chartConstants.zoomTooltipHeight / 2 - 4,
      tooltipData: [startTS, currentTS],
    });
    return;
  }

  // Hide tooltip when cursor is out of data range
  const lastBucketEndTS = data[data.length - 1][INDEX_START_TS] + getTimeFrameOfLastBucket(data, xScale);
  if (currentTS > lastBucketEndTS || currentTS < data[0][INDEX_START_TS]) {
    hideTooltip();
    return;
  }

  // Show normal tooltip
  const currentBucketIndex = getCurrentBucketIndex(currentTS, lastBucketEndTS, data);
  const currentBucketEndTS = getCurrentBucketEndTS(currentBucketIndex, lastBucketEndTS, data);
  showTooltip({
    tooltipLeft: x,
    tooltipTop: y,
    tooltipData: [[data[currentBucketIndex][INDEX_START_TS], currentBucketEndTS], data[currentBucketIndex][INDEX_VALUE], currentBucketIndex],
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

const getTimeFormat = (timezone, timeFormat) => {
  if (zoomStartX) {
    return (time) => explicitTimeRangeFormat(time[0], time[1], timezone);
  }
  return timeFormat || ((time) => timeRangeFormat(time[0], time[1], timezone, false));
};

/**
 * The pure SVG chart part of the time series bucket chart.
 */
const TimeSeriesBucketChartSVG = (props) => {
  const {
    hideTooltip,
    showTooltip,
    tooltipData,
    tooltipLeft,
    tooltipOpen,
    tooltipTop,
  } = props;

  return (
    <div styleName="chartContainer">
      {props.zoom && (
        <div styleName="actionBarContainer">
          <TimeZoomControls
            from={props.from}
            to={props.to}
            disabled={props.loading}
            zoomInDisabled={!props.maxValue}
            lowerBound={props.zoom.lowerBound}
            upperBound={props.zoom.upperBound}
            minZoomRange={props.zoom.minZoomRange}
            onZoom={props.zoom.onZoom}
          />
        </div>
      )}
      <Responsive>
        {(parent) => {
          // Get scale function
          const xScale = scaleTime(props.from, props.to, chartConstants.marginLeftNumerical, parent.width, 'horizontal');
          const valueScale = scaleValueInBounds(parent, props.maxValue ? props.maxValue : 0, 'vertical');
          const valueAxisScale = scaleValueAxis(parent, props.maxValue ? props.maxValue : 0, 'vertical');

          const barWeightFunction = (index, labels) => {
            // If there is a single bucket, just use a default bar weight
            if (labels.length === 1) {
              return chartConstants.barWeight;
            // If it is the last bucket, we do not know its endTS, just use the bar weight of the second last bucket
            }
            if (index === labels.length - 1) {
              return barWeightFunction(index - 1, labels);
            }
            // Calculate the bar weight by applying the scale function on the current time frame defined by the time difference between current startTS and next startTS
            const timeFrame = labels[index + 1] - labels[index];
            return xScale(props.from + timeFrame) - chartConstants.marginLeftNumerical - chartConstants.barSpacing;
          };
          let highlightSection;
          if (tooltipOpen && !zoomStartX) {
            highlightSection = {
              startOffset: tooltipData[2],
              endOffset: tooltipData[2],
            };
          }

          return (
            <>
              <svg width="100%" height={parent.height} shapeRendering="crispEdges">
                <TimeXAxis
                  from={props.from}
                  to={props.to}
                  width={parent.width}
                  height={parent.height}
                  strokeColor={colorConstants.strokeColor}
                  tickLabelColors={[colorConstants.tickLabelColor, colorConstants.tickLabelColorDark]}
                  showTickLabels={!props.loading && !!props.maxValue}
                  timezone={props.timezone}
                  scale={xScale}
                />
                <NumericalAxis
                  orientation="left"
                  width={parent.width - chartConstants.marginLeftNumerical}
                  left={chartConstants.marginLeftNumerical}
                  tickFormat={props.tickFormat}
                  strokeColor={colorConstants.strokeColor}
                  tickLabelColor={colorConstants.tickLabelColor}
                  showTickLabels={!props.loading && !!props.maxValue}
                  showGrid={false}
                  scale={valueAxisScale}
                />
                {!props.loading && props.maxValue && (
                  <g
                    className="hoverArea"
                    onMouseMove={(e) => onMouseMove(e, props.data.data, xScale, showTooltip, hideTooltip)}
                    onMouseOut={hideTooltip}
                    onMouseDown={props.zoom ? (e) => onMouseDown(e) : () => {}}
                    onMouseUp={props.zoom ? () => onMouseUp(hideTooltip) : () => {}}
                    onTouchStart={props.zoom ? (e) => onMouseDown(e) : () => {}}
                    onTouchEnd={props.zoom ? () => onMouseUp(hideTooltip) : () => {}}
                    onTouchMove={(e) => onMouseMove(e, props.data.data, xScale, showTooltip, hideTooltip)}
                  >
                    <Bars
                      barWeight={barWeightFunction}
                      color={props.colorScheme.categorical[0]}
                      direction="vertical"
                      highlightSection={highlightSection}
                      labels={props.data.data.map((d) => d[INDEX_START_TS])}
                      left={chartConstants.marginLeftNumerical}
                      data={props.data.data.map((d) => d[INDEX_VALUE])}
                      scaleLabel={xScale}
                      scaleValue={valueScale}
                      top={chartConstants.marginMaxValueToBorder}
                    />
                    {/* ChartArea makes sure the outer <g> element where all mouse event listeners are attached always covers the whole chart area so that there is no tooltip flickering issue */}
                    <ChartArea width={parent.width} height={parent.height - chartConstants.marginBottom} left={chartConstants.marginLeftNumerical} />
                    {props.zoom && (
                      <TimeSeriesZoomable
                        from={props.from}
                        to={props.to}
                        lowerBound={props.zoom.lowerBound}
                        upperBound={props.zoom.upperBound}
                        minZoomRange={props.zoom.minZoomRange}
                        onZoom={props.zoom.onZoom}
                        width={parent.width}
                        height={parent.height}
                        color={colorConstants.overlayColor}
                        scale={xScale.invert}
                      />
                    )}
                  </g>
                )}
              </svg>
              {
                tooltipOpen && !props.loading && (
                  <Tooltip
                    data={zoomStartX ? [] : [{ dataColor: props.colorScheme.categorical[0], dataLabel: props.data.label, dataValue: props.tooltipFormat(tooltipData[1]) }]}
                    label={getTimeFormat(props.timezone, props.timeFormat)((zoomStartX ? tooltipData : tooltipData[0]))}
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

TimeSeriesBucketChartSVG.displayName = 'Time Series Bucket Chart SVG';

TimeSeriesBucketChartSVG.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  data: {
    data: [],
    label: '',
  },
  loading: false,
  maxValue: null,
  timeFormat: undefined,
  tooltipData: [[0, 0], 0, 0],
  tooltipLeft: 0,
  tooltipTop: 0,
  zoom: undefined,
};

TimeSeriesBucketChartSVG.propTypes = {
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
   * Sets the starting time point of the time range in epoch milliseconds.
   */
  from: PropTypes.number.isRequired,
  /**
   * The function to hide tooltip provided by the withTooltip enhancer.
   */
  hideTooltip: PropTypes.func.isRequired,
  /**
   * Sets the loading state of the chart.
   */
  loading: PropTypes.bool,
  /**
   * Sets the maximum value among the data within the time range.
   */
  maxValue: PropTypes.number,
  /**
   * The function to render the proper tooltip provided by the withTooltip enhancer.
   */
  showTooltip: PropTypes.func.isRequired,
  /**
   * Sets the formatting function for the ticks along y axis.
   */
  tickFormat: PropTypes.func.isRequired,
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
   * The tooltip data prop provided by the withTooltip enhancer. Value time(range), value, dataIdx
   */
  tooltipData: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]).isRequired),
  /**
   * Sets the data formatting function for the tooltip.
   */
  tooltipFormat: PropTypes.func.isRequired,
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

export default withTooltip(TimeSeriesBucketChartSVG);
