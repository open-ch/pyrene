import React from 'react';
import PropTypes from 'prop-types';
import { interpolateNumber } from 'd3-interpolate';
import {
  Circle,
  SparkLine as SparkLineTT2,
  localPoint,
  scaleUtils,
  withTooltip,
} from 'tuktuktwo';
import Tooltip from '../Tooltip/Tooltip';
import { INDEX_VALUE, INDEX_START_TS } from '../../common/graphConstants';
import colorSchemes from '../../styles/colorSchemes';

const getYCircleSmall = (values, yScale, width, x) => {
  if (!width || values.length < 2) return 0;
  const bandwidth = width / (values.length - 1);
  const interpolateBetweenLastValues = interpolateNumber(values[values.length - 2], values[values.length - 1]);
  return yScale(interpolateBetweenLastValues((x / bandwidth) % 1));
};

const onMouseMove = (event, data, xScale, yScale, width, showTooltip) => {
  const { x, y } = localPoint(event.target.ownerSVGElement, event);
  const bandwidth = width / (data.length - 1);
  const index = Math.round(x / bandwidth);
  const currentValue = index >= 0 && index < data.length && data[index][INDEX_VALUE];
  const propsTooltip = currentValue ? {
    tooltipLeft: x,
    tooltipTop: y,
    tooltipData: {
      data: currentValue,
      tooltipLeftCircle: xScale(data[index][INDEX_START_TS]),
      tooltipTopCircle: yScale(currentValue),
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

  const tooltipDataSeries = [{ dataValue: props.dataFormat(tooltipData.data) }];
  const timeStamps = props.dataSeries.map((d) => d[INDEX_START_TS]);
  const values = props.dataSeries.map((d) => d[INDEX_VALUE]);
  const xScale = scaleUtils.scaleCustomLinear(Math.min(...timeStamps), Math.max(...timeStamps), 0, props.width, 'horizontal');
  const yScale = scaleUtils.scaleCustomLinear(Math.min(...values), Math.max(...values), 0, props.height, 'vertical');
  const radiusCircleSmall = 3;
  const xCircleSmall = props.width * 0.999;
  const yCircleSmall = getYCircleSmall(values, yScale, props.width, xCircleSmall);

  return (
    <>
      <svg width="100%" height={props.height} shapeRendering="crispEdges" overflow="visible">
        <g
          className="hoverArea"
          onMouseMove={(e) => onMouseMove(e, props.dataSeries, xScale, yScale, props.width, showTooltip)}
          onMouseOut={hideTooltip}
        >
          <SparkLineTT2
            colors={props.colorScheme.valueGroundLight}
            dataSeries={props.dataSeries}
            strokeWidth={props.strokeWidth}
            xScale={xScale}
            yScale={yScale}
          />
          {props.useTooltip && !tooltipOpen && (
            <Circle
              borderStrokeWidth={1}
              colors={{ border: 'white', fill: props.colorScheme.valueGroundLight[0] }}
              radius={radiusCircleSmall}
              x={xCircleSmall}
              y={yCircleSmall}
            />
          )}
          {props.useTooltip && tooltipOpen && (
            <Circle
              borderStrokeWidth={1.5}
              colors={{ border: props.colorScheme.valueGroundLight[0], fill: 'white' }}
              radius={3}
              x={tooltipData.tooltipLeftCircle}
              y={tooltipData.tooltipTopCircle}
            />
          )}
        </g>
      </svg>
      {
        props.useTooltip && tooltipOpen && (
          <Tooltip
            dataSeries={tooltipDataSeries}
            left={tooltipLeft} top={tooltipTop}
            overflow
          />
        )
      }
    </>
  );
};

SparkLineSVG.displayName = 'Spark Line SVG';

SparkLineSVG.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  strokeWidth: 1,
  tooltipData: {
    data: 0,
    tooltipLeftCircle: 0,
    tooltipTopCircle: 0,
  },
  tooltipLeft: 0,
  tooltipTop: 0,
  useTooltip: true,
};

SparkLineSVG.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    valueGroundLight: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the data formatting functions for the graph, consisting of format function for the y-axis and that for the tooltip.
   */
  dataFormat: PropTypes.func.isRequired,
  /**
   * Sets the data series as an array of data. Each data item contains a timestamp and a value.
   */
  dataSeries: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  /**
   * Sets the height of the graph canvas.
   */
  height: PropTypes.number.isRequired,
  /**
   * The function to hide tooltip provided by the withTooltip enhancer.
   */
  hideTooltip: PropTypes.func.isRequired,
  /**
   * The function to render the proper tooltip provided by the withTooltip enhancer.
   */
  showTooltip: PropTypes.func.isRequired,
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
  /**
   * If set, a tooltip is shown, while hovering.
   */
  useTooltip: PropTypes.bool,
  /**
   * Sets the width of the graph canvas.
   */
  width: PropTypes.number.isRequired,
};

export default withTooltip(SparkLineSVG);
