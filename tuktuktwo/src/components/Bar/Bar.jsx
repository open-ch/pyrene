import React from 'react';
import PropTypes from 'prop-types';
import { Bar as VxBar } from '@vx/shape';

/**
 * Bars are used to display a numerical value.
 */
const Bar = props => (
  props.direction === 'horizontal' ? (
    <VxBar
      x="0"
      y={props.top}
      height={props.barWeight}
      width={props.value * (props.size / props.maxValue)}
      fill={props.color}
      transform={props.mirrored ? `rotate(180 ${props.size / 2} ${props.barWeight / 2})` : undefined}
    />
  ) : (
    <VxBar
      x="0"
      y={props.top + (props.maxValue - props.value) * (props.size / props.maxValue)}
      height={props.value * (props.size / props.maxValue)}
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
  top: 0,
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
   * Sets top, which is used to position the bar vertically.
   */
  top: PropTypes.number,
  /**
   * Sets the value, which is used to calculate the bar length.
   */
  value: PropTypes.number.isRequired,
};

export default Bar;
