import React from 'react';
import PropTypes from 'prop-types';
import { AreaClosed, LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';

const SparkLine = (props) => {
  const x = (d) => d[0];
  const y = (d) => d[1];

  const xScale = scaleTime({
    range: [0, props.width],
    domain: [Math.min(...props.dataSeries.map(x)), Math.max(...props.dataSeries.map(x))],
  });
  const yScale = scaleLinear({
    range: [props.height, 0],
    domain: [Math.min(...props.dataSeries.map(y)), Math.max(...props.dataSeries.map(y))],
  });

  return (
    // shapeRendering="auto" to have nicer lines
    <svg shapeRendering="auto">
      <AreaClosed
        data={props.dataSeries}
        x={(d) => xScale(x(d))}
        y={(d) => yScale(y(d))}
        yScale={yScale}
        stroke="transparent"
        fill={props.colors[1]}
      />
      <LinePath
        data={props.dataSeries}
        x={(d) => xScale(x(d))}
        y={(d) => yScale(y(d))}
        stroke={props.colors[0]}
        strokeWidth={props.strokeWidth}
      />
    </svg>
  );
};

SparkLine.displayName = 'Spark Line';

SparkLine.defaultProps = {
  strokeWidth: 1,
};

SparkLine.propTypes = {
  /**
   * Sets the color of line and area. Type: [ string ]
   */
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Sets the data series as an array of data. Each data item contains a timestamp and a value.
   */
  dataSeries: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  /**
   * Sets the height of the graph canvas.
   * Type: number (required)
   */
  height: PropTypes.number.isRequired,
  /**
   * Sets the strokeWidth of the line.
   */
  strokeWidth: PropTypes.number,
  /**
   * Sets the width of the graph canvas.
   * Type: number (required)
   */
  width: PropTypes.number.isRequired,
};

export default SparkLine;
