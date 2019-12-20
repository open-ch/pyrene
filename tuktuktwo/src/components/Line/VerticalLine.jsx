import React from 'react';
import PropTypes from 'prop-types';
import { Line } from '@vx/shape';
import chartConstants from '../../common/chartConstants';

const VerticalLine = (props) => {
  const yMax = props.height - chartConstants.marginBottom;

  return (
    <Line
      from={{ x: props.left, y: yMax }}
      to={{ x: props.left, y: 0 }}
      stroke={props.color}
      strokeWidth={props.strokeWidth}
    />
  );
};

VerticalLine.displayName = 'Vertical Line';

VerticalLine.defaultProps = {
  strokeWidth: 1,
};

VerticalLine.propTypes = {
  /**
   * Sets the line color.
   */
  color: PropTypes.string.isRequired,
  /**
   * Sets the height of the graph canvas.
   */
  height: PropTypes.number.isRequired,
  /**
   * Sets the horizontal offset for this component.
   */
  left: PropTypes.number.isRequired,
  /**
   * Sets the strokeWidth of the line.
   */
  strokeWidth: PropTypes.number,
};

export default VerticalLine;
