import React from 'react';
import PropTypes from 'prop-types';
import { Bar as VxBar } from '@vx/shape';

/**
 * Bars are used to display a numerical value.
 */
const Bar = (props) => (
  props.direction === 'horizontal' ? (
    <VxBar
      x={props.x}
      y={props.y}
      height={props.barWeight}
      width={props.size > 0 ? props.value * (props.size / props.maxValue) : 0}
      fill={props.color}
      transform={props.mirrored ? `rotate(180 ${props.size / 2} ${props.barWeight / 2})` : undefined}
    />
  ) : (
    <VxBar
      x={props.x}
      y={props.y + (props.maxValue - props.value) * (props.size / props.maxValue)}
      height={props.size > 0 ? props.value * (props.size / props.maxValue) : 0}
      width={props.barWeight}
      fill={props.color}
      transform={props.mirrored ? `rotate(180 ${props.barWeight / 2} ${props.size / 2})` : undefined}
    />
  )
);

Bar.displayName = 'Bar';

Bar.defaultProps = {
  barWeight: 6,
  direction: 'horizontal',
  mirrored: false,
  x: 0,
  y: 0,
};

Bar.propTypes = {
  /**
   * Sets the bar weight (height if horizontal | width if vertical).
   */
  barWeight: PropTypes.number,
  /**
   * Sets the bar color.
   */
  color: PropTypes.string.isRequired,
  /**
   * Sets the bar direction.
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Sets the maxValue, which is used to calculate the bar length.
   */
  maxValue: PropTypes.number.isRequired,
  /**
   * If set, the bar is being mirrored horizontally.
   */
  mirrored: PropTypes.bool,
  /**
   * Sets the size, which is used to calculate the bar length.
   */
  size: PropTypes.number.isRequired,
  /**
   * Sets the value, which is used to calculate the bar length.
   */
  value: PropTypes.number.isRequired,
  /**
   * Sets x, which is used to position the bar horizontally.
   */
  x: PropTypes.number,
  /**
   * Sets y, which is used to position the bar vertically.
   */
  y: PropTypes.number,
};

export default Bar;
