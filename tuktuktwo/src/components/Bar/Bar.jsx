import React from 'react';
import PropTypes from 'prop-types';
import { Bar as VxBar } from '@vx/shape';
import Responsive from '../Misc/Responsive';

const Bar = props => (
  <Responsive>
    {parent => (
      props.direction === 'horizontal' ? (
        <svg width={parent.width} height={props.barWeight} transform={props.mirrored ? 'rotate(180 0 0)' : undefined}>
          <VxBar
            x="0"
            y="0"
            height={props.barWeight}
            width={props.value * (parent.width / props.maxValue)}
            fill={props.color}
          />
        </svg>
      ) : (
        <svg width={props.barWeight} height={parent.height} transform={props.mirrored ? 'rotate(180 0 0)' : undefined}>
          <VxBar
            x="0"
            y={(props.maxValue - props.value) * (parent.height / props.maxValue)}
            height={props.value * (parent.height / props.maxValue)}
            width={props.barWeight}
            fill={props.color}
          />
        </svg>
      ))}
  </Responsive>
);

Bar.displayName = 'Bar';

Bar.defaultProps = {
  barWeight: 6,
  direction: 'horizontal',
  mirrored: false,
};

Bar.propTypes = {
  barWeight: PropTypes.number,
  color: PropTypes.string.isRequired,
  direction: PropTypes.string,
  maxValue: PropTypes.number.isRequired,
  mirrored: PropTypes.bool,
  value: PropTypes.number.isRequired,
};

export default Bar;
