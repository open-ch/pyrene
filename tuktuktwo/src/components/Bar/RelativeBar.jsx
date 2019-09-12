import React from 'react';
import PropTypes from 'prop-types';
import Responsive from '../Misc/Responsive';

/**
 * Relative Bars are used to display a numerical value.
 * It has an underlying secondary bar, which extends to the full length.
 */
const RelativeBar = props => (
  <Responsive>
    {parent => (
      props.direction === 'horizontal1' ? (
        <svg width={parent.width} height={props.barWeight} transform={props.mirrored ? 'rotate(180 0 0)' : undefined}>
          <g>
            <path d={`M0,0H${parent.width - props.cornerRadius}a${props.cornerRadius},${props.cornerRadius} 0 0 1 ${props.cornerRadius},${props.cornerRadius}v${props.barWeight - (2 * props.cornerRadius)}a${props.cornerRadius},${props.cornerRadius} 0 0 1 -${props.cornerRadius},${props.cornerRadius}H${props.value * (parent.width / props.maxValue)}z`} fill={props.colorScheme[1]} />
            <path d={`M0,0h${props.value * (parent.width / props.maxValue) - props.cornerRadius}a${props.cornerRadius},${props.cornerRadius} 0 0 1 ${props.cornerRadius},${props.cornerRadius}v${props.barWeight - (2 * props.cornerRadius)}a${props.cornerRadius},${props.cornerRadius} 0 0 1 -${props.cornerRadius},${props.cornerRadius}h${props.cornerRadius - (props.value * (parent.width / props.maxValue))}z`} fill={props.colorScheme[0]} />
          </g>
        </svg>
      ) : (
        <svg width={props.barWeight} height={20} transform={props.mirrored ? 'rotate(180 0 0)' : undefined}>
          <g>
            <path d={`M0,${parent.height}V${props.cornerRadius}a${props.cornerRadius},${props.cornerRadius} 0 0 1 ${props.cornerRadius},-${props.cornerRadius}h${props.barWeight - (2 * props.cornerRadius)}a${props.cornerRadius},${props.cornerRadius} 0 0 1 ${props.cornerRadius},${props.cornerRadius}V${parent.height}z`} fill={props.colorScheme[1]} />
            <path d={`M0,${parent.height}v${-(props.value * (parent.height / props.maxValue) - props.cornerRadius)}a${props.cornerRadius},${props.cornerRadius} 0 0 1 ${props.cornerRadius},-${props.cornerRadius}h${props.barWeight - (2 * props.cornerRadius)}a${props.cornerRadius},${props.cornerRadius} 0 0 1 ${props.cornerRadius},${props.cornerRadius}V${parent.height}z`} fill={props.colorScheme[0]} />
          </g>
        </svg>
      )
    )}
  </Responsive>
);

RelativeBar.displayName = 'Relative Bar';

RelativeBar.defaultProps = {
  barWeight: 6,
  cornerRadius: 1,
  direction: 'horizontal',
  mirrored: false,
};

RelativeBar.propTypes = {
  /**
   * Sets the bar weight (height if horizontal | width if vertical).
   */
  barWeight: PropTypes.number,
  /**
   * Sets the colors of the bars. Type: [ string ]
   */
  colorScheme: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Sets the corner radius.
   */
  cornerRadius: PropTypes.number,
  /**
   * Sets the direction of the bars.
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Sets the maxValue, which is used to calculate the length of the bars.
   */
  maxValue: PropTypes.number.isRequired,
  /**
   * If set, the bars are being mirrored horizontally.
   */
  mirrored: PropTypes.bool,
  /**
   * Sets the value, which is used to calculate the length of the bars.
   */
  value: PropTypes.number.isRequired,
};

export default RelativeBar;
