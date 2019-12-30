import React from 'react';
import PropTypes from 'prop-types';
import { interpolateNumber } from 'd3-interpolate';
import {
  Circle,
  NumericalAxis,
  Responsive,
  SparkLine as SparkLineTT2,
  localPoint,
  scaleLinear,
  withTooltip,
} from 'tuktuktwo';
import ChartArea from '../ChartArea/ChartArea';
import Tooltip from '../Tooltip/Tooltip';
import { INDEX_VALUE, INDEX_START_TS } from '../../common/chartConstants';
import colorConstants from '../../styles/colorConstants';
import colorSchemes from '../../styles/colorSchemes';

const getYCircleSmall = (values, yScale, width, x) => {
  if (!width || values.length < 2) return 0;
  const bandwidth = width / (values.length - 1);
  const interpolateBetweenLastValues = interpolateNumber(values[values.length - 2], values[values.length - 1]);
  return yScale(interpolateBetweenLastValues((x / bandwidth) % 1));
};

const onMouseMove = (event, data, scaleLabel, scaleValue, width, showTooltip) => {
  const { x, y } = localPoint(event.target.ownerSVGElement, event);
  const bandwidth = width / (data.length - 1);
  const index = Math.round(x / bandwidth);
  const currentValue = index >= 0 && index < data.length && data[index][INDEX_VALUE];
  const propsTooltip = currentValue ? {
    tooltipLeft: x,
    tooltipTop: y,
    tooltipData: {
      data: currentValue,
      tooltipLeftCircle: scaleLabel(data[index][INDEX_START_TS]),
      tooltipTopCircle: scaleValue(currentValue),
    },
  } : {
    tooltipLeft: 0,
    tooltipTop: 0,
    tooltipData: {
      data: 0,
      tooltipLeftCircle: 0,
      tooltipTopCircle: 0,
    },
  };
  showTooltip(propsTooltip);
};

/**
 * The pure SVG part of the spark line.
 */
const SparkLineSVG = (props) => {
  const {
    hideTooltip,
    showTooltip,
    tooltipData,
    tooltipLeft,
    tooltipOpen,
    tooltipTop,
  } = props;

  const timeStamps = props.data.map((d) => d[INDEX_START_TS]);
  const values = props.data.map((d) => d[INDEX_VALUE]);
  const radiusCircleSmall = 3;
  
  return (
    <Responsive>
      {(parent) => {
        const sparkLineHeight = props.sparkLineHeight ? props.sparkLineHeight : parent.height;
        const scaleLabel = scaleLinear(Math.min(...timeStamps), Math.max(...timeStamps), 0, parent.width, 'horizontal');
        const scaleValue = scaleLinear(Math.min(...values), Math.max(...values), 0, sparkLineHeight, 'vertical');
        const xCircleSmall = parent.width * 0.999;
        const yCircleSmall = getYCircleSmall(values, scaleValue, parent.width, xCircleSmall);
        return (
          <>
            <svg width="100%" height={parent.height} shapeRendering="crispEdges" overflow="visible">
              <g
                className="hoverArea"
                onMouseMove={(e) => onMouseMove(e, props.data, scaleLabel, scaleValue, parent.width, showTooltip)}
                onMouseOut={hideTooltip}
              >
                {!props.loading && (
                  <SparkLineTT2
                    colors={props.colorScheme.valueGroundLight}
                    data={props.data}
                    scaleLabel={scaleLabel}
                    scaleValue={scaleValue}
                    strokeWidth={props.strokeWidth}
                  />
                )}
                {props.axisLabel && (
                  <NumericalAxis
                    strokeColor={colorConstants.strokeColor}
                    tickLabelColor={colorConstants.tickLabelColor}
                    scale={scaleLabel}
                    showTickLabels={false}
                    showGrid={false}
                    label={props.axisLabel}
                    orientation="bottom"
                    top={sparkLineHeight}
                  />
                )}
                {!props.loading && props.enableTooltip && !tooltipOpen && (
                  <Circle
                    borderStrokeWidth={1}
                    colors={{ border: 'white', fill: props.colorScheme.valueGroundLight[0] }}
                    radius={radiusCircleSmall}
                    x={xCircleSmall}
                    y={yCircleSmall}
                  />
                )}
                {!props.loading && props.enableTooltip && tooltipOpen && (
                  <Circle
                    borderStrokeWidth={1.5}
                    colors={{ border: props.colorScheme.valueGroundLight[0], fill: 'white' }}
                    radius={3}
                    x={tooltipData.tooltipLeftCircle}
                    y={tooltipData.tooltipTopCircle}
                  />
                )}
                {/* ChartArea is used to show the tooltip once the cursor is in the chart area */}
                <ChartArea width={parent.width} height={parent.height} />
              </g>
            </svg>
            {
              props.enableTooltip && tooltipOpen && (
                <Tooltip
                  data={[{ dataValue: props.dataFormat(tooltipData.data) }]}
                  left={tooltipLeft} top={tooltipTop}
                  overflow
                />
              )
            }
          </>
        );
      }}
    </Responsive>
  );
};

SparkLineSVG.displayName = 'Spark Line SVG';

SparkLineSVG.defaultProps = {
  axisLabel: null,
  colorScheme: colorSchemes.colorSchemeDefault,
  enableTooltip: true,
  loading: false,
  sparkLineHeight: null,
  strokeWidth: 1,
  tooltipData: {
    data: 0,
    tooltipLeftCircle: 0,
    tooltipTopCircle: 0,
  },
  tooltipLeft: 0,
  tooltipTop: 0,
};

SparkLineSVG.propTypes = {
  /**
   * Sets the axis label.
   */
  axisLabel: PropTypes.string,
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    valueGroundLight: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the data series as an array of data. Each data item contains a timestamp and a value.
   */
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  /**
   * Sets the data formatting functions for the chart, consisting of format function for the y-axis and that for the tooltip.
   */
  dataFormat: PropTypes.func.isRequired,
  /**
   * If set, a tooltip is shown, while hovering.
   */
  enableTooltip: PropTypes.bool,
  /**
   * The function to hide tooltip provided by the withTooltip enhancer.
   */
  hideTooltip: PropTypes.func.isRequired,
  /**
    * If set, a loader is shown instead of axis tick labels, grid and bars.
    */
  loading: PropTypes.bool,
  /**
   * The function to render the proper tooltip provided by the withTooltip enhancer.
   */
  showTooltip: PropTypes.func.isRequired,
  /**
   * If set, overwrites parent.height for the sparkline container.
   */
  sparkLineHeight: PropTypes.number,
  /**
   * Sets the strokeWidth of the line.
   */
  strokeWidth: PropTypes.number,
  /**
   * The tooltip data prop provided by the withTooltip enhancer.
   */
  tooltipData: PropTypes.shape({
    data: PropTypes.number,
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

export default withTooltip(SparkLineSVG);
