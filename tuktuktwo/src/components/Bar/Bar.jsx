import React from 'react';
import PropTypes from 'prop-types';
import { Bar as VxBar } from '@vx/shape';
import chartConstants from '../../common/chartConstants';

/**
 * Bars are used to display a numerical value.
 */
const Bar = (props) => {
  const size = props.direction === 'horizontal' ? props.scale.range()[1] : props.scale.range()[0];
  return props.direction === 'horizontal' ? (
    <VxBar
      x={props.left}
      y={props.top}
      height={props.barWeight}
      width={Math.max(chartConstants.minShapeLength, props.scale(props.value) - props.left)}
      fill={props.color}
      transform={props.mirrored ? `rotate(180 ${size / 2} ${props.barWeight / 2})` : null}
    />
  ) : (
    <VxBar
      x={props.left}
      y={props.top + Math.min(size - chartConstants.minShapeLength, props.scale(props.value))}
      height={Math.max(chartConstants.minShapeLength, size - props.scale(props.value))}
      width={props.barWeight}
      fill={props.color}
      transform={props.mirrored ? `rotate(180 ${props.barWeight / 2} ${size / 2})` : null}
    />
  );
};

Bar.displayName = 'Bar';

Bar.defaultProps = {
  barWeight: 6,
  direction: 'vertical',
  left: 0,
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
   * Sets the horizontal offset for this component.
   */
  left: PropTypes.number,
  /**
   * If set, the bar is being mirrored horizontally.
   */
  mirrored: PropTypes.bool,
  /**
   * Sets the scale function for the value axis.
   */
  scale: PropTypes.func.isRequired,
  /**
   * Sets the vertical offset for this component.
   */
  top: PropTypes.number,
  /**
   * Sets the value, which is used to calculate the bar length.
   */
  value: PropTypes.number.isRequired,
};

export default Bar;
