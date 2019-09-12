import React from 'react';
import PropTypes from 'prop-types';
import Responsive from '../Misc/Responsive';

/**
 * Bars are used to display a numerical value.
 */

const Bar = props => (
  <Responsive>
    {parent => (
      props.direction === 'horizontal1' ? (
        <svg width={parent.width} height={props.barWeight} transform={props.mirrored ? 'rotate(180 0 0)' : undefined}>
          <path d={`M0,0h${props.value * (parent.width / props.maxValue) - props.cornerRadius}a${props.cornerRadius},${props.cornerRadius} 0 0 1 ${props.cornerRadius},${props.cornerRadius}v${props.barWeight - (2 * props.cornerRadius)}a${props.cornerRadius},${props.cornerRadius} 0 0 1 -${props.cornerRadius},${props.cornerRadius}h${props.cornerRadius - (props.value * (parent.width / props.maxValue))}z`} fill={props.color} />
        </svg>
      ) : (
        <svg width={props.barWeight} height={20} transform={props.mirrored ? 'rotate(180 0 0)' : undefined}>
          <path d={`M0,${parent.height}v${-(props.value * (parent.height / props.maxValue) - props.cornerRadius)}a${props.cornerRadius},${props.cornerRadius} 0 0 1 ${props.cornerRadius},-${props.cornerRadius}h${props.barWeight - (2 * props.cornerRadius)}a${props.cornerRadius},${props.cornerRadius} 0 0 1 ${props.cornerRadius},${props.cornerRadius}V${parent.height}z`} fill={props.color} />
        </svg>
      ))}
  </Responsive>
);

Bar.displayName = 'Bar';

Bar.defaultProps = {
  barWeight: 6,
  cornerRadius: 1,
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
   * Sets the corner radius.
   */
  cornerRadius: PropTypes.number,
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
