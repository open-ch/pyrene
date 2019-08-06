import React from 'react';
import PropTypes from 'prop-types';
import { Bar as VxBar } from '@vx/shape';

const Bar = props => (
  props.direction === 'horizontal' ? (
    <svg width={props.parentLength} height={props.barWeight}>
      <VxBar
        x="0"
        y="0"
        height={props.barWeight}
        width={props.value * (props.parentLength / props.maxValue)}
        fill={props.color}
      />
    </svg>
  ) : (
    <svg width={props.barWeight} height={props.parentLength}>
      <VxBar
        x="0"
        y={(props.maxValue - props.value) * (props.parentLength / props.maxValue)}
        height={props.value * (props.parentLength / props.maxValue)}
        width={props.barWeight}
        fill={props.color}
      />
    </svg>
  )
);

Bar.displayName = 'Bar';

Bar.defaultProps = {
  barWeight: 6,
  color: 'var(--blue-700)',
  direction: 'horizontal',
  parentLength: 150,
};

Bar.propTypes = {
  barWeight: PropTypes.number,
  color: PropTypes.string,
  direction: PropTypes.string,
  maxValue: PropTypes.number.isRequired,
  parentLength: PropTypes.number,
  value: PropTypes.number.isRequired,
};

export default Bar;
