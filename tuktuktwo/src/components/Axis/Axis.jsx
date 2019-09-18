import React from 'react';
import PropTypes from 'prop-types';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { scaleBand, scaleLinear } from '@vx/scale';
import Responsive from '../Misc/Responsive';

const Axis = props => (
  <Responsive>
    {(parent) => {
      const maxDim = props.position === 'left' ? parent.height : parent.width;
      const scale = props.labels.length > 0 ? scaleBand({
        rangeRound: [0, maxDim],
        domain: props.labels,
      }) : scaleLinear({
        range: props.position === 'left' ? [maxDim, 0] : [0, maxDim],
        domain: [0, props.maxValue],
      });
      const color = '#979ca8';
      return (
        <svg width={parent.width} height={parent.height}>
          {props.position === 'left' ? (
            <AxisLeft
              scale={scale}
              left={props.labels.length === 0 ? 36 : 102}
              hideZero={props.labels.length === 0}
              tickLabelProps={(tickValue, index) => ({
                textAnchor: 'start', fontSize: 10, fill: color, dx: props.labels.length > 0 ? '-94px' : '-28px',
              })}
              stroke={color}
              tickStroke={color}
              numTicks={props.labels.length === 0 ? 3 : props.labels.length}
              hideTicks
            />
          ) : (
            <AxisBottom
              scale={scale}
              top={parent.height - 24}
              tickLabelProps={(tickValue, index) => ({
                textAnchor: 'middle', fontSize: 10, fill: color,
              })}
              stroke={color}
              tickStroke={color}
              numTicks={props.labels.length === 0 ? 5 : props.labels.length}
              hideZero={props.labels.length === 0}
            />
          )}
        </svg>
      );
    }}

  </Responsive>
);

Axis.displayName = 'Axis';

Axis.defaultProps = {
  labels: [],
  maxValue: 0,
};

Axis.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  maxValue: PropTypes.number,
  position: PropTypes.oneOf(['left', 'bottom']).isRequired,
};

export default Axis;
