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
        rangeRound: [0, (maxDim / props.labels.length) * (props.labels.length + 1)],
        domain: props.labels,
      }) : scaleLinear({
        range: props.position === 'left' ? [maxDim, 0] : [0, maxDim],
        domain: [0, props.maxValue],
      });
      return (
        <svg width={parent.width} height={parent.height}>
          {props.position === 'left' ? (
            <AxisLeft
              scale={scale}
              left={36}
              hideZero={props.labels.length === 0}
              hideTicks
            />
          ) : (
            <AxisBottom
              scale={scale}
              top={parent.height - 24}
              // tickLabelProps={(tickValue, index) => ({
              //   textAnchor: 'end', fontSize: 10, fill: 'black', dx: '-0.25em',
              // })}
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
