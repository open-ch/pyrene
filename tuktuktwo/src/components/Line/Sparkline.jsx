import React from 'react';
import PropTypes from 'prop-types';
import { AreaClosed, LinePath } from '@vx/shape';
import { Group } from '@vx/group';

const SparkLine = (props) => {
  const x = (d) => d[0];
  const y = (d) => d[1];

  return (
    // shapeRendering="auto" to have nicer lines
    <svg shapeRendering="auto">
      <Group
        top={props.top}
      >
        {props.showArea && (
          <AreaClosed
            data={props.dataSeries}
            x={(d) => props.xScale(x(d))}
            y={(d) => props.yScale(y(d))}
            yScale={props.yScale}
            stroke="transparent"
            fill={props.colors[1]}
          />
        )}
        <LinePath
          data={props.dataSeries}
          x={(d) => props.xScale(x(d))}
          y={(d) => props.yScale(y(d))}
          stroke={props.colors[0]}
          strokeWidth={props.strokeWidth}
        />
      </Group>
    </svg>
  );
};

SparkLine.displayName = 'Spark Line';

SparkLine.defaultProps = {
  showArea: true,
  strokeWidth: 1,
  top: 0,
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
   * If set, fills the area below the line with the secondary color.
   */
  showArea: PropTypes.bool,
  /**
   * Sets the strokeWidth of the line.
   */
  strokeWidth: PropTypes.number,
  /**
   * Sets the vertical offset for this component.
   */
  top: PropTypes.number,
  /**
   * Sets the scale function for the x axis.
   */
  xScale: PropTypes.func.isRequired,
  /**
   * Sets the scale function for the y axis.
   */
  yScale: PropTypes.func.isRequired,
};

export default SparkLine;
