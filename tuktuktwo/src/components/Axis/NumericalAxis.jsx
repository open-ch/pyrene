import React from 'react';
import PropTypes from 'prop-types';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GridColumns, GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import Utils from '../../Utils';
import AxisUtils from './AxisUtils';

const NumericalAxis = (props) => {
  const stroke = '#e1e3e8';
  const tickStroke = '#979ca8';
  const scale = props.scale ? props.scale : Utils.scaleLinear(props.orientation === 'left' ? Utils.chartHeight : props.parentSize.width - AxisUtils.axisLeftCategorical, props.maxValue, props.orientation === 'left' ? 'vertical' : 'horizontal');
  return (
    props.orientation === 'left' ? (
      <Group>
        <AxisLeft
          left={AxisUtils.axisLeftNumerical}
          scale={scale}
          tickLength={0}
          tickLabelProps={() => ({
            fontSize: 10, fill: tickStroke, fontFamily: 'AvenirNext', textAnchor: 'start', dy: '0.25em', dx: -AxisUtils.axisLeftNumerical,
          })}
          stroke={stroke}
          tickStroke={tickStroke}
          numTicks={5}
          tickFormat={props.tickFormat}
          tickValues={props.showTickLabels ? undefined : []}
          hideTicks
          hideZero
        />
        {props.showGrid && (
          <GridRows
            left={AxisUtils.axisLeftNumerical}
            scale={scale}
            stroke={stroke}
            width={props.parentSize.width - AxisUtils.axisLeftNumerical}
            height={Utils.chartHeight}
            numTicks={5}
          />
        )}
      </Group>
    ) : (
      <Group
        left={AxisUtils.axisLeftCategorical}
      >
        <AxisBottom
          top={Utils.chartHeight}
          scale={scale}
          tickLabelProps={() => ({
            textAnchor: 'middle', fontSize: 10, fontFamily: 'AvenirNext', fill: tickStroke, dy: '-0.25em',
          })}
          stroke={stroke}
          tickStroke={tickStroke}
          numTicks={7}
          tickFormat={props.tickFormat}
          tickValues={props.showTickLabels ? undefined : []}
          hideTicks
          hideZero
        />
        {props.showGrid && (
          <GridColumns
            scale={scale}
            stroke={stroke}
            width={props.parentSize.width - AxisUtils.axisLeftCategorical}
            height={Utils.chartHeight}
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
   * Sets the maxValue, which is used to scale the axis.
   */
  maxValue: PropTypes.number.isRequired,
  /**
   * Sets the orientation of the axis.
   */
  orientation: PropTypes.oneOf(['left', 'bottom']).isRequired,
  /**
   * Sets the parentSize, which is used to calculate the bar length.
   */
  parentSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
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
   * Set function to format the tick labels.
   */
  tickFormat: PropTypes.func,
};

export default NumericalAxis;
