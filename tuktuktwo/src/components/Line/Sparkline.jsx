import React from 'react';
import PropTypes from 'prop-types';
import { LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';

const SparkLine = (props) => {
  const data = [5, 8, 0];

  const xScale = scaleTime({
    range: [0, props.width],
    domain: [1, 2, 3],
  });
  const yScale = scaleLinear({
    range: [props.height, 0],
    domain: [0, Math.max(...data)],
  });

  return (
    <LinePath
      data={data}
      x={(d) => xScale(d)}
      y={(d) => yScale(d)}
      stroke="blue"
    />
  );
};

SparkLine.displayName = 'Sparkline';

SparkLine.propTypes = {
  /**
   * The starting time point in epoch milliseconds.
   * Type: number (required)
   */
  from: PropTypes.number.isRequired,
  /**
   * Sets the height of the graph canvas.
   * Type: number (required)
   */
  height: PropTypes.number.isRequired,
  /**
   * Sets the color of the axis and the grid lines.
   * Type: string (required)
   */
  strokeColor: PropTypes.string.isRequired,
  /**
   * The timezone the current user is in.
   * Type: string (required)
   */
  timezone: PropTypes.string.isRequired,
  /**
   * The ending time point in epoch milliseconds.
   * Type: number (required)
   */
  to: PropTypes.number.isRequired,
  /**
   * Sets the width of the graph canvas.
   * Type: number (required)
   */
  width: PropTypes.number.isRequired,
};

export default SparkLine;
