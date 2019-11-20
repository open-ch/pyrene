import React from 'react';
import PropTypes from 'prop-types';
import { AreaClosed, LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { LinearGradient } from '@vx/gradient';

const SparkLine = (props) => {
  const x = (d) => d[0];
  const y = (d) => d[1];

  const xScale = scaleTime({
    range: [0, props.width],
    domain: [Math.min(...props.dataSeries.data.map(x)), Math.max(...props.dataSeries.data.map(x))],
  });
  const yScale = scaleLinear({
    range: [props.height, 0],
    domain: [0, Math.max(...props.dataSeries.data.map(y))],
  });

  return (
    // shapeRendering="auto" to have nicer lines
    <svg shapeRendering="auto">
      <LinearGradient
        id="gradient"
        fromOpacity={props.gradient.fromOpacity}
        toOpacity={props.gradient.toOpacity}
        from={props.gradient.fromColor}
        to={props.gradient.toColor}
      />
      <AreaClosed
        data={props.dataSeries.data}
        x={(d) => xScale(x(d))}
        y={(d) => yScale(y(d))}
        yScale={yScale}
        stroke="transparent"
        fill="url(#gradient)"
      />
      <LinePath
        data={props.dataSeries.data}
        x={(d) => xScale(x(d))}
        y={(d) => yScale(y(d))}
        stroke={props.gradient.fromColor}
      />
    </svg>
  );
};

SparkLine.displayName = 'Spark Line';

SparkLine.defaultProps = {
  dataSeries: PropTypes.shape({
    data: [],
    label: '',
  }),
};

SparkLine.propTypes = {
  /**
   * Sets the data series. A data series consists of a label and an array of data. Each data item contains a timestamp and a value.
   */
  dataSeries: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    label: PropTypes.string.isRequired,
  }),
  gradient: PropTypes.shape({
    fromColor: PropTypes.string,
    fromOpacity: PropTypes.number,
    toColor: PropTypes.string,
    toOpacity: PropTypes.number,
  }).isRequired,
  /**
   * Sets the height of the graph canvas.
   * Type: number (required)
   */
  height: PropTypes.number.isRequired,
  /**
   * Sets the width of the graph canvas.
   * Type: number (required)
   */
  width: PropTypes.number.isRequired,
};

export default SparkLine;
