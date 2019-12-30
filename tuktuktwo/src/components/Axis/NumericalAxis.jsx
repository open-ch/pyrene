import React from 'react';
import PropTypes from 'prop-types';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GridColumns, GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import { getPaddedTickLabelLeft, getTickLabelLeftProps, getTickLabelBottomProps } from './AxisUtil';
import chartConstants from '../../common/chartConstants';

/**
 * NumericalAxis is used to display a numerical left or bottom axis with a grid.
 */
const NumericalAxis = (props) => {
  if (props.orientation === 'left') {
    const numTicks = 5;
    const axisTickValues = props.scale(props.scale.ticks(numTicks).splice(-1, 1)) <= chartConstants.lastTickValueMarginTop ? props.scale.ticks(numTicks).slice(0, -1) : props.scale.ticks(numTicks);
    const gridTickValues = props.scale(props.scale.ticks(numTicks).splice(-1, 1)) <= chartConstants.lastGridTickValueMarginTop ? props.scale.ticks(numTicks).slice(0, -1) : props.scale.ticks(numTicks);
    return (
      <Group
        left={props.left}
      >
        <AxisLeft
          scale={props.scale}
          tickValues={props.showTickLabels ? axisTickValues : []}
          tickLength={0}
          tickLabelProps={getTickLabelLeftProps(props.left, props.tickLabelColor)}
          tickComponent={getPaddedTickLabelLeft(props.left)}
          label={props.label}
          labelProps={{
            textAnchor: 'start', fontSize: 11, fontWeight: 500, fontFamily: 'AvenirNext', fill: props.tickLabelColor, dx: '2.25em', lineHeight: '1.45', letterSpacing: '0.6px',
          }}
          stroke={props.strokeColor}
          tickStroke={props.tickLabelColor}
          tickFormat={props.tickFormat}
          hideTicks
          hideZero
        />
        {props.showGrid && (
          <GridRows
            scale={props.scale}
            stroke={props.strokeColor}
            width={props.width}
            tickValues={gridTickValues}
          />
        )}
      </Group>
    );
  }
  const numTicks = 7;
  const tickValues = props.scale(props.scale.ticks(numTicks).slice(-1)[0]) + chartConstants.lastTickValueMarginRight >= props.scale.range()[1] ? props.scale.ticks(numTicks).slice(0, -1) : props.scale.ticks(numTicks);
  return (
    <Group>
      <AxisBottom
        top={props.top}
        scale={props.scale}
        tickValues={props.showTickLabels ? tickValues : []}
        tickLabelProps={getTickLabelBottomProps(props.tickLabelColor)}
        label={props.label}
        labelProps={{
          textAnchor: 'middle', fontSize: 11, fontWeight: 500, fontFamily: 'AvenirNext', fill: props.tickLabelColor, dy: '-1.675em', lineHeight: '1.45', letterSpacing: '0.6px',
        }}
        stroke={props.strokeColor}
        tickStroke={props.tickLabelColor}
        tickFormat={props.tickFormat}
        hideTicks
        hideZero
      />
      {props.showGrid && (
        <GridColumns
          scale={props.scale}
          stroke={props.strokeColor}
          height={props.height}
          tickValues={tickValues}
        />
      )}
    </Group>
  );
};

NumericalAxis.displayName = 'Numerical Axis';

NumericalAxis.defaultProps = {
  height: 0,
  label: '',
  left: 0,
  showGrid: true,
  showTickLabels: true,
  tickFormat: (d) => d,
  top: 0,
  width: 0,
};

NumericalAxis.propTypes = {
  /**
   * Sets the height of the graph canvas.
   * Type: number (required)
   */
  height: PropTypes.number,
  /**
   * Sets the axis label.
   */
  label: PropTypes.string,
  /**
   * Sets the horizontal offset for this component.
   */
  left: PropTypes.number,
  /**
   * Sets the orientation of the axis.
   */
  orientation: PropTypes.oneOf(['left', 'bottom']).isRequired,
  /**
   * Sets the scale function for the value axis.
   */
  scale: PropTypes.func.isRequired,
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
   * Sets the vertical offset for this component.
   */
  top: PropTypes.number,
  /**
   * Sets the width of the graph canvas.
   * Type: number (required)
   */
  width: PropTypes.number,
};

export default NumericalAxis;
