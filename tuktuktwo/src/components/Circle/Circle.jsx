import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from '@vx/shape';

const SparkLine = (props) => (
  // shapeRendering="auto" to have nicer lines
  <svg shapeRendering="auto">
    <Circle
      cx={props.x}
      cy={props.y}
      r={props.radius}
      fill={props.colors.fill}
      stroke={props.colors.border}
      strokeWidth={props.borderStrokeWidth}
      style={{ pointerEvents: 'none' }}
    />
  </svg>
);

SparkLine.displayName = 'Spark Line';

SparkLine.defaultProps = {
  borderStrokeWidth: 1,
};

SparkLine.propTypes = {
  /**
   * Sets the strokeWidth of the border.
   */
  borderStrokeWidth: PropTypes.number,
  /**
   * Sets the color of border and fill.
   */
  colors: PropTypes.shape({
    border: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * Sets the circle radius.
   */
  radius: PropTypes.number.isRequired,
  /**
   * Sets x, which is used to position the circle horizontally.
   */
  x: PropTypes.number.isRequired,
  /**
   * Sets y, which is used to position the circle vertically.
   */
  y: PropTypes.number.isRequired,
};

export default SparkLine;
