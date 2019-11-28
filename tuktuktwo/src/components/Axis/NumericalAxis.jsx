import React from 'react';
import PropTypes from 'prop-types';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GridColumns, GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import ScaleUtils from '../../common/ScaleUtils';
import chartConstants from '../../common/chartConstants';

const getScale = (scale, minRange, maxRange, direction, maxValue) => {
  if (scale) return scale;
  return ScaleUtils.scaleCustomLinear(0, maxValue, minRange, maxRange, direction);
};

/**
 * NumericalAxis is used to display a numerical left or bottom axis with a grid.
 */
const NumericalAxis = (props) => {
  if (props.orientation === 'left') {
    const numTicks = 5;
    const size = props.height - chartConstants.marginBottom;
    const scale = getScale(props.scale, 0, size, 'vertical', (props.maxValue / (size - chartConstants.marginMaxValueToBorder)) * size);
    const axisTickValues = scale(scale.ticks(numTicks).splice(-1, 1)) <= chartConstants.lastTickValueMarginTop ? scale.ticks(numTicks).slice(0, -1) : scale.ticks(numTicks);
    const gridTickValues = scale(scale.ticks(numTicks).splice(-1, 1)) <= chartConstants.lastGridTickValueMarginTop ? scale.ticks(numTicks).slice(0, -1) : scale.ticks(numTicks);
    return (
      <Group>
        <AxisLeft
          left={props.left}
          scale={scale}
          tickValues={props.showTickLabels ? axisTickValues : []}
          tickLength={0}
          tickLabelProps={() => ({
            fontSize: 10, fill: props.tickLabelColor, fontFamily: 'AvenirNext', textAnchor: 'start', dy: '0.325em', dx: -props.left,
          })}
          stroke={props.strokeColor}
          tickStroke={props.tickLabelColor}
          tickFormat={props.tickFormat}
          hideTicks
          hideZero
        />
        {props.showGrid && (
          <GridRows
            left={props.left}
            scale={scale}
            stroke={props.strokeColor}
            width={props.width - props.left}
            height={props.height}
            tickValues={gridTickValues}
          />
        )}
      </Group>
    );
  }
  const numTicks = 7;
  const scale = getScale(props.scale, props.left, props.width, 'horizontal', props.maxValue);
  const tickValues = scale(scale.ticks(numTicks).slice(-1)[0]) + chartConstants.lastTickValueMarginRight >= props.width ? scale.ticks(numTicks).slice(0, -1) : scale.ticks(numTicks);
  return (
    <Group>
      <AxisBottom
        top={props.height - chartConstants.marginBottom}
        scale={scale}
        tickValues={props.showTickLabels ? tickValues : []}
        tickLabelProps={() => ({
          textAnchor: 'middle', fontSize: 10, fontFamily: 'AvenirNext', fill: props.tickLabelColor, dy: '-0.25em',
        })}
        stroke={props.strokeColor}
        tickStroke={props.tickLabelColor}
        tickFormat={props.tickFormat}
        hideTicks
        hideZero
      />
      {props.showGrid && (
        <GridColumns
          scale={scale}
          stroke={props.strokeColor}
          width={props.width}
          height={props.height - chartConstants.marginBottom}
          tickValues={tickValues}
        />
      )}
    </Group>
  );
};

NumericalAxis.displayName = 'Numerical Axis';

NumericalAxis.defaultProps = {
  scale: undefined,
  showGrid: true,
  showTickLabels: true,
  tickFormat: (d) => d,
};

NumericalAxis.propTypes = {
  /**
   * Sets the height of the graph canvas.
   * Type: number (required)
   */
  height: PropTypes.number.isRequired,
  /**
   * Sets the horizontal offset.
   */
  left: PropTypes.number.isRequired,
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
