import React from 'react';
import PropTypes from 'prop-types';
import { Bar as VxBar } from '@vx/shape';
import Responsive from '../Misc/Responsive';

/**
 * Bars are used to display a numerical value.
 */
const Bar = props => (
  <Responsive>
    {parent => (
      props.direction === 'horizontal' ? (
        <svg width={parent.width} height={props.barWeight} transform={props.mirrored ? 'rotate(180 0 0)' : undefined}>
          <VxBar
            x="0"
            y="0"
            height={props.barWeight}
            width={props.value * (parent.width / props.maxValue)}
            fill={props.color}
          />
        </svg>
      ) : (
        <svg width={props.barWeight} height={parent.height} transform={props.mirrored ? 'rotate(180 0 0)' : undefined}>
          <VxBar
            x="0"
            y={(props.maxValue - props.value) * (parent.height / props.maxValue)}
            height={props.value * (parent.height / props.maxValue)}
            width={props.barWeight}
            fill={props.color}
          />
        </svg>
      ))}
  </Responsive>
);

Bar.displayName = 'Bar';

Bar.defaultProps = {
  barWeight: 6,
  direction: 'horizontal',
  mirrored: false,
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
   * Sets the value, which is used to calculate the bar length.
   */
  value: PropTypes.number.isRequired,
};

export default Bar;
