import React from 'react';
import PropTypes from 'prop-types';
import {
  SparkLine,
  chartConstants,
  localPoint,
  NumericalAxis,
  Responsive,
  scaleUtils,
  TimeXAxis,
  VerticalLine,
  withTooltip,
} from 'tuktuktwo';
import ChartArea from '../ChartArea/ChartArea';
import Tooltip from '../Tooltip/Tooltip';
import Formats from '../../common/Formats';
import { INDEX_VALUE, INDEX_START_TS } from '../../common/graphConstants';
import colorSchemes from '../../styles/colorSchemes';
import colorConstants from '../../styles/colorConstants';
import './timeSeriesLineChart.css';

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

  // Show normal tooltip
  // localPoint enables us to have the real-time x-coordinate of the mouse; by using the scale function on the x-coordinate we get a corresponding timestamp;
  // then, we go through the data series to find the first element with a startTS that's bigger than that timestamp, the element before it is the one that is being hovered on
  const foundIndex = data.findIndex((d) => d[INDEX_START_TS] > currentTS) - 1;
  const index = foundIndex >= 0 ? foundIndex : data.length - 1;
  // endTS is the startTS of next bucket; if the current element is the last in the data series, there is no endTS
  const endTS = (index !== data.length - 1) ? data[index + 1][INDEX_START_TS] : null;
  showTooltip({
    tooltipLeft: x,
    tooltipTop: y,
    tooltipData: [[data[index][INDEX_START_TS], endTS], data[index][INDEX_VALUE]],
  });
};

const isDataInTimeRange = (data, index, dataSeries, from, to) => {
  if (data[0] >= to) {
    return false;
  }
  if (index !== dataSeries.length - 1 && dataSeries[index + 1][INDEX_START_TS] <= from) {
    return false;
  }
  return true;
};

const getTimeFormat = (timezone, timeFormat) => (timeFormat || ((time) => Formats.timeRangeFormat(time[0], time[1], timezone, false)));

/**
 * The pure SVG chart part of the time series line chart.
 */
const TimeSeriesLineChartSVG = (props) => {
  const {
    hideTooltip,
    showTooltip,
    tooltipData,
    tooltipLeft,
    tooltipOpen,
    tooltipTop,
  } = props;

  const dataAvailable = props.dataSeries && props.dataSeries.data && props.dataSeries.data.length > 0;

  return (
    <div styleName="graphContainer">
      <Responsive>
        {(parent) => {
          // Get scale function
          const xScale = scaleUtils.scaleCustomLinear(chartConstants.marginLeftNumerical, parent.width, props.from, props.to, 'horizontal');
          // Filter out data outside `from` and `to` and get the max value
          const dataInRange = props.dataSeries.data.filter((data, index) => isDataInTimeRange(data, index, props.dataSeries.data, props.from, props.to));
          const maxValue = Math.max(...dataInRange.map((data) => data[INDEX_VALUE]));
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
                  showTickLabels={!props.loading && dataAvailable}
                  timezone={props.timezone}
                />
                <NumericalAxis
                  maxValue={dataAvailable ? maxValue : 0}
                  orientation="left"
                  width={parent.width}
                  height={parent.height}
                  left={chartConstants.marginLeftNumerical}
                  tickFormat={props.dataFormat.yAxis}
                  strokeColor={colorConstants.strokeColor}
                  tickLabelColor={colorConstants.tickLabelColor}
                  showTickLabels={!props.loading && dataAvailable}
                  showGrid={false}
                />
                <g
                  className="hoverArea"
                  onMouseMove={(e) => onMouseMove(e, props.dataSeries.data, xScale, showTooltip)}
                  onMouseOut={hideTooltip}
                  onTouchMove={(e) => onMouseMove(e, props.dataSeries.data, xScale, showTooltip)}
                >
                  {!props.loading && dataInRange.length > 0 && (
                    <SparkLine
                      colors={props.colorScheme.valueGroundLight}
                      dataSeries={props.dataSeries.data}
                      left={chartConstants.marginLeftNumerical}
                      height={parent.height - chartConstants.marginBottom}
                      showArea={false}
                      strokeWidth={2}
                      width={parent.width}
                      alignScaleWithLeftAxis
                    />
                  )}
                  {tooltipOpen && (
                    <VerticalLine
                      color={colorConstants.lineColor}
                      height={parent.height}
                      left={tooltipLeft}
                      strokeWidth={1}
                    />
                  )}
                  {/* ChartArea makes sure the outer <g> element where all mouse event listeners are attached always covers the whole chart area so that there is no tooltip flickering issue */}
                  <ChartArea width={parent.width} height={parent.height} />
                </g>
              </svg>
              {
                tooltipOpen && !props.loading && (
                  <Tooltip
                    dataSeries={[{ dataColor: props.colorScheme.valueGroundLight[0], dataLabel: props.dataSeries.label, dataValue: props.dataFormat.tooltip(tooltipData[1]) }]}
                    dataSeriesLabel={getTimeFormat(props.timezone, props.timeFormat)(tooltipData[0])}
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

TimeSeriesLineChartSVG.displayName = 'Time Series Line Chart SVG';

TimeSeriesLineChartSVG.defaultProps = {
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
};

TimeSeriesLineChartSVG.propTypes = {
  /**
   * Sets the color scheme of the bars.
   */
  colorScheme: PropTypes.shape({
    valueGroundLight: PropTypes.arrayOf(PropTypes.string).isRequired,
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
};

export default withTooltip(TimeSeriesLineChartSVG);
