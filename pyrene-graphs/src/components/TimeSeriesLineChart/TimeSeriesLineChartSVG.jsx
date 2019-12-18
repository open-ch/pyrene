import React from 'react';
import PropTypes from 'prop-types';
import {
  Circle,
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
  *
  * @param {object} event - The mouseMove event
  * @param {array} data - The array of data series with timestamp and value
  * @param {function} xScale - The scale function that linearly maps x-coordinate to timestamp in epoch milliseconds
  * @param {function} yScale - The scale function that linearly maps y-coordinate to value
  * @param {number} top - The vertical offset from the top
  * @param {boolean} showTooltip - The function that passes tooltip position and data to the tooltip component
  */
const onMouseMove = (event, data, xScale, yScale, top, showTooltip) => {
  const { x, y } = localPoint(event.target.ownerSVGElement, event);
  const currentTS = xScale.invert(x);
  const dataFirst = data[0].data;
  const foundIndex = dataFirst.findIndex((d) => d[INDEX_START_TS] >= currentTS) - 1;
  const index = foundIndex >= 0 ? foundIndex : 0;
  const closerIndex = index + 1 >= dataFirst.length || dataFirst[index][INDEX_START_TS] + ((dataFirst[index + 1][INDEX_START_TS] - dataFirst[index][INDEX_START_TS]) / 2) >= currentTS ? index : index + 1;
  const tooltipData = data.map((d) => {
    const currentValue = d.data[closerIndex][INDEX_VALUE];
    return {
      data: [d.data[closerIndex][INDEX_START_TS], currentValue],
      label: d.label,
      tooltipLeftCircle: xScale(d.data[closerIndex][INDEX_START_TS]),
      tooltipTopCircle: yScale(currentValue) + top,
    };
  });
  showTooltip({
    tooltipLeft: x,
    tooltipTop: y,
    tooltipData: tooltipData,
  });
};

const getTimeFormat = (timezone, timeFormat) => (timeFormat || ((time) => Formats.timeFormat(time[0], timezone)));

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

  const dataAvailable = !!(props.dataSeries && props.dataSeries[0] && props.dataSeries[0].data && props.dataSeries[0].data.length > 0);
  const tooltipDataSeries = tooltipData.map((d, i) => ({
    dataColor: props.colorScheme.categorical[i],
    dataLabel: d.label,
    dataValue: props.dataFormat.tooltip(d.data[INDEX_VALUE]),
  }));
  // Filter out data outside `from` and `to` and get the max value
  const dataInRange = props.dataSeries.filter((d) => d.data.filter((e) => e[INDEX_START_TS] >= props.from && e[INDEX_START_TS] <= props.to));
  const maxValue = Math.max(...dataInRange.map((d) => Math.max(...d.data.map((e) => e[INDEX_VALUE]))));
  
  return (
    <div styleName="graphContainer">
      <Responsive>
        {(parent) => {
          // Get scale function
          const xScale = scaleUtils.scaleCustomLinear(props.from, props.to, chartConstants.marginLeftNumerical, parent.width, 'horizontal');
          const yScale = scaleUtils.scaleCustomLinear(0, maxValue, 0, parent.height - chartConstants.marginBottom - chartConstants.marginMaxValueToBorder, 'vertical');
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
                  onMouseMove={(e) => onMouseMove(e, props.dataSeries, xScale, yScale, chartConstants.marginMaxValueToBorder, showTooltip)}
                  onMouseOut={hideTooltip}
                  onTouchMove={(e) => onMouseMove(e, props.dataSeries, xScale, yScale, chartConstants.marginMaxValueToBorder, showTooltip)}
                >
                  {!props.loading && dataInRange.length > 0 && (
                    dataInRange.map((d, i) => (
                      <SparkLine
                        key={`sparkline-${d.label}`}
                        colors={props.colorScheme.categorical[i]}
                        dataSeries={d.data}
                        strokeWidth={2}
                        top={chartConstants.marginMaxValueToBorder}
                        xScale={xScale}
                        yScale={yScale}
                      />
                    ))
                  )}
                  {tooltipOpen && (
                    <g>
                      <VerticalLine
                        color={colorConstants.lineColor}
                        height={parent.height}
                        left={tooltipData[0].tooltipLeftCircle}
                        strokeWidth={1}
                      />
                      {tooltipData.map((d, i) => (
                        <Circle
                          key={`indicator-${d.label}`}
                          borderStrokeWidth={1.5}
                          colors={{ border: props.colorScheme.categorical[i], fill: 'white' }}
                          radius={3}
                          x={d.tooltipLeftCircle}
                          y={d.tooltipTopCircle}
                        />
                      ))}
                    </g>
                  )}
                  {/* ChartArea makes sure the outer <g> element where all mouse event listeners are attached always covers the whole chart area so that there is no tooltip flickering issue */}
                  <ChartArea width={parent.width} height={parent.height} />
                </g>
              </svg>
              {
                tooltipOpen && !props.loading && (
                  <Tooltip
                    dataSeries={tooltipDataSeries}
                    dataSeriesLabel={getTimeFormat(props.timezone, props.timeFormat)([tooltipData[0].data[INDEX_START_TS]])}
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
  dataSeries: [],
  loading: false,
  timeFormat: undefined,
  tooltipData: [],
  tooltipLeft: 0,
  tooltipTop: 0,
};

TimeSeriesLineChartSVG.propTypes = {
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
   * Sets the data series. A data series consists of an array of objects, which consist of a label and an array of data. Each data item contains a timestamp and a value.
   */
  dataSeries: PropTypes.arrayOf(PropTypes.shape({
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
