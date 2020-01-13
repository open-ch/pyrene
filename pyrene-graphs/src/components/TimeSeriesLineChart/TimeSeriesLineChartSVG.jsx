import React from 'react';
import PropTypes from 'prop-types';
import {
  Circle,
  SparkLine as SparkLineTT2,
  chartConstants,
  localPoint,
  NumericalAxis,
  Responsive,
  scaleTime,
  scaleValueAxis,
  scaleValueInBounds,
  TimeXAxis,
  VerticalLine,
  withTooltip,
} from 'tuktuktwo';
import ChartArea from '../ChartArea/ChartArea';
import Tooltip from '../Tooltip/Tooltip';
import { timeFormat } from '../../common/Formats';
import { getMaxValue } from '../../common/dataUtils';
import { INDEX_VALUE, INDEX_START_TS } from '../../common/chartConstants';
import colorConstants from '../../styles/colorConstants';
import './timeSeriesLineChart.css';

/**
  *
  * @param {object} event - The mouseMove event
  * @param {array} data - The array of data series with timestamp and value
  * @param {function} xScale - The scale function that linearly maps x-coordinate to timestamp in epoch milliseconds
  * @param {function} yScale - The scale function that linearly maps y-coordinate to value
  * @param {number} top - The vertical offset from the top
  * @param {boolean} showTooltip - The function that passes tooltip position and data to the tooltip component
  */
const onMouseMove = (event, data, xScale, yScale, top, showTooltip, hideTooltip) => {
  // If there is no data in range, just return
  if (!data.find((ds) => ds.data.length > 0)) {
    return;
  }
  const { x, y } = localPoint(event.target.ownerSVGElement, event);
  const currentTS = xScale.invert(x);
  const dataFirst = data[0].data;
  const foundIndex = dataFirst.findIndex((d) => d[INDEX_START_TS] >= currentTS) - 1;
  const index = foundIndex >= 0 ? foundIndex : 0;

  // Hide tooltip if current cursor position is beyond the range of first and last bucket
  const lastTS = dataFirst[dataFirst.length - 1][INDEX_START_TS];
  if (currentTS > lastTS || currentTS < dataFirst[0][INDEX_START_TS]) {
    hideTooltip();
    return;
  }

  const closerIndex = index + 1 >= dataFirst.length || dataFirst[index][INDEX_START_TS] + ((dataFirst[index + 1][INDEX_START_TS] - dataFirst[index][INDEX_START_TS]) / 2) >= currentTS ? index : index + 1;
  const tooltipData = data.map((d) => {
    const currentValue = d.data[closerIndex][INDEX_VALUE];
    return {
      color: d.color,
      data: [d.data[closerIndex][INDEX_START_TS], currentValue],
      label: d.label,
      tooltipLeftCircle: xScale(d.data[closerIndex][INDEX_START_TS]),
      tooltipTopCircle: currentValue !== null ? yScale(currentValue) + top : null,
    };
  });
  showTooltip({
    tooltipLeft: x,
    tooltipTop: y,
    tooltipData: tooltipData,
  });
};

const getTimeFormat = (timezone, timeFormatter) => (timeFormatter || ((time) => timeFormat(time[0], timezone)));

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

  const maxValue = getMaxValue(props.data, props.from, props.to);
  const hasDataInRange = props.data.find((ds) => ds.data.length > 0);

  return (
    <div styleName="chartContainer">
      <Responsive>
        {(parent) => {
          // Get scale function
          const xScale = scaleTime(props.from, props.to, chartConstants.marginLeftNumerical, parent.width, 'horizontal');
          const valueScale = scaleValueInBounds(parent, maxValue, 'vertical');
          const valueAxisScale = scaleValueAxis(parent, maxValue, 'vertical');
          return (
            <>
              <svg width="100%" height={parent.height} shapeRendering="crispEdges" overflow="visible">
                <TimeXAxis
                  from={props.from}
                  to={props.to}
                  width={parent.width}
                  height={parent.height}
                  strokeColor={colorConstants.strokeColor}
                  tickLabelColors={[colorConstants.tickLabelColor, colorConstants.tickLabelColorDark]}
                  showTickLabels={!props.loading && !!hasDataInRange}
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
                  showTickLabels={!props.loading && !!hasDataInRange}
                  showGrid={false}
                  scale={valueAxisScale}
                />
                <g
                  className="hoverArea"
                  onMouseMove={(e) => onMouseMove(e, props.data, xScale, valueScale, chartConstants.marginMaxValueToBorder, showTooltip, hideTooltip)}
                  onMouseOut={hideTooltip}
                  onTouchMove={(e) => onMouseMove(e, props.data, xScale, valueScale, chartConstants.marginMaxValueToBorder, showTooltip, hideTooltip)}
                >
                  {!props.loading && hasDataInRange && (
                    props.data.map((d) => (
                      <SparkLineTT2
                        key={`sparkline-${d.label}`}
                        colors={d.color}
                        data={d.data}
                        strokeWidth={2}
                        top={chartConstants.marginMaxValueToBorder}
                        scaleLabel={xScale}
                        scaleValue={valueScale}
                      />
                    ))
                  )}
                  {!props.loading && tooltipOpen && (
                    <g>
                      <VerticalLine
                        color={colorConstants.lineColor}
                        height={parent.height}
                        left={tooltipData[0].tooltipLeftCircle}
                        strokeWidth={1}
                      />
                      {tooltipData.map((d) => (d.tooltipTopCircle !== null && (
                        <Circle
                          key={`indicator-${d.label}`}
                          borderStrokeWidth={1.5}
                          colors={{ border: d.color, fill: 'white' }}
                          radius={3}
                          x={d.tooltipLeftCircle}
                          y={d.tooltipTopCircle}
                        />
                      )))}
                    </g>
                  )}
                  {/* ChartArea makes sure the outer <g> element where all mouse event listeners are attached always covers the whole chart area so that there is no tooltip flickering issue */}
                  <ChartArea width={parent.width} height={parent.height - chartConstants.marginBottom} left={chartConstants.marginLeftNumerical} />
                </g>
              </svg>
              {
                tooltipOpen && !props.loading && (
                  <Tooltip
                    data={tooltipData.map((d) => ({
                      dataColor: d.color,
                      dataLabel: d.label,
                      dataValue: props.tooltipFormat(d.data[INDEX_VALUE] ? d.data[INDEX_VALUE]: ''),
                    }))}
                    label={getTimeFormat(props.timezone, props.timeFormat)([tooltipData[0].data[INDEX_START_TS]])}
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
  data: [],
  loading: false,
  timeFormat: undefined,
  tooltipData: [],
  tooltipLeft: 0,
  tooltipTop: 0,
};

TimeSeriesLineChartSVG.propTypes = {
  /**
   * Sets the data series. A data series consists of an array of objects, which consist of a label and an array of data. Each data item contains a timestamp and a value.
   */
  data: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    label: PropTypes.string.isRequired,
  })),
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
   * The tooltip data prop provided by the withTooltip enhancer.
   */
  /**
   * The tooltip data prop provided by the withTooltip enhancer.
   */
  tooltipData: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.number),
    label: PropTypes.string,
    tooltipLeftCircle: PropTypes.number,
    tooltipTopCircle: PropTypes.number,
  })),
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
};

export default withTooltip(TimeSeriesLineChartSVG);
