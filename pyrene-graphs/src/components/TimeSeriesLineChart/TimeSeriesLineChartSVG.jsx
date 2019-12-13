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

const onMouseMove = (event, data, xScale, yScale, top, showTooltip) => {
  const { x, y } = localPoint(event.target.ownerSVGElement, event);
  const currentTS = xScale.invert(x);
  const foundIndex = data.findIndex((d) => d[INDEX_START_TS] > currentTS) - 1;
  const index = foundIndex >= 0 ? foundIndex : data.length - 1;
  const closerIndex = data[index][INDEX_START_TS] + ((data[index + 1][INDEX_START_TS] - data[index][INDEX_START_TS]) / 2) < currentTS ? index + 1 : index;
  const currentValue = closerIndex >= 0 && closerIndex < data.length && data[closerIndex][INDEX_VALUE];
  const propsTooltip = currentValue ? {
    tooltipLeft: x,
    tooltipTop: y,
    tooltipData: {
      data: [data[closerIndex][INDEX_START_TS], currentValue],
      tooltipLeftCircle: xScale(data[closerIndex][INDEX_START_TS]),
      tooltipTopCircle: yScale(currentValue) + top,
    },
  } : {
    tooltipLeft: 0,
    tooltipTop: 0,
    tooltipData: {
      data: [0, 0],
      tooltipLeftCircle: 0,
      tooltipTopCircle: 0,
    },
  };
  showTooltip(propsTooltip);
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
  const tooltipDataSeries = [{
    dataColor: props.colorScheme.valueGroundLight[0],
    dataLabel: props.dataSeries.label,
    dataValue: props.dataFormat.tooltip(tooltipData.data[INDEX_VALUE]),
  }];
  // Filter out data outside `from` and `to` and get the max value
  const dataInRange = props.dataSeries.data.filter((d) => d[INDEX_START_TS] >= props.from && d[INDEX_START_TS] <= props.to);
  const maxValue = Math.max(...dataInRange.map((data) => data[INDEX_VALUE]));
  const values = props.dataSeries.data.map((d) => d[INDEX_VALUE]);
  
  return (
    <div styleName="graphContainer">
      <Responsive>
        {(parent) => {
          // Get scale function
          const xScale = scaleUtils.scaleCustomLinear(props.from, props.to, chartConstants.marginLeftNumerical, parent.width, 'horizontal');
          const yScale = scaleUtils.scaleCustomLinear(0, Math.max(...values), 0, parent.height - chartConstants.marginBottom - chartConstants.marginMaxValueToBorder, 'vertical');
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
                  onMouseMove={(e) => onMouseMove(e, props.dataSeries.data, xScale, yScale, chartConstants.marginMaxValueToBorder, showTooltip)}
                  onMouseOut={hideTooltip}
                  onTouchMove={(e) => onMouseMove(e, props.dataSeries.data, xScale, yScale, chartConstants.marginMaxValueToBorder, showTooltip)}
                >
                  {!props.loading && dataInRange.length > 0 && (
                    <SparkLine
                      colors={props.colorScheme.valueGroundLight}
                      dataSeries={dataInRange}
                      showArea={false}
                      strokeWidth={2}
                      top={chartConstants.marginMaxValueToBorder}
                      xScale={xScale}
                      yScale={yScale}
                    />
                  )}
                  {tooltipOpen && (
                    <g>
                      <VerticalLine
                        color={colorConstants.lineColor}
                        height={parent.height}
                        left={tooltipData.tooltipLeftCircle}
                        strokeWidth={1}
                      />
                      <Circle
                        borderStrokeWidth={1.5}
                        colors={{ border: props.colorScheme.valueGroundLight[0], fill: 'white' }}
                        radius={3}
                        x={tooltipData.tooltipLeftCircle}
                        y={tooltipData.tooltipTopCircle}
                      />
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
                    dataSeriesLabel={getTimeFormat(props.timezone, props.timeFormat)([tooltipData.data[INDEX_START_TS]])}
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
  tooltipData: {
    data: [0, 0],
    tooltipLeftCircle: 0,
    tooltipTopCircle: 0,
  },
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
  /**
   * The tooltip data prop provided by the withTooltip enhancer.
   */
  tooltipData: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.number),
    tooltipLeftCircle: PropTypes.number,
    tooltipTopCircle: PropTypes.number,
  }),
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
