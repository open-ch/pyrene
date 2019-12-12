import React from 'react';
import PropTypes from 'prop-types';
import { AreaClosed, LinePath } from '@vx/shape';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import chartConstants from '../../common/chartConstants';

const SparkLine = (props) => {
  const yMax = props.alignScaleWithLeftAxis ? props.height - chartConstants.marginMaxValueToBorder : props.height;
  const top = props.alignScaleWithLeftAxis ? chartConstants.marginMaxValueToBorder : 0;

  const x = (d) => d[0];
  const y = (d) => d[1];

  const xScale = scaleTime({
    range: [0, props.width],
    domain: [Math.min(...props.dataSeries.map(x)), Math.max(...props.dataSeries.map(x))],
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [Math.min(...props.dataSeries.map(y)), Math.max(...props.dataSeries.map(y))],
  });

  return (
    // shapeRendering="auto" to have nicer lines
    <svg shapeRendering="auto">
      <Group
        left={props.left}
        top={top}
      >
        {props.showArea && (
          <AreaClosed
            data={props.dataSeries}
            x={(d) => xScale(x(d))}
            y={(d) => yScale(y(d))}
            yScale={yScale}
            stroke="transparent"
            fill={props.colors[1]}
          />
        )}
        <LinePath
          data={props.dataSeries}
          x={(d) => xScale(x(d))}
          y={(d) => yScale(y(d))}
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
};

SparkLine.propTypes = {
  /**
   * If set, aligns scale with the NumericalAxis on the left. The maximum value will not reach the top, but canvas height - marginMaxValueToBorder.
   */
  alignScaleWithLeftAxis: PropTypes.bool.isRequired,
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
   * Sets the horizontal offset for this component.
   */
  left: PropTypes.number.isRequired,
  /**
   * If set, fills the area below the line with the secondary color.
   */
  showArea: PropTypes.bool,
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
