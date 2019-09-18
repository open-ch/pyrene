import React from 'react';
import PropTypes from 'prop-types';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { format } from 'd3-format';
import Responsive from '../Misc/Responsive';
import Utils from '../../Utils';

const Axis = props => (
  <Responsive>
    {(parent) => {
      const parentSize = props.position === 'left' ? parent.height : parent.width;
      const scale = props.labels.length > 0 ? Utils.scaleLabels(parentSize, props.labels) : Utils.scaleLinear(parentSize, props.maxValue, props.position === 'left' ? 'vertical' : 'horizontal');
      const color = '#979ca8';
      return (
        <svg width={parent.width} height={parent.height}>
          {props.position === 'left' ? (
            <AxisLeft
              scale={scale}
              left={props.labels.length === 0 ? 36 : 102}
              tickLabelProps={(tickValue, index) => ({
                textAnchor: 'start', fontSize: 10, fill: color, dx: props.labels.length > 0 ? '-94px' : '-28px',
              })}
              stroke={color}
              strokeWidth={0.5}
              tickStroke={color}
              numTicks={props.labels.length === 0 ? 3 : props.labels.length}
              hideAxisLine={props.labels.length > 0}
              tickFormat={props.labels.length === 0 ? format('d') : null}
              hideTicks
              hideZero
            />
          ) : (
            <AxisBottom
              scale={scale}
              top={parent.height - 24}
              tickLabelProps={(tickValue, index) => ({
                textAnchor: props.labels.length === 0 ? 'start' : 'middle', fontSize: 10, fill: color,
              })}
              stroke={color}
              strokeWidth={0.5}
              tickStroke={color}
              numTicks={props.labels.length === 0 ? 5 : props.labels.length}
              hideAxisLine={props.labels.length > 0}
              tickFormat={props.labels.length === 0 ? format('d') : null}
              hideTicks
              hideZero
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
