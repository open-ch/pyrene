import React from 'react';
import PropTypes from 'prop-types';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GridColumns, GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import ScaleUtils from '../../common/ScaleUtils';
import chartConstants from '../../common/chartConstants';

const getScale = (height, width, scale, orientation, maxValue) => {
  if (scale) return scale;
  const direction = orientation === 'left' ? 'vertical' : 'horizontal';
  const size = orientation === 'left' ? height : width - chartConstants.marginLeftCategorical;
  return ScaleUtils.scaleLinear(size, maxValue, direction);
};

/**
 * NumericalAxis is used to display a numerical left or bottom axis with a grid.
 */
const NumericalAxis = (props) => {
  const chartHeight = props.height - chartConstants.marginBottom;
  const scale = getScale(chartHeight, props.width, props.scale, props.orientation, props.maxValue);
  return (
    props.orientation === 'left' ? (
      <Group>
        <AxisLeft
          left={chartConstants.marginLeftNumerical}
          scale={scale}
          tickLength={0}
          tickLabelProps={() => ({
            fontSize: 10, fill: props.tickLabelColor, fontFamily: 'AvenirNext', textAnchor: 'start', dy: '0.25em', dx: -chartConstants.marginLeftNumerical,
          })}
          stroke={props.strokeColor}
          tickStroke={props.tickLabelColor}
          numTicks={5}
          tickFormat={props.tickFormat}
          tickValues={props.showTickLabels ? undefined : []}
          hideTicks
          hideZero
        />
        {props.showGrid && (
          <GridRows
            left={chartConstants.marginLeftNumerical}
            scale={scale}
            stroke={props.strokeColor}
            width={props.width - chartConstants.marginLeftNumerical}
            height={chartHeight}
            numTicks={5}
          />
        )}
      </Group>
    ) : (
      <Group
        left={chartConstants.marginLeftCategorical}
      >
        <AxisBottom
          top={chartHeight}
          scale={scale}
          tickLabelProps={() => ({
            textAnchor: 'middle', fontSize: 10, fontFamily: 'AvenirNext', fill: props.tickLabelColor, dy: '-0.25em',
          })}
          stroke={props.strokeColor}
          tickStroke={props.tickLabelColor}
          numTicks={7}
          tickFormat={props.tickFormat}
          tickValues={props.showTickLabels ? undefined : []}
          hideTicks
          hideZero
        />
        {props.showGrid && (
          <GridColumns
            scale={scale}
            stroke={props.strokeColor}
            width={props.width - chartConstants.marginLeftCategorical}
            height={chartHeight}
            numTicks={7}
          />
        )}
      </Group>
    ));
};

NumericalAxis.displayName = 'Numerical Axis';

NumericalAxis.defaultProps = {
  scale: undefined,
  showGrid: true,
  showTickLabels: true,
  tickFormat: d => d,
};

NumericalAxis.propTypes = {
  /**
   * Sets the height of the graph canvas.
   * Type: number (required)
   */
  height: PropTypes.number.isRequired,
  /**
   * Sets the maxValue, which is used to scale the axis.
   */
  maxValue: PropTypes.number.isRequired,
  /**
   * Sets the orientation of the axis.
   */
  orientation: PropTypes.oneOf(['left', 'bottom']).isRequired,
  /**
   * Override the default linear scale function.
   */
  scale: PropTypes.func,
  /**
   * If set, the grid gets rendered.
   */
  showGrid: PropTypes.bool,
  /**
   * If set, the tick labels get rendered.
   */
  showTickLabels: PropTypes.bool,
  /**
   * Sets the color of the axis and the grid lines.
   * Type: string (required)
   */
  strokeColor: PropTypes.string.isRequired,
  /**
   * Set function to format the tick labels.
   */
  tickFormat: PropTypes.func,
  /**
   * Sets the color of the tick labels.
   * Type: string (required)
   */
  tickLabelColor: PropTypes.string.isRequired,
  /**
   * Sets the width of the graph canvas.
   * Type: number (required)
   */
  width: PropTypes.number.isRequired,
};

export default NumericalAxis;
