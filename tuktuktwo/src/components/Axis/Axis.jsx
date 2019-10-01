import React from 'react';
import PropTypes from 'prop-types';
import { AxisLeft, AxisBottom } from '@vx/axis';
import Responsive from '../Misc/Responsive';
import Utils from '../../Utils';

function getScale(props, parentSize) {
  if (props.scale !== undefined) return props.scale;
  return props.labels.length > 0 ? Utils.scaleCategorical(parentSize, props.labels) : Utils.scaleLinear(parentSize, props.maxValue, props.position === 'left' ? 'vertical' : 'horizontal');
}

const Axis = props => (
  <Responsive>
    {(parent) => {
      const parentSize = props.position === 'left' ? parent.height : parent.width;
      const scale = getScale(props, parentSize);
      const color = '#979ca8';
      return (
        <svg width={parent.width} height={parent.height}>
          {props.position === 'left' ? (
            <AxisLeft
              scale={scale}
              left={props.labels.length === 0 ? 32 : 98}
              tickLabelProps={(tickValue, index) => ({
                textAnchor: 'start', fontSize: 10, fill: color, dx: props.labels.length > 0 ? '-90px' : '-24px', dy: '0.25em',
              })}
              stroke={color}
              strokeWidth={0.5}
              tickStroke={color}
              numTicks={props.labels.length === 0 ? 3 : props.labels.length}
              hideAxisLine={props.labels.length > 0}
              tickFormat={props.tickFormat}
              tickValues={props.tickValues}
              hideTicks
              hideZero
            />
          ) : (
            <AxisBottom
              scale={scale}
              top={parent.height - 24}
              tickLabelProps={(tickValue, index) => ({
                textAnchor: 'middle', fontSize: 10, fill: color, dy: '-0.25em',
              })}
              stroke={color}
              strokeWidth={0.5}
              tickStroke={color}
              numTicks={props.labels.length === 0 ? 6 : props.labels.length}
              hideAxisLine={props.labels.length > 0}
              tickFormat={props.tickFormat}
              tickValues={props.tickValues}
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
  scale: undefined,
  tickFormat: d => d,
  tickValues: undefined,
};

Axis.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  maxValue: PropTypes.number,
  position: PropTypes.oneOf(['left', 'bottom']).isRequired,
  scale: PropTypes.func,
  tickFormat: PropTypes.func,
  tickValues: PropTypes.arrayOf(PropTypes.oneOf(['string', 'number'])),
};

export default Axis;
